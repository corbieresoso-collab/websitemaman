import type { Locale, Dictionary } from "@/lib/dictionaries";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-border mt-20 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-muted text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Nathalie Zięba © {new Date().getFullYear()} — {dict.footer.rights}
        </p>
        <p
          className="text-muted/50 text-xs"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {dict.footer.made_with}
        </p>
      </div>
    </footer>
  );
}
