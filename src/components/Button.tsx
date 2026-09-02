import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark";

const variantClass: Record<Variant, string> = {
  primary: "btnPrimary",
  secondary: "btnSecondary",
  onDark: "btnOnDark",
};

export default function Button({
  href,
  children,
  variant = "primary",
  block = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  block?: boolean;
  icon?: ReactNode;
}) {
  const className = `btn ${variantClass[variant]} ${block ? "btnBlock" : ""}`.trim();
  return (
    <Link href={href} className={className}>
      {children}
      {icon}
    </Link>
  );
}
