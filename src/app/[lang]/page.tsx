import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { artworks, series, type Serie } from "@/lib/artworks";

const seriesNumbers: Record<Serie, string> = {
  cosmogonie: "I",
  entites: "II",
  biomes: "III",
  abysses: "IV",
};

const seriesTaglines: Record<Serie, Record<Locale, string>> = {
  cosmogonie: {
    fr: "Avant le temps, avant la lumière",
    en: "Before time, before light",
    es: "Antes del tiempo, antes de la luz",
  },
  entites: {
    fr: "Des êtres qui traversent les mondes",
    en: "Beings that traverse worlds",
    es: "Seres que atraviesan los mundos",
  },
  biomes: {
    fr: "La vie s'organise seule, magnifiquement",
    en: "Life organises itself, magnificently",
    es: "La vida se organiza sola, magníficamente",
  },
  abysses: {
    fr: "Dans les profondeurs, quelque chose regarde",
    en: "In the depths, something watches",
    es: "En las profundidades, algo observa",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const l = lang as Locale;
  const dict = await getDictionary(l);
  const hero = artworks.find((a) => a.id === "le-gardien") ?? artworks[0];
  const heroTitle = hero.titles[l];

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image}
            alt={heroTitle}
            fill
            className="object-cover opacity-[0.12]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />
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
              href={`/${l}/galerie`}
              className="inline-block border border-border text-muted hover:text-gold hover:border-gold/50 transition-all duration-500 px-10 py-4 tracking-[0.25em] uppercase text-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {dict.home.enter}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-1000">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-muted/25 mx-auto" />
        </div>
      </div>

      {/* ── Collections overview ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {series.map((serie) => {
            const previewArtwork = artworks.find((a) => a.serie === serie)!;
            const serieLabel =
              dict.gallery.series[serie as keyof typeof dict.gallery.series];
            const tagline = seriesTaglines[serie][l];
            const count = artworks.filter((a) => a.serie === serie).length;

            return (
              <Link
                key={serie}
                href={`/${l}/galerie#${serie}`}
                className="group relative bg-bg overflow-hidden block"
              >
                {/* Artwork thumbnail */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={previewArtwork.image}
                    alt={serieLabel}
                    fill
                    className="object-contain opacity-40 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-bg/20 to-bg/70" />
                </div>

                {/* Info */}
                <div className="px-8 py-7 border-t border-border">
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className="text-[10px] tracking-[0.4em] text-muted/50"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {seriesNumbers[serie]}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.3em] text-muted/40"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {count} {l === "fr" ? "œuvres" : l === "en" ? "works" : "obras"}
                    </span>
                  </div>

                  <h2
                    className="font-light italic text-text group-hover:text-gold transition-colors duration-400 mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    }}
                  >
                    {serieLabel}
                  </h2>

                  <p
                    className="text-muted text-xs tracking-[0.22em] uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tagline}
                  </p>

                  <div className="flex items-center gap-3 mt-5 text-muted/40 group-hover:text-gold transition-colors duration-400">
                    <span className="w-5 h-px bg-current group-hover:w-9 transition-all duration-500" />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                      }}
                    >
                      {l === "fr" ? "Explorer" : l === "en" ? "Explore" : "Explorar"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
