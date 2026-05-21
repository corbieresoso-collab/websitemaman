import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import CommanderClient from "./CommanderClient";

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "es" }];
}

export default async function CommanderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const l = lang as Locale;
  const dict = await getDictionary(l);

  return <CommanderClient lang={l} dict={dict} />;
}
