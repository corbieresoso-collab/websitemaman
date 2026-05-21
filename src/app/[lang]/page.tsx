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
            className="object-cover opacity-50"
            priority
          />
          {/* Top/bottom cream fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/70" />
          {/* Strong dark vignette — darkens center where text lives, edges stay lit */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 48%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.10) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* Text block with frosted backdrop for guaranteed legibility */}
        <div
          className="relative z-10 text-center px-10 py-12 max-w-2xl mx-auto"
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        >
          <p
            className="animate-fade-in delay-200 tracking-[0.45em] uppercase text-xs mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(250,247,242,0.70)",
              letterSpacing: "0.45em",
            }}
          >
            Nathalie Zięba
          </p>

          <h1
            className="animate-fade-in-up delay-400 font-light italic leading-none mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              color: "#ffffff",
              textShadow: "0 4px 60px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)",
            }}
          >
            {dict.home.tagline}
          </h1>

          <p
            className="animate-fade-in-up delay-600 text-xs tracking-[0.35em] uppercase mb-14"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(250,247,242,0.75)",
              textShadow: "0 1px 20px rgba(0,0,0,0.8)",
            }}
          >
            {dict.home.subtitle}
          </p>

          <div className="animate-fade-in-up delay-800">
            <Link
              href={`/${l}/galerie`}
              className="hero-cta-solid inline-block transition-all duration-500 px-10 py-4 tracking-[0.25em] uppercase text-xs"
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

      {/* ── Collections header ── */}
      <div className="py-24 md:py-32 text-center">
        <p
          className="text-muted tracking-[0.5em] uppercase text-xs mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {l === "fr" ? "Les collections" : l === "en" ? "The collections" : "Las colecciones"}
        </p>
        <h2
          className="font-light italic text-text leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
          }}
        >
          {l === "fr"
            ? "Entrez dans un monde où l'intérieur devient paysage"
            : l === "en"
            ? "Enter a world where the interior becomes landscape"
            : "Entra en un mundo donde el interior se convierte en paisaje"}
        </h2>
        <div className="w-8 h-px bg-gold/50 mx-auto" />
      </div>

      {/* ── Collections — cinematic chapters ── */}
      {series.map((serie, i) => {
        const isEven = i % 2 === 0;
        const previewArtwork = artworks.find((a) => a.serie === serie)!;
        const serieLabel =
          dict.gallery.series[serie as keyof typeof dict.gallery.series];
        const tagline = seriesTaglines[serie][l];
        const count = artworks.filter((a) => a.serie === serie).length;
        const exploreWord =
          l === "fr" ? "Explorer" : l === "en" ? "Explore" : "Explorar";

        return (
          <Link
            key={serie}
            href={`/${l}/galerie#${serie}`}
            className="group relative min-h-[88vh] flex items-center overflow-hidden block"
          >
            {/* Full-bleed artwork */}
            <div className="absolute inset-0">
              <Image
                src={previewArtwork.image}
                alt={serieLabel}
                fill
                className="object-cover opacity-60 group-hover:opacity-72 group-hover:scale-[1.04] transition-all duration-1000"
                sizes="100vw"
              />
              {/* Gradient only on text side so artwork visible on other side */}
              <div
                className="absolute inset-0"
                style={{
                  background: isEven
                    ? "linear-gradient(to right, rgba(250,247,242,1) 0%, rgba(250,247,242,1) 30%, rgba(250,247,242,0.85) 48%, rgba(250,247,242,0.2) 68%, transparent 100%)"
                    : "linear-gradient(to left, rgba(250,247,242,1) 0%, rgba(250,247,242,1) 30%, rgba(250,247,242,0.85) 48%, rgba(250,247,242,0.2) 68%, transparent 100%)",
                }}
              />
            </div>

            {/* Text block — positioned to left or right */}
            <div
              className={`relative z-10 px-10 md:px-20 py-16 max-w-md ${isEven ? "mr-auto" : "ml-auto"}`}
            >
              <span
                className="block text-muted/50 mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                }}
              >
                {seriesNumbers[serie]}
              </span>

              <h2
                className="font-light italic text-text group-hover:text-gold transition-colors duration-500 leading-none mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                }}
              >
                {serieLabel}
              </h2>

              <p
                className="text-muted mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  lineHeight: "1.7",
                }}
              >
                {tagline}
              </p>

              <div className="flex items-center gap-3 text-muted/50 group-hover:text-gold transition-colors duration-500">
                <span className="w-6 h-px bg-current group-hover:w-12 transition-all duration-500" />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {exploreWord} — {count} {l === "fr" ? "œuvres" : l === "en" ? "works" : "obras"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
