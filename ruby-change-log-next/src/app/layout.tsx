import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ["300", "400", "600", "700"] });

export const metadata: Metadata = {
  title: "Rubyの歴史と進化：初心者向けガイド",
  description: "Rubyの主要なバージョンアップを初心者向けにまとめたサイト",
};

const htmlStyle = { margin: 0, padding: 0, boxSizing: 'border-box' };
const bodyStyle = { margin: 0, padding: 0, boxSizing: 'border-box' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" style={htmlStyle}>
      <head />
      <body className={inter.className + " bg-slate-100 text-slate-800"} style={bodyStyle}>
        {children}
      </body>
    </html>
  );
}
