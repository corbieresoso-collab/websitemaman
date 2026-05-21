import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const s = dict.studio;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 animate-fade-in-up">
        <h1
          className="text-5xl md:text-7xl font-light italic text-text mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {s.title}
        </h1>
        <div className="w-12 h-px bg-teal mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 animate-fade-in-up delay-200">
        <div>
          <h2
            className="text-3xl font-light italic text-text mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s.name}
          </h2>
          <p
            className="text-text/70 leading-8 mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {s.bio_1}
          </p>
          <p
            className="text-text/70 leading-8 mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {s.bio_2}
          </p>
          <p
            className="text-text/60 leading-8 italic"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}
          >
            {s.bio_3}
          </p>
        </div>

        <div className="space-y-10">
          <div className="border-t border-border pt-8">
            <p
              className="text-teal text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.technique}
            </p>
            <p
              className="text-text/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.technique_detail}
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <p
              className="text-teal text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.contact_title}
            </p>
            <p
              className="text-text/70 mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.contact_text}
            </p>
            <a
              href="mailto:corbiere.entertainment.bali@gmail.com"
              className="text-teal hover:text-teal/70 transition-colors text-sm tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              corbiere.entertainment.bali@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
