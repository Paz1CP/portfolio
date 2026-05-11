import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Libre_Baskerville } from "next/font/google";
import { defaultLocale, getDictionary } from "@/app/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans-portfolio",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif-portfolio",
  display: "swap",
});

const dictionary = getDictionary(defaultLocale);
const { siteConfig } = dictionary;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Christopher Paz León",
    "Flutter Developer",
    "Mobile Product Engineer",
    "Supabase Developer",
    "AI Workflows",
    "Flutter Engineer Peru",
    "Mobile Developer LATAM",
    "UX/UI Systems",
    "Product Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
    alternateLocale: ["es_PE"],
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"],
    creator: "@pazleon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0907",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${instrumentSans.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <JsonLd
          siteUrl={siteConfig.url}
          siteName={siteConfig.name}
          role={siteConfig.role}
          description={siteConfig.description}
          linkedInUrl={siteConfig.linkedInUrl}
          email={siteConfig.email}
        />
        {children}
      </body>
    </html>
  );
}
