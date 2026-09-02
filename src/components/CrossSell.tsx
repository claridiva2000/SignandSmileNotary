import Link from "next/link";
import styles from "./CrossSell.module.css";
import { ArrowRightIcon } from "./icons";

export default function CrossSell({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <p className={styles.wrap}>
      <Link href={href}>{label}</Link>
      <ArrowRightIcon />
    </p>
  );
}
