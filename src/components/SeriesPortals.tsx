"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { Artwork, Serie } from "@/lib/artworks";
import type { Locale } from "@/lib/dictionaries";

interface PortalItem {
  serie: Serie;
  label: string;
  artwork: Artwork;
}

const seriesMeta: Record<
  Serie,
  { number: string; tagline: Record<Locale, string> }
> = {
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

const exploreLabel: Record<Locale, string> = {
  fr: "Explorer",
  en: "Explore",
  es: "Explorar",
};

export default function SeriesPortals({
  data,
  lang,
}: {
  data: PortalItem[];
  lang: Locale;
}) {
  return (
    <div>
      {data.map((item) => (
        <SeriesPortal key={item.serie} item={item} lang={lang} />
      ))}
    </div>
  );
}

function SeriesPortal({ item, lang }: { item: PortalItem; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const meta = seriesMeta[item.serie];

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background artwork */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={item.artwork.image}
          alt=""
          fill
          className="object-contain opacity-30"
          sizes="100vw"
          aria-hidden
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg opacity-80" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(7,7,10,0.65) 70%, rgb(7,7,10) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="block text-muted tracking-[0.5em] uppercase text-xs mb-8"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {meta.number}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-light italic text-text leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 12vw, 9rem)",
          }}
        >
          {item.label}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-muted text-xs tracking-[0.3em] uppercase mb-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {meta.tagline[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            href={`/${lang}/galerie#${item.serie}`}
            className="inline-flex items-center gap-4 border border-border/50 hover:border-teal/40 text-text/50 hover:text-teal transition-all duration-500 px-8 py-4 text-xs tracking-[0.25em] uppercase group"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {exploreLabel[lang]}
            <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
