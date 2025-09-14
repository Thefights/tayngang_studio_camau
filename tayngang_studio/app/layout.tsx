import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sổ Tay Du Lịch Cà Mau - Khám Phá Miền Tây Nam Bộ",
  description:
    "Khám phá vẻ đẹp hoang sơ của miền Tây Nam Bộ qua những trang sổ tay được thiết kế tinh tế. Sản phẩm chất lượng cao, giao hàng toàn quốc.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
      >
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
