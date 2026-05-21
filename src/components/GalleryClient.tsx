"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Artwork, Serie } from "@/lib/artworks";
import type { Locale, Dictionary } from "@/lib/dictionaries";

interface GalleryClientProps {
  artworks: Artwork[];
  series: Serie[];
  lang: Locale;
  dict: Dictionary;
}

type LangMap = { fr: string; en: string; es: string };

const seriesMeta: Record<Serie, { number: string; tagline: LangMap }> = {
  cosmogonie: {
    number: "I",
    tagline: {
      fr: "Avant le temps, avant la lumière",
      en: "Before time, before light",
      es: "Antes del tiempo, antes de la luz",
    },
  },
  entites: {
    number: "II",
    tagline: {
      fr: "Des êtres qui traversent les mondes",
      en: "Beings that traverse worlds",
      es: "Seres que atraviesan los mundos",
    },
  },
  biomes: {
    number: "III",
    tagline: {
      fr: "La vie s'organise seule, magnifiquement",
      en: "Life organises itself, magnificently",
      es: "La vida se organiza sola, magníficamente",
    },
  },
  abysses: {
    number: "IV",
    tagline: {
      fr: "Dans les profondeurs, quelque chose regarde",
      en: "In the depths, something watches",
      es: "En las profundidades, algo observa",
    },
  },
};

export default function GalleryClient({
  artworks,
  series,
  lang,
  dict,
}: GalleryClientProps) {
  return (
    <div>
      <ChapterNav series={series} lang={lang} dict={dict} />

      {series.map((serie) => {
        const serieArtworks = artworks.filter((a) => a.serie === serie);
        const meta = seriesMeta[serie];
        const serieLabel =
          dict.gallery.series[serie as keyof typeof dict.gallery.series];

        return (
          <section key={serie} id={serie}>
            <ChapterHeader
              number={meta.number}
              title={serieLabel}
              tagline={meta.tagline[lang]}
              previewArtwork={serieArtworks[0]}
            />
            <SeriesCarousel
              artworks={serieArtworks}
              lang={lang}
              dict={dict}
              serieLabel={serieLabel}
            />
          </section>
        );
      })}
    </div>
  );
}

/* ─── Chapter navigation ─────────────────────────────── */

function ChapterNav({
  series,
  lang,
  dict,
}: {
  series: Serie[];
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <nav className="sticky top-[72px] z-40 bg-bg/90 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
        {series.map((serie, i) => {
          const meta = seriesMeta[serie];
          const label =
            dict.gallery.series[serie as keyof typeof dict.gallery.series];
          return (
            <a
              key={serie}
              href={`#${serie}`}
              className="flex-shrink-0 flex items-center gap-2 text-muted hover:text-text transition-colors duration-300 group"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="text-[10px] tracking-[0.3em] text-muted/50 group-hover:text-teal/70 transition-colors duration-300">
                {meta.number}
              </span>
              <span className="text-xs tracking-[0.18em] uppercase">{label}</span>
              {i < series.length - 1 && (
                <span className="ml-3 w-4 h-px bg-border" aria-hidden />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── Chapter header (full-screen intro per series) ──── */

function ChapterHeader({
  number,
  title,
  tagline,
  previewArtwork,
}: {
  number: string;
  title: string;
  tagline: string;
  previewArtwork: Artwork;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ghosted background artwork */}
      <div className="absolute inset-0">
        <Image
          src={previewArtwork.image}
          alt=""
          fill
          className="object-contain opacity-[0.05]"
          sizes="100vw"
          aria-hidden
        />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(7,7,10,0.5) 55%, rgb(7,7,10) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.1 }}
          className="block text-muted tracking-[0.55em] uppercase text-xs mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {number}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-light italic text-text leading-none mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 14vw, 11rem)",
          }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="w-12 h-px bg-teal mx-auto mb-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-muted text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-muted/25" />
      </motion.div>
    </div>
  );
}

/* ─── Horizontal carousel per series ────────────────── */

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
  }),
};

const textVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

function SeriesCarousel({
  artworks,
  lang,
  dict,
  serieLabel,
}: {
  artworks: Artwork[];
  lang: Locale;
  dict: Dictionary;
  serieLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const touchStartX = useRef<number>(0);

  const total = artworks.length;
  const artwork = artworks[index];
  const title = artwork.titles[lang];
  const description = artwork.descriptions[lang];

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) navigate(dx > 0 ? -1 : 1);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">

          {/* ── Artwork + passe-partout ── */}
          <div
            className="w-full md:w-[55%] relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Passe-partout frame */}
            <div
              className="relative overflow-hidden"
              style={{
                background: "#1a1510",
                padding: "clamp(20px, 5vw, 48px)",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)",
                border: "1px solid rgba(201,168,76,0.07)",
              }}
            >
              <div className="relative" style={{ aspectRatio: "1 / 1" }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={artwork.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={artwork.image}
                      alt={title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Arrow buttons — flanking the frame */}
            <button
              onClick={() => navigate(-1)}
              aria-label="Œuvre précédente"
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted/40 hover:text-teal transition-colors duration-300 group"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Œuvre suivante"
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted/40 hover:text-teal transition-colors duration-300 group"
            >
              <ArrowRight />
            </button>
          </div>

          {/* ── Text block ── */}
          <div className="w-full md:w-[45%] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={artwork.id + "-text"}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Counter */}
                <p
                  className="text-muted/40 mb-7"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                  }}
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </p>

                <p
                  className="text-teal mb-4"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {serieLabel}
                </p>

                <h3
                  className="font-light italic text-text leading-tight mb-7"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  }}
                >
                  {title}
                </h3>

                <div className="w-8 h-px mb-7" style={{ background: "rgba(78,205,196,0.35)" }} />

                <p
                  className="text-muted text-sm leading-loose mb-10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {description}
                </p>

                <Link
                  href={`/${lang}/oeuvre/${artwork.id}`}
                  className="inline-flex items-center gap-4 text-text/40 hover:text-teal transition-colors duration-500 group self-start"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
                  {dict.artwork.order_cta}
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-10 flex-wrap">
              {artworks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Œuvre ${i + 1}`}
                  className="h-1 rounded-full transition-all duration-400"
                  style={{
                    width: i === index ? "16px" : "4px",
                    background:
                      i === index
                        ? "rgba(78,205,196,0.8)"
                        : "rgba(107,107,122,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── SVG arrows ─────────────────────────────────────── */

function ArrowLeft() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="20" y1="7" x2="1" y2="7" />
      <polyline points="7,1 1,7 7,13" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="0" y1="7" x2="19" y2="7" />
      <polyline points="13,1 19,7 13,13" />
    </svg>
  );
}
