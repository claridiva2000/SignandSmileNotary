type IconProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M8 3.5h9l4 4v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-19a1 1 0 0 1 1-1Z" />
      <path d="M17 3.5v4h4" />
      <path d="M10.5 14h7M10.5 17.5h7M10.5 10.5h4" />
    </svg>
  );
}

export function StampIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M14 4a3.5 3.5 0 0 0-3.5 3.5c0 1.5.8 2.3 1.5 3s1 1.2 1 2h2c0-.8.3-1.3 1-2s1.5-1.5 1.5-3A3.5 3.5 0 0 0 14 4Z" />
      <path d="M9 15.5h10l1.5 6h-13z" />
      <path d="M6 24.5h16" />
    </svg>
  );
}

export function RingsIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <circle cx="10.5" cy="16" r="6" />
      <circle cx="17.5" cy="16" r="6" />
      <path d="M11 8.5 14 4l3 4.5" />
    </svg>
  );
}

export function HeartLineIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M14 24s-9-5.7-9-12.4C5 7.6 7.7 5 11 5c1.7 0 3.2.9 3 2.6C14.8 5.9 16.3 5 18 5c3.3 0 6 2.6 6 6.6C24 18.3 15 24 15 24Z" />
    </svg>
  );
}

export function SignatureIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M4 20c2-.5 3.5-2 4.5-4 1.5-3 2-8 4-8s.5 7 2.5 7 2.5-4 4-4 1 3 3 3 2.5-1.5 2.5-1.5" />
      <path d="M4 24.5h20" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M5 14.5 11 20 23 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M14 25s8-7.4 8-13.5A8 8 0 0 0 6 11.5C6 17.6 14 25 14 25Z" />
      <circle cx="14" cy="11.5" r="3" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M6.5 4.5h4L12 9l-2 1.7a13 13 0 0 0 7.3 7.3L19 16l4.5 1.5v4a2 2 0 0 1-2.2 2C13 22.7 5.3 15 4.5 7.7a2 2 0 0 1 2-3.2Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <rect x="3.5" y="6" width="21" height="16" rx="2" />
      <path d="m4.5 7.5 9.5 8 9.5-8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M4.5 8.5h19M4.5 14h19M4.5 19.5h19" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M6 6l16 16M22 6 6 22" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 28 28" aria-hidden {...props}>
      <path d="M5 14h18M15 6l8 8-8 8" />
    </svg>
  );
}
