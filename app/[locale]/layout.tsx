import type { Metadata } from "next";
import { Anton, Nunito_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/publico/navbar";
import { Footer } from "@/components/publico/footer";
import "../globals.css";

const fuenteTitulos = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-titulos",
});

const fuenteCuerpo = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-cuerpo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type PropiedadesLayout = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PropiedadesLayout): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("tituloDefault"),
      template: t("tituloTemplate"),
    },
    description: t("descripcion"),
    openGraph: {
      title: t("tituloDefault"),
      description: t("descripcion"),
      locale,
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LayoutLocale({
  children,
  params,
}: PropiedadesLayout) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const mensajes = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fuenteTitulos.variable} ${fuenteCuerpo.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <NextIntlClientProvider messages={mensajes}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
