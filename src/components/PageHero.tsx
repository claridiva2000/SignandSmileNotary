import type { ReactNode } from "react";
import Container from "./Container";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  lede,
  background = "sectionCream",
  actions,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  background?: "sectionCream" | "sectionRose" | "sectionSurface";
  actions?: ReactNode;
}) {
  return (
    <section className={`${styles.hero} ${background}`}>
      <Container>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </Container>
    </section>
  );
}
