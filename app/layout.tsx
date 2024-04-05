import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavMenu from "@/components/nav/NavMenu";
import Providers from "@/components/providers";

const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Desert Collections",
  description: "Christian Wisdom from the Deserts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen, bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <main>
            <NavMenu />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
