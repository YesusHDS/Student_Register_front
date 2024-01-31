import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estágio",
  description: "Registro de estagiários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
