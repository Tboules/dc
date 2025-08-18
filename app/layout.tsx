import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavMenu from "@/components/nav/NavMenu";
import Providers from "@/components/providers";
import { DEFAULT_OG_PATH, SITE_BASE_URL } from "@/lib/constants";

const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Desert Collections",
  description: "Christian Wisdom from the Desert",
  metadataBase: new URL(SITE_BASE_URL),
  openGraph: {
    title: "Desert Collections",
    description: "Christian Wisdom from the Desert",
    url: "/",
    siteName: "Desert Collections",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_PATH,
        width: 1200,
        height: 1200,
        alt: "Desert Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_PATH],
  },
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
          <NavMenu />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
