import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"




export const metadata: Metadata = {
  title: "Laouiti Bilel - Backend & Full-Stack Developer",
  description: "Portfolio of Laouiti Bilel, a Backend and Full-Stack Developer specializing in scalable systems, APIs, and modern web/mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <body className="bg-white dark:bg-black transition-colors duration-300">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />

            <main className="pt-32 pb-20">
              {children}
            </main>
            <Footer />

          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
