import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Zenera HealthOS — Firebase Master Build Spec",
  description:
    "AI-Powered Hospital Revenue & Operations SaaS. One SaaS. Seven intelligence modules. One revenue-cycle workflow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-full bg-bg font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-[200] rounded-none border-4 border-ink bg-primary px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-[5px_5px_0_0_#000]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
