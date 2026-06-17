import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MagneticCursor } from "@/components/layout/MagneticCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { baseURL, home } from "@/resources";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: home.title,
  description: home.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Transitional: <Providers> bridges the not-yet-migrated Once UI pages
            (they call useLayout). Removed in teardown (Task 5.2) once all pages are custom. */}
        <Providers>
          <SmoothScroll>
            <MagneticCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
