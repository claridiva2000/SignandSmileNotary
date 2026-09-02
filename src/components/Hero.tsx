import Container from "./Container";
import Button from "./Button";
import styles from "./Hero.module.css";
import { DocumentIcon, MapPinIcon, RingsIcon } from "./icons";
import { PRIMARY_SERVICE_AREA } from "@/lib/constants";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <div>
            <span className={styles.badge}>
              <MapPinIcon />
              Serving {PRIMARY_SERVICE_AREA} &amp; the Greater Houston Area
            </span>
            <h1 className={styles.title}>
              Sign It. Say <em>&ldquo;I Do.&rdquo;</em> Smile.
            </h1>
            <p className={styles.subtitle}>
              Whether you need an important document notarized or someone to make your marriage
              official, Sign &amp; Smile makes the process simple, friendly, and straightforward.
            </p>
            <div className={styles.actions}>
              <Button href="/notary" variant="primary">
                I Need a Notary
              </Button>
              <Button href="/weddings" variant="secondary">
                I&apos;m Getting Married
              </Button>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualCard}>
              <DocumentIcon />
              <div>
                <strong>Notary Services</strong>
                <span>Acknowledgments, affidavits, jurats &amp; more</span>
              </div>
            </div>
            <div className={styles.visualCard}>
              <RingsIcon />
              <div>
                <strong>Wedding Officiant</strong>
                <span>From a simple legal ceremony to a personalized one</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
