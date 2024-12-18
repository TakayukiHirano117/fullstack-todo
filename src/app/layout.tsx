import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SupabaseListener from "@/components/supabase-listener";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fullstack Todo App",
  description: "Fullstack Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex w-full">
          <SupabaseListener  />
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
