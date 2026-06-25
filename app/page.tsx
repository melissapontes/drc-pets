import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { translations, type Lang } from "./translations";

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ lang?: string }> }
): Promise<Metadata> {
  const sp = await searchParams;
  const lang: Lang = sp.lang === "es" ? "es" : sp.lang === "en" ? "en" : "pt";
  const m = translations[lang].meta;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: m.locale,
      type: "website",
      images: [{ url: "/icon-512.png", width: 512, height: 512, alt: m.title }],
    },
    twitter: {
      card: "summary",
      title: m.title,
      description: m.description,
      images: ["/icon-512.png"],
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
