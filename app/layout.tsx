import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import NavMenu from "@/components/nav/NavMenu";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Desert Collections",
  description: "Christian Wisdom from the Deserts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen, bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SessionProvider session={session}>
          <main>
            <NavMenu />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
