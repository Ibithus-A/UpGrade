import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientEffects } from "@/components/ClientEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "UpGrade | Premium GCSE & A-Level STEM Tuition",
  description:
    "UpGrade delivers premium GCSE and A-Level STEM lessons with structured support, exam focus, and high standards.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] antialiased">
        <Navbar />
        {children}
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
