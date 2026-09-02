import styles from "./ServiceGrid.module.css";
import { CheckIcon } from "./icons";

export default function ServiceGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div className={styles.item} key={item.title}>
          <CheckIcon />
          <div>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
