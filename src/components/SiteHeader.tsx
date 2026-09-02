import Link from "next/link";
import styles from "./Header.module.css";
import MobileNav from "./MobileNav";
import { NAV_LINKS } from "@/lib/constants";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label="Sign & Smile Notary, home">
            <span className={styles.logoMark}>
              Sign<span> &amp; </span>Smile
            </span>
            <span className={styles.logoSub}>Notary &amp; Wedding Officiant</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.desktopCta}>
            <Link href="/contact" className="btn btnPrimary">
              Request Service
            </Link>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
