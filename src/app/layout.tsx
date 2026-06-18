import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "#RaiseThemRight | Nathlee R. Grant",
  description:
    "#RaiseThemRight is a public awareness initiative by Nathlee R. Grant promoting strong homes, strong children, and strong communities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
