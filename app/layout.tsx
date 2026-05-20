import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Lagos Rent Affordability Calculator 2026 | How Much Rent Can I Afford in Lagos?",
  description:
    "Calculate exactly how much rent you can afford in Lagos, Nigeria. Includes agency fee, legal fee, and caution deposit in your total move-in cost. Compare all major Lagos neighbourhoods.",
  keywords: [
    "Lagos rent calculator",
    "how much rent can I afford Lagos",
    "Lagos rent affordability",
    "Lagos total package rent",
    "agency fee Lagos",
    "rent in Lagos 2026",
    "Lekki rent prices",
    "Victoria Island rent",
    "Yaba rent prices",
    "Lagos apartment cost calculator",
  ],
  openGraph: {
    title:
      "Lagos Rent Affordability Calculator 2026 | How Much Rent Can I Afford in Lagos?",
    description:
      "Calculate exactly how much rent you can afford in Lagos, Nigeria. Includes agency fee, legal fee, and caution deposit in your total move-in cost. Compare all major Lagos neighbourhoods.",
    url: "https://lagosrentcalculator.com",
    siteName: "Lagos Rent Calculator",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Lagos Rent Affordability Calculator 2026 | How Much Rent Can I Afford in Lagos?",
    description:
      "Calculate exactly how much rent you can afford in Lagos, Nigeria. Includes agency fee, legal fee, and caution deposit in your total move-in cost. Compare all major Lagos neighbourhoods.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://lagosrentcalculator.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
