import { notFound } from "next/navigation";
import Image from "next/image";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { artworks } from "@/lib/artworks";

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "es" }];
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const l = lang as Locale;
  const dict = await getDictionary(l);
  const a = dict.about;

  // Pick a striking artwork for the portrait section
  const portrait = artworks.find((aw) => aw.id === "le-gardien") ?? artworks[0];
  const portrait2 = artworks.find((aw) => aw.id === "gestation") ?? artworks[1];

  return (
    <div className="min-h-screen">
      {/* ── Hero band ── */}
      <div className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={portrait2.image}
            alt=""
            fill
            className="object-contain opacity-[0.05]"
            sizes="100vw"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 10%, rgba(250,247,242,0.6) 60%, #faf7f2 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p
            className="animate-fade-in text-muted tracking-[0.4em] uppercase text-xs mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nathalie Zięba
          </p>
          <h1
            className="animate-fade-in-up delay-200 font-light italic text-text leading-none mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 7rem)",
            }}
          >
            {a.title}
          </h1>
          <div className="w-10 h-px bg-gold mx-auto animate-fade-in delay-400" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — artist portrait */}
          <div className="animate-fade-in-up delay-200">
            <div
              className="relative overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(28,20,16,0.12), 0 4px 16px rgba(28,20,16,0.06)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <div className="relative" style={{ aspectRatio: "1 / 1" }}>
                <Image
                  src="/nathalie-portrait.png"
                  alt="Nathalie Zięba"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              </div>
            </div>
            <p
              className="text-muted/50 text-center mt-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Nathalie Zięba — {l === "fr" ? "Dans son atelier" : l === "en" ? "In her studio" : "En su taller"}
            </p>
          </div>

          {/* Right — bio */}
          <div className="animate-fade-in-up delay-400 pt-2">
            <h2
              className="font-light italic text-text mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              }}
            >
              {a.name}
            </h2>

            <p
              className="text-text/75 leading-8 mb-6"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
            >
              {a.bio_1}
            </p>
            <p
              className="text-text/75 leading-8 mb-6"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
            >
              {a.bio_2}
            </p>
            <p
              className="text-muted leading-8 italic mb-10"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}
            >
              {a.bio_3}
            </p>

            {/* Quote */}
            <blockquote
              className="border-l-2 border-gold pl-6 mb-10"
            >
              <p
                className="text-gold italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                }}
              >
                « {a.quote} »
              </p>
            </blockquote>

            {/* Technique + contact */}
            <div className="space-y-8">
              <div className="border-t border-border pt-7">
                <p
                  className="text-gold mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {a.technique_title}
                </p>
                <p
                  className="text-text/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {a.technique_detail}
                </p>
              </div>

              <div className="border-t border-border pt-7">
                <p
                  className="text-gold mb-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {a.contact_title}
                </p>
                <p
                  className="text-text/70 mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {a.contact_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
