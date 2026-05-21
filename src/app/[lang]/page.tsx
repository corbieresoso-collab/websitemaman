import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { artworks, series, type Serie } from "@/lib/artworks";
import SeriesPortals from "@/components/SeriesPortals";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const hero = artworks.find((a) => a.id === "le-gardien") ?? artworks[0];
  const heroTitle = hero.titles[lang as Locale];

  const seriesPortalData = series.map((serie: Serie) => {
    const first = artworks.find((a) => a.serie === serie)!;
    return {
      serie,
      label: dict.gallery.series[serie as keyof typeof dict.gallery.series],
      artwork: first,
    };
  });

  return (
    <div>
      {/* Hero — full viewport */}
      <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image}
            alt={heroTitle}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p
            className="animate-fade-in delay-200 text-muted tracking-[0.35em] uppercase text-xs mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nathalie Żieba
          </p>

          <h1
            className="animate-fade-in-up delay-400 font-light italic text-text leading-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
            }}
          >
            {dict.home.tagline}
          </h1>

          <p
            className="animate-fade-in-up delay-600 text-muted text-xs tracking-[0.3em] uppercase mb-16"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {dict.home.subtitle}
          </p>

          <div className="animate-fade-in-up delay-800">
            <Link
              href={`/${lang}/galerie`}
              className="inline-block border border-border text-text/60 hover:text-text hover:border-teal/40 transition-all duration-500 px-10 py-4 tracking-[0.25em] uppercase text-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {dict.home.enter}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-1000">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-muted/35 mx-auto" />
        </div>
      </div>

      {/* Series portals — 4 full-screen chapters */}
      <SeriesPortals data={seriesPortalData} lang={lang as Locale} />
    </div>
  );
}
