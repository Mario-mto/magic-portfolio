import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MagneticCursor } from "@/components/layout/MagneticCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { baseURL, home } from "@/resources";
import { LangProvider } from "@/lib/i18n";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

const ogImage = `/api/og/generate?title=${encodeURIComponent(home.title)}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: home.title,
  description: home.description,
  openGraph: { title: home.title, description: home.description, type: "website", images: [ogImage] },
  twitter: { card: "summary_large_image", title: home.title, description: home.description, images: [ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LangProvider>
          <SmoothScroll>
            <MagneticCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
