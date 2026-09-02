import type { ReactNode } from "react";
import Button from "./Button";
import styles from "./TierCard.module.css";

export default function TierCard({
  icon,
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrap}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.cta}>
        <Button href={ctaHref} variant="secondary">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
