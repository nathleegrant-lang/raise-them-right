import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "#RaiseThemRight | Strong Homes. Strong Children. Strong Nation.",
  description:
    "#RaiseThemRight is a public awareness initiative by Nathlee R. Grant calling families, communities, schools, churches, and everyday citizens to help shape the next generation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
