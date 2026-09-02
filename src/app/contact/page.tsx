import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/constants";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact & Request Service",
  description:
    "Request notary or wedding officiant service in Fort Bend County and the Greater Houston area. Tell us what you need and we'll follow up to confirm details.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request Service"
        lede="Tell us what you need, and we'll follow up to confirm availability, location, and pricing."
      />

      <section className="section sectionSurface">
        <Container>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>

          <p className={styles.altContact}>
            Prefer to talk it through first? Call{" "}
            <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a> or email{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
