import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Juan & Verónica - Nos casamos 💍",
  description: "Con mucha alegría queremos invitarte a nuestro matrimonio. Acompáñanos en este momento tan especial.",
  openGraph: {
    title: "Juan & Verónica - Nos casamos 💍",
    description: "Con mucha alegría queremos invitarte a nuestro matrimonio.",
    url: "https://invitacion-boda.vercel.app",
    siteName: "Invitación de Boda",
    images: [
      {
        url: "https://invitacion-boda.vercel.app/images/portada.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
