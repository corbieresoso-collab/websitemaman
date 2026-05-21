"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
            <ArcCarousel
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
    <nav className="sticky top-[72px] z-40 bg-bg/90 backdrop-blur-sm border-b border-border/60">
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
              <span className="text-[10px] tracking-[0.3em] text-muted/50 group-hover:text-gold/70 transition-colors duration-300">
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

/* ─── Chapter header ─────────────────────────────────── */

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
          className="object-contain opacity-[0.26]"
          sizes="100vw"
          aria-hidden
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(250,247,242,0.12) 40%, rgba(250,247,242,0.75) 100%)",
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
          className="w-12 h-px bg-gold mx-auto mb-8 origin-left"
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
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-muted/20" />
      </motion.div>
    </div>
  );
}

/* ─── 3D Arc carousel ────────────────────────────────── */

// Arc parameters per offset from center
interface ArcStep {
  x: number;
  rotateY: number;
  z: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

const ARC_DESKTOP: Record<number, ArcStep> = {
  0: { x: 0,    rotateY: 0,    z: 0,    scale: 1,    opacity: 1,    zIndex: 10 },
  1: { x: 290,  rotateY: -30,  z: -100, scale: 0.77, opacity: 0.62, zIndex: 8 },
  2: { x: 510,  rotateY: -54,  z: -240, scale: 0.55, opacity: 0.32, zIndex: 6 },
};

const ARC_MOBILE: Record<number, ArcStep> = {
  0: { x: 0,    rotateY: 0,    z: 0,    scale: 1,    opacity: 1,    zIndex: 10 },
  1: { x: 190,  rotateY: -28,  z: -80,  scale: 0.72, opacity: 0.55, zIndex: 8 },
  2: { x: 330,  rotateY: -50,  z: -180, scale: 0.50, opacity: 0.25, zIndex: 6 },
};

function getCardProps(offset: number, isMobile: boolean): ArcStep {
  const table = isMobile ? ARC_MOBILE : ARC_DESKTOP;
  const abs = Math.min(Math.abs(offset), 2);
  const sign = offset >= 0 ? 1 : -1;
  const base = table[abs];
  return {
    ...base,
    x: sign * base.x,
    rotateY: sign * base.rotateY,
  };
}

const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

function ArcCarousel({
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
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const total = artworks.length;

  const navigate = useCallback(
    (dir: number) => {
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(idx);
    },
    []
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) navigate(dx > 0 ? -1 : 1);
  };

  const visibleItems = VISIBLE_OFFSETS.map((offset) => ({
    offset,
    index: (current + offset + total) % total,
    artwork: artworks[(current + offset + total) % total],
  }));

  const currentArtwork = artworks[current];
  const title = currentArtwork.titles[lang];
  const description = currentArtwork.descriptions[lang];

  const stageH = isMobile ? 320 : 500;
  const cardW = isMobile ? 180 : 280;
  const cardH = isMobile ? 230 : 360;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative py-20 md:py-28 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Arc stage */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{
          height: stageH,
          perspective: "1400px",
        }}
      >
        <AnimatePresence>
          {visibleItems.map(({ offset, artwork }) => {
            const props = getCardProps(offset, isMobile);
            const isCurrent = offset === 0;
            return (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: props.scale * 0.85 }}
                animate={{
                  x: props.x,
                  rotateY: props.rotateY,
                  z: props.z,
                  scale: props.scale,
                  opacity: props.opacity,
                  zIndex: props.zIndex,
                }}
                whileHover={
                  !isCurrent
                    ? {
                        scale: props.scale * 1.12,
                        opacity: Math.min(props.opacity + 0.25, 1),
                        z: props.z + 40,
                        zIndex: props.zIndex + 2,
                      }
                    : undefined
                }
                exit={{ opacity: 0, scale: props.scale * 0.8 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={isCurrent ? "arc-center-float" : ""}
                style={{
                  position: "absolute",
                  width: cardW,
                  height: cardH,
                  cursor: isCurrent ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (!isCurrent) {
                    navigate(offset > 0 ? 1 : -1);
                  }
                }}
              >
                {/* Passe-partout frame */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#f3ece0",
                    padding: isMobile ? "14px" : "20px",
                    boxShadow: isCurrent
                      ? "0 16px 50px rgba(28,20,16,0.14), 0 4px 14px rgba(28,20,16,0.08)"
                      : "0 8px 24px rgba(28,20,16,0.09)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image
                      src={artwork.image}
                      alt={artwork.titles[lang]}
                      fill
                      className="object-contain"
                      sizes={`${cardW}px`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-center gap-8 mt-12 mb-10">
        <button
          onClick={() => navigate(-1)}
          aria-label="Précédent"
          className="text-muted/50 hover:text-gold transition-colors duration-300"
        >
          <ArrowLeft />
        </button>

        <span
          className="text-muted/40"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <button
          onClick={() => navigate(1)}
          aria-label="Suivant"
          className="text-muted/50 hover:text-gold transition-colors duration-300"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mb-12 flex-wrap px-4">
        {artworks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Œuvre ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === current ? "16px" : "4px",
              background:
                i === current
                  ? "rgba(201,168,76,0.75)"
                  : "rgba(138,122,104,0.25)",
            }}
          />
        ))}
      </div>

      {/* Text block */}
      <div className="max-w-xl mx-auto px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtwork.id + "-text"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="text-gold mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
              }}
            >
              {serieLabel}
            </p>

            <h3
              className="font-light italic text-text leading-tight mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              }}
            >
              {title}
            </h3>

            <div
              className="w-8 h-px mx-auto mb-5"
              style={{ background: "rgba(201,168,76,0.4)" }}
            />

            <p
              className="text-muted text-sm leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {description}
            </p>

            <Link
              href={`/${lang}/oeuvre/${currentArtwork.id}`}
              className="inline-flex items-center gap-3 text-muted hover:text-gold transition-colors duration-500 group"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
              {dict.artwork.order_cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── SVG arrows ─────────────────────────────────────── */

function ArrowLeft() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="22" y1="7" x2="1" y2="7" />
      <polyline points="8,1 1,7 8,13" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="0" y1="7" x2="21" y2="7" />
      <polyline points="14,1 21,7 14,13" />
    </svg>
  );
}
