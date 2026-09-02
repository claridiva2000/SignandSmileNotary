"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./icons";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  NAV_LINKS,
} from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div id="mobile-nav-panel" className={styles.mobilePanel} role="dialog" aria-modal="true" aria-label="Site menu">
          <div className={styles.mobilePanelHeader}>
            <span className={styles.logoMark}>
              Sign<span> &amp; </span>Smile
            </span>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.mobileNavLink} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <Link href="/contact" className="btn btnPrimary btnBlock" onClick={() => setOpen(false)}>
              Request Service
            </Link>
          </div>

          <div className={styles.mobileContact}>
            <a className={styles.mobileContactRow} href={`tel:${BUSINESS_PHONE_TEL}`}>
              <PhoneIcon />
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <a className={styles.mobileContactRow} href={`mailto:${BUSINESS_EMAIL}`}>
              <MailIcon />
              {BUSINESS_EMAIL}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
