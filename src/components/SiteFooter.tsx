import Link from "next/link";
import styles from "./Footer.module.css";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import {
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  NAV_LINKS,
  PRIMARY_SERVICE_AREA,
} from "@/lib/constants";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>
              Sign<span> &amp; </span>Smile
            </p>
            <p className={styles.tagline}>Notary Public • Wedding Officiant</p>
            <p className={styles.area}>{PRIMARY_SERVICE_AREA} &amp; Greater Houston</p>
          </div>

          <nav aria-label="Footer">
            <p className={styles.heading}>Explore</p>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={styles.heading}>Contact</p>
            <ul className={styles.linkList}>
              <li>
                <a className={styles.contactRow} href={`tel:${BUSINESS_PHONE_TEL}`}>
                  <PhoneIcon />
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a className={styles.contactRow} href={`mailto:${BUSINESS_EMAIL}`}>
                  <MailIcon />
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <span className={styles.contactRow}>
                  <MapPinIcon />
                  {BUSINESS_HOURS}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>
            A Texas Notary Public is not an attorney and cannot provide legal advice or prepare legal
            documents.
          </p>
          <p className={styles.copyright}>© {year} Sign &amp; Smile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
