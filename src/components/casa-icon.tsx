export type CasaIconName =
  | "home"
  | "dashboard"
  | "box"
  | "cart"
  | "consumption"
  | "clock"
  | "chart"
  | "list"
  | "coin"
  | "logout"
  | "bell"
  | "chevron-down";

type CasaIconProps = {
  name: CasaIconName;
  size?: number;
  className?: string;
};

export function CasaIcon({ name, size = 20, className }: CasaIconProps) {
  const common = {
    className: `casa-icon${className ? ` ${className}` : ""}`,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" /></svg>;
    case "dashboard":
      return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
    case "box":
      return <svg {...common}><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="M4 8v8l8 4 8-4V8" /><path d="M12 12v8" /></svg>;
    case "cart":
      return <svg {...common}><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L20 8H6" /><circle cx="10" cy="19" r="1.2" /><circle cx="17" cy="19" r="1.2" /></svg>;
    case "consumption":
      return <svg {...common}><path d="M8 5h8" /><path d="m13 2 3 3-3 3" /><path d="M16 19H8" /><path d="m11 16-3 3 3 3" /><path d="M16 5v14" /><path d="M8 19V5" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>;
    case "chart":
      return <svg {...common}><path d="M5 20V11" /><path d="M12 20V5" /><path d="M19 20v-8" /><path d="M3 20h18" /></svg>;
    case "list":
      return <svg {...common}><path d="M9 6h11" /><path d="M9 12h11" /><path d="M9 18h11" /><path d="M4 6h.01" /><path d="M4 12h.01" /><path d="M4 18h.01" /></svg>;
    case "coin":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M14.5 8.5c-.7-.6-1.6-.9-2.5-.9-1.4 0-2.5.7-2.5 1.8 0 2.7 5 1.1 5 3.8 0 1.1-1.1 1.8-2.5 1.8-.9 0-1.8-.3-2.5-.9" /><path d="M12 6.5v11" /></svg>;
    case "logout":
      return <svg {...common}><path d="M13 5h6v14h-6" /><path d="M11 12h8" /><path d="m15 8 4 4-4 4" /><path d="M5 12h10" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>;
    case "chevron-down":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
  }
}
