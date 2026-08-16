import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/features/sidebar/sidebar";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-file",
});

export const metadata: Metadata = {
  title: "LiftOS",
  description: "Coaching app for powerlifting programs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex h-full flex-col overflow-hidden bg-ground font-sans text-ink md:flex-row">
        <Sidebar />
        <main id="main" className="min-w-0 flex-1 overflow-auto bg-ground">
          {children}
        </main>
      </body>
    </html>
  );
}
