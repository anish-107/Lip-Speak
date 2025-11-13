/**
 * @author Anish 
 * @date 13-11-2025
 * @description layout page
 * @returns a tsx page
 */

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lipspeak",
  description: "Lipspeak is an end-to-end deep learning model for visual speech recognition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
