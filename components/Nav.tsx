"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/proyectos", label: "Projects" },
  { href: "/publicaciones", label: "Publications" },
  { href: "/resume", label: "Resume" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-panel/80 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="flex h-16 w-full items-center justify-between px-margin-mobile md:px-margin-desktop"
      >
        <Link
          href="/"
          className="font-mono text-utility uppercase tracking-widest text-accent"
        >
          ML_ENGINEER
        </Link>
        <ul className="flex items-center gap-4 md:gap-8">
          {LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`pb-1 font-mono text-utility uppercase transition-colors ${
                    active
                      ? "border-b-2 border-accent text-accent"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
