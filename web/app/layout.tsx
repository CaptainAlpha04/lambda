import type { Metadata } from "next";
import { Poppins, Pacifico } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700"] });

const pacifico = Pacifico({ subsets: ["latin"], variable: "--font-pacifico", weight: ["400"] });

export const metadata: Metadata = {
  title: "Schola | Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${pacifico.variable}`}>
        {children}
        </body>
    </html>
  );
}
