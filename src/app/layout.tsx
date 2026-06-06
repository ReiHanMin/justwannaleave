import type { Metadata } from "next";
import { Spectral, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Just Wanna Leave — Plan your exit strategy",
  description:
    "A dozen governments will fund your degree — tuition, sometimes rent and meals too. We did the research so you can actually do it.",
  keywords: [
    "study abroad free",
    "DSU scholarship Italy",
    "Germany tuition free",
    "MEXT scholarship Japan",
    "European university free",
    "study in Europe cheap",
  ],
  openGraph: {
    title: "Just Wanna Leave — Plan your exit strategy",
    description:
      "A dozen governments will fund your degree. Almost nobody back home tells you this. We did the research so you can actually do it.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spectral.variable} ${hankenGrotesk.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
