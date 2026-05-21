"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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

            {serieArtworks.map((artwork, i) => (
              <ArtworkSection
                key={artwork.id}
                artwork={artwork}
                lang={lang}
                dict={dict}
                isFirst={i === 0}
                isEven={i % 2 === 0}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

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

function ArtworkSection({
  artwork,
  lang,
  dict,
  isFirst,
  isEven,
}: {
  artwork: Artwork;
  lang: Locale;
  dict: Dictionary;
  isFirst: boolean;
  isEven: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const title = artwork.titles[lang];
  const description = artwork.descriptions[lang];
  const serieLabel =
    dict.gallery.series[artwork.serie as keyof typeof dict.gallery.series];

  if (isFirst) {
    return (
      <div
        ref={ref}
        className="relative min-h-[90vh] flex items-end overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={artwork.image}
            alt={title}
            fill
            className="object-contain"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgb(7,7,10) 0%, rgba(7,7,10,0.92) 25%, rgba(7,7,10,0.5) 50%, rgba(7,7,10,0.1) 75%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p
                className="text-teal text-xs tracking-[0.35em] uppercase mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {serieLabel}
              </p>
              <h3
                className="font-light italic text-text leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                }}
              >
                {title}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="md:max-w-xs"
            >
              <p
                className="text-muted text-sm leading-loose mb-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {description}
              </p>
              <Link
                href={`/${lang}/oeuvre/${artwork.id}`}
                className="inline-flex items-center gap-4 text-text/40 hover:text-teal transition-colors duration-500 text-xs tracking-[0.25em] uppercase group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
                {dict.artwork.order_cta}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} min-h-[75vh]`}
    >
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative md:w-[60%] min-h-[60vw] md:min-h-0 overflow-hidden"
      >
        <Link
          href={`/${lang}/oeuvre/${artwork.id}`}
          className="absolute inset-0 flex items-center justify-center p-8 md:p-12 group"
        >
          <div className="relative w-full h-full">
            <Image
              src={artwork.image}
              alt={title}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        </Link>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.3 }}
        className="md:w-[40%] flex flex-col justify-center px-10 md:px-12 lg:px-20 py-16 md:py-0 border-t border-border/30 md:border-t-0 md:border-l md:border-border/20"
      >
        <p
          className="text-teal text-xs tracking-[0.35em] uppercase mb-5"
          style={{ fontFamily: "var(--font-body)" }}
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
        <div className="w-8 h-px bg-teal/40 mb-7" />
        <p
          className="text-muted text-sm leading-loose mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
        <Link
          href={`/${lang}/oeuvre/${artwork.id}`}
          className="inline-flex items-center gap-4 text-text/40 hover:text-teal transition-colors duration-500 text-xs tracking-[0.25em] uppercase group self-start"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
          {dict.artwork.order_cta}
        </Link>
      </motion.div>
    </div>
  );
}
