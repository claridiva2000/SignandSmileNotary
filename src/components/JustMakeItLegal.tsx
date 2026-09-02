import Button from "./Button";
import styles from "./JustMakeItLegal.module.css";
import { RingsIcon } from "./icons";

export default function JustMakeItLegal({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.banner}>
      <div className={styles.ring} aria-hidden="true">
        <RingsIcon />
      </div>
      <div>
        <span className={styles.eyebrow}>Signature Offering</span>
        <h2 className={styles.heading}>Just Make It Legal</h2>
        <p className={styles.copy}>
          No aisle. No elaborate ceremony. No 200-person guest list required. If you&apos;ve got the
          marriage license and you&apos;re ready to be married, we&apos;ll handle the important part —
          making it official.
        </p>
        {!compact && (
          <div className={styles.tagRow}>
            <span className={styles.tag}>Elopements</span>
            <span className={styles.tag}>Private ceremonies</span>
            <span className={styles.tag}>Last-minute dates</span>
            <span className={styles.tag}>Celebrate later</span>
          </div>
        )}
      </div>
      <div className={styles.cta}>
        <Button href="/contact?service=just-make-it-legal" variant="onDark">
          Let&apos;s Make It Legal
        </Button>
      </div>
    </div>
  );
}
