"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CasaIcon, type CasaIconName } from "@/components/casa-icon";

const navItems: Array<{ href: string; label: string; icon: CasaIconName }> = [
  { href: "/painel", label: "Painel", icon: "dashboard" },
  { href: "/produtos", label: "Estoque", icon: "box" },
  { href: "/movimentacoes", label: "Histórico", icon: "clock" },
  { href: "/gastos", label: "Gastos", icon: "chart" },
  { href: "/lista", label: "Lista", icon: "list" },
  { href: "/casacoin", label: "CasaCoin", icon: "coin" },
];

function isStockRoute(pathname: string, href: string) {
  return href === "/produtos" && ["/produtos", "/compras", "/consumir"].some((route) => pathname.startsWith(route));
}

export function AppNav() {
  const pathname = usePathname();

  return <nav className="side-nav" aria-label="Navegação da casa">
    {navItems.map((item) => {
      const active = pathname === item.href || isStockRoute(pathname, item.href);
      return <Link className={active ? "is-active" : undefined} href={item.href} key={item.href}>
        <span className="nav-icon"><CasaIcon name={item.icon} size={19} /></span>{item.label}
      </Link>;
    })}
  </nav>;
}
