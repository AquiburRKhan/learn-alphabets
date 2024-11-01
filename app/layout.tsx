import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const luckiestGuy = localFont({
  src: "./fonts/LuckiestGuy-Regular.ttf",
  variable: "--font-luckiest-guy-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Learn Alphabets",
  description: "A simple app to learn alphabets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${luckiestGuy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
