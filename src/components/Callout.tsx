import type { ReactNode } from "react";
import styles from "./Callout.module.css";
import { DocumentIcon } from "./icons";

export default function Callout({
  children,
  variant = "info",
  icon,
}: {
  children: ReactNode;
  variant?: "info" | "legal";
  icon?: ReactNode;
}) {
  return (
    <div className={`${styles.box} ${variant === "legal" ? styles.legal : ""}`}>
      {icon ?? <DocumentIcon />}
      <p>{children}</p>
    </div>
  );
}
