import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { StreakProvider } from "@/context/StreakContext";
import MathJaxLoader from "@/components/MathJaxLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLera - Machine Learning Learning Platform",
  description: "Learn machine learning concepts with interactive content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <StreakProvider>
            <MathJaxLoader />
            {children}
          </StreakProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

