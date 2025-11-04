import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Montrose - Social Media Growth Platform",
  description: "Transform your social media presence with professional content management, real-time analytics, and proven growth strategies. Grow your business 10x faster.",
  keywords: "social media marketing, Instagram growth, content management, social media analytics, SMMA platform",
  authors: [{ name: "Montrose" }],
  openGraph: {
    title: "Montrose - Social Media Growth Platform",
    description: "Transform your social media presence with professional content management and real-time analytics",
    type: "website",
    locale: "en_US",
    siteName: "Montrose",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montrose - Social Media Growth Platform",
    description: "Transform your social media presence with professional content management and real-time analytics",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}