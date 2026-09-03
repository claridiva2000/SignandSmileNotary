"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ContactForm.module.css";
import { CheckIcon } from "./icons";
import { BUSINESS_EMAIL, CONTACT_SERVICE_OPTIONS } from "@/lib/constants";
import { submitContactRequest } from "@/lib/submitContactRequest";

const SERVICE_SLUG_MAP: Record<string, (typeof CONTACT_SERVICE_OPTIONS)[number]> = {
  notary: "Notary Service",
  "just-make-it-legal": "Just Make It Legal Ceremony",
  "simple-ceremony": "Simple Wedding Ceremony",
  "personalized-ceremony": "Personalized Wedding Ceremony",
};

type FormState = {
  service: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message: string;
  // Honeypot — left blank by real visitors, hidden from screen readers and sighted users.
  company: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  service: "",
  name: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  location: "",
  message: "",
  company: "",
};

const MAX_LENGTHS = {
  name: 100,
  phone: 30,
  email: 254,
  location: 100,
  message: 2000,
} as const;

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");
  const initialService = preselected ? SERVICE_SLUG_MAP[preselected] ?? "" : "";

  const [form, setForm] = useState<FormState>({ ...emptyForm, service: initialService });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  // Synchronous lock — React state updates are batched/async, so two clicks in the
  // same tick would both read status === "idle" without this. A ref updates instantly.
  const submittingRef = useRef(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};
    if (!values.service || !CONTACT_SERVICE_OPTIONS.includes(values.service as (typeof CONTACT_SERVICE_OPTIONS)[number])) {
      nextErrors.service = "Please choose what you need help with.";
    }
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (values.name.trim().length > MAX_LENGTHS.name) {
      nextErrors.name = `Please keep your name under ${MAX_LENGTHS.name} characters.`;
    }

    if (!values.phone.trim() && !values.email.trim()) {
      nextErrors.phone = "Please provide a phone number or email.";
      nextErrors.email = "Please provide a phone number or email.";
    }

    if (values.phone.trim()) {
      const digitCount = values.phone.replace(/\D/g, "").length;
      if (digitCount < 7 || digitCount > 15) {
        nextErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please add a few details so we know how to help.";
    } else if (values.message.trim().length > MAX_LENGTHS.message) {
      nextErrors.message = `Please keep your message under ${MAX_LENGTHS.message} characters.`;
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    try {
      await submitContactRequest({ ...form, honeypot: form.company });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successPanel} role="status">
        <CheckIcon />
        <div>
          <h2>Request Sent</h2>
          <p>Thank you! Your request has been sent. We&apos;ll be in touch soon.</p>
          <p>
            Submitting a request does not confirm an appointment — we&apos;ll contact you to confirm
            availability and details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>What can I help you with?</legend>
        <div className={styles.serviceGrid}>
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <div className={styles.serviceOption} key={option}>
              <input
                type="radio"
                id={`service-${option}`}
                name="service"
                value={option}
                checked={form.service === option}
                onChange={(e) => update("service", e.target.value)}
              />
              <label htmlFor={`service-${option}`} className={styles.serviceLabel}>
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors.service && <span className={styles.errorText}>{errors.service}</span>}
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={MAX_LENGTHS.name}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span className={styles.errorText} id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone <span className={styles.optional}>(or email below)</span>
          </label>
          <input
            className={`${styles.input} ${errors.phone ? styles.invalid : ""}`}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={MAX_LENGTHS.phone}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <span className={styles.errorText} id="phone-error">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={MAX_LENGTHS.email}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span className={styles.errorText} id="email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="location">
            Location or ZIP Code <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.input}
            id="location"
            name="location"
            type="text"
            maxLength={MAX_LENGTHS.location}
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="preferredDate">
            Preferred Date <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.input}
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="preferredTime">
            Preferred Time <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.input}
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message / Details
        </label>
        <textarea
          className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
          id="message"
          name="message"
          placeholder="For notary requests: what type of document(s) and roughly how many. For weddings: your ceremony date and location, and anything else that would help us plan."
          maxLength={MAX_LENGTHS.message}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span className={styles.errorText} id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <p className={styles.disclaimer}>
        Submitting a request does not confirm an appointment. We&apos;ll contact you to confirm
        availability and details.
      </p>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className="btn btnPrimary"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Request Service"}
        </button>
        {status === "error" && (
          <span className={`${styles.formStatus} ${styles.formStatusError}`} role="alert">
            We couldn&apos;t send your request right now. Please try again or email{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
          </span>
        )}
      </div>
    </form>
  );
}

export default ContactFormInner;
