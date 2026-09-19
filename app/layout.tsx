import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Michael Peterson — AI Developer & Designer",
  description:
    "Portfolio of Michael Peterson: machine learning, computer vision, and NLP projects shipped as web and mobile apps, an IEEE conference paper, and graphic and UI/UX design work.",
  openGraph: {
    title: "Michael Peterson — AI Developer & Designer",
    description:
      "Machine learning shipped as products, an IEEE paper, and design work — from packaging to UI/UX.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Vercel Web Analytics — page views only, no cookies. Enable it in the Vercel dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}
