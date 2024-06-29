import Nav from "@/components/nav/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Name",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <div className="flex">
              <header>
                <Nav />
              </header>
              <main className="flex-grow min-h-screen">
                {children}
              </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}