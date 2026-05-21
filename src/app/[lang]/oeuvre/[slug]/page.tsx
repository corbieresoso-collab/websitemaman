import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { getArtworkById, artworks } from "@/lib/artworks";
import OrderForm from "@/components/OrderForm";

export async function generateStaticParams() {
  const langs = ["fr", "en", "es"];
  return langs.flatMap((lang) =>
    artworks.map((a) => ({ lang, slug: a.id }))
  );
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const artwork = getArtworkById(slug);
  if (!artwork) notFound();

  const dict = await getDictionary(lang as Locale);
  const locale = lang as Locale;

  const title = artwork.titles[locale];
  const description = artwork.descriptions[locale];
  const serieLabel =
    dict.gallery.series[artwork.serie as keyof typeof dict.gallery.series];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Link
        href={`/${lang}/galerie`}
        className="text-muted hover:text-teal transition-colors text-sm tracking-widest uppercase mb-12 inline-block"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {dict.artwork.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
        {/* Image */}
        <div className="relative animate-fade-in">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={artwork.image}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start pt-4 animate-fade-in-up delay-200">
          <p
            className="text-teal text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {dict.artwork.series_label} — {serieLabel}
          </p>

          <h1
            className="text-5xl md:text-6xl font-light italic text-text leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>

          <p
            className="text-text/70 leading-8 text-base mb-12 max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {description}
          </p>

          {artwork.available && (
            <div className="border-t border-border pt-10">
              <h2
                className="text-xl font-light italic text-text mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.artwork.order_cta}
              </h2>
              <OrderForm artwork={artwork} lang={locale} dict={dict} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
