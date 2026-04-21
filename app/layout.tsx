import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan & Verónica | Ceremonia de matrimonio",
  description:
    "Acompáñanos en la ceremonia religiosa de nuestro matrimonio en la Parroquia San Juan Bosco.",
  openGraph: {
    title: "Juan & Verónica | Ceremonia de matrimonio",
    description:
      "Acompáñanos en la ceremonia religiosa de nuestro matrimonio en la Parroquia San Juan Bosco.",
    url: "https://invitacion-boda.vercel.app",
    siteName: "Invitación de Boda",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://invitacion-boda.vercel.app/images/portada.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan & Verónica | Ceremonia de matrimonio",
    description:
      "Acompáñanos en la ceremonia religiosa de nuestro matrimonio en la Parroquia San Juan Bosco.",
    images: ["https://invitacion-boda.vercel.app/images/portada.png"],
  },
};

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
