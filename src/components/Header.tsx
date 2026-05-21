"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, Dictionary } from "@/lib/dictionaries";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

const locales: Locale[] = ["fr", "en", "es"];

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function switchLocalePath(newLang: Locale): string {
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/") || `/${newLang}`;
  }

  const navLinks = [
    { href: `/${lang}/galerie`, label: dict.nav.gallery },
    { href: `/${lang}/apropos`, label: dict.nav.about },
    { href: `/${lang}/commander`, label: dict.nav.order },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/88 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-text hover:text-muted transition-colors"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Nathalie Żieba
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted hover:text-text transition-colors duration-300 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-3 ml-6 border-l border-border pl-6">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={switchLocalePath(loc)}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                  loc === lang
                    ? "text-gold"
                    : "text-muted hover:text-text"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {loc}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted hover:text-text transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-8 flex flex-col gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-text/70 hover:text-text transition-colors text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 pt-4 border-t border-border">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={switchLocalePath(loc)}
                onClick={() => setMenuOpen(false)}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  loc === lang ? "text-gold" : "text-muted hover:text-text"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
