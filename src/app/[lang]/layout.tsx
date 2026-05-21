import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang as Locale} dict={dict} />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
    </div>
  );
}
