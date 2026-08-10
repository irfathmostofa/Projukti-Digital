import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/shared/Analytics";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteSettings } from "@/lib/data";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Premium Digital Agency",
    template: "%s",
  },
  description:
    "We build powerful software products, custom digital solutions, and data-driven marketing systems for modern businesses.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {settings?.google_search_console_verification && (
          <meta
            name="google-site-verification"
            content={settings.google_search_console_verification}
          />
        )}
        {settings?.favicon && <link rel="icon" href={settings.favicon} />}
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd(settings)} />
        <JsonLd data={websiteJsonLd(settings)} />
        <Analytics settings={settings} />
        {children}
      </body>
    </html>
  );
}
