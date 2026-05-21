import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { artworks, series } from "@/lib/artworks";
import GalleryClient from "@/components/GalleryClient";

export default async function GalleriePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <GalleryClient
      artworks={artworks}
      series={series}
      lang={lang as Locale}
      dict={dict}
    />
  );
}
