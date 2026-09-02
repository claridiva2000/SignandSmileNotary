import Container from "./Container";
import Button from "./Button";
import styles from "./PathCards.module.css";
import { CheckIcon, DocumentIcon, RingsIcon } from "./icons";

export default function PathCards() {
  return (
    <section className="section sectionCream">
      <Container>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.notary}`}>
            <div className={styles.iconWrap}>
              <DocumentIcon />
            </div>
            <h2>I Need a Notary</h2>
            <p>
              Affidavits, acknowledgments, jurats, power of attorney, and more — handled quickly and
              correctly.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <CheckIcon /> Common personal &amp; business documents
              </li>
              <li className={styles.listItem}>
                <CheckIcon /> Straightforward, no-pressure process
              </li>
              <li className={styles.listItem}>
                <CheckIcon /> Serving Fort Bend County &amp; Houston
              </li>
            </ul>
            <Button href="/notary" variant="onDark">
              I Need a Notary
            </Button>
          </article>

          <article className={`${styles.card} ${styles.wedding}`}>
            <div className={styles.iconWrap}>
              <RingsIcon />
            </div>
            <h2>I&apos;m Getting Married</h2>
            <p>
              From a simple &ldquo;just make it legal&rdquo; ceremony to a fully personalized one —
              officiated with warmth.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <CheckIcon /> Just Make It Legal ceremonies
              </li>
              <li className={styles.listItem}>
                <CheckIcon /> Simple &amp; personalized ceremonies
              </li>
              <li className={styles.listItem}>
                <CheckIcon /> Flexible on date, time &amp; location
              </li>
            </ul>
            <Button href="/weddings" variant="primary">
              I&apos;m Getting Married
            </Button>
          </article>
        </div>
      </Container>
    </section>
  );
}
