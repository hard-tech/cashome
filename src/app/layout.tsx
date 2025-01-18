import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
// import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cashome - Gestion financière familiale",
  description: "Application de gestion financière pour les foyers, permettant de gérer les transactions, les missions et les ventes entre membres de la famille.",
  keywords: ["finance familiale", "gestion d'argent", "missions familiales", "vente entre membres"],
  authors: [{ name: "Votre Nom" }],
  creator: "Votre Nom",
  publisher: "Cashome",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Cashome - Gestion financière familiale",
    description: "Gérez vos finances familiales avec Cashome",
    url: "https://cashome.vercel.app",
    siteName: "Cashome",
    images: [
      {
        url: "https://cashome.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashome - Gestion financière familiale",
    description: "Gérez vos finances familiales avec Cashome",
    creator: "@votre_compte_twitter",
    images: ["https://cashome.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // data-theme='blue-lightcr'
      >
        <Providers>
          {children}
        </Providers>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
