import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PageLoading from "@/components/layouts/loading/PageLoading";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gradients CSS - Professional CSS Gradients",
  description:
    "Discover and replicate professional-grade CSS gradients effortlessly with Gradients CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@600,500,300,700,400&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="./assets/logo.png" sizes="any" />

        <title>Gradients CSS</title>

        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Discover and replicate professional-grade CSS gradients effortlessly with Gradients CSS."
        />
        <meta
          name="keywords"
          content="Gradients CSS, CSS gradients, web design, visual appeal, professional-grade gradients"
        />
        <meta name="author" content="Your Name or Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="og:title"
          content="Gradients CSS - Professional CSS Gradients"
        />
        <meta
          name="og:description"
          content="Discover and replicate professional-grade CSS gradients effortlessly with Gradients CSS."
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://gradientscss.vercel.app/" />
        <meta
          name="og:image"
          content="https://gradientscss.vercel.app/assets/logo.png"
        />
        <meta name="og:image:alt" content="Gradients CSS Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gradients CSS - Professional CSS Gradients"
        />
        <meta
          name="twitter:description"
          content="Discover and replicate professional-grade CSS gradients effortlessly with Gradients CSS."
        />
        <meta
          name="twitter:image"
          content="https://gradientscss.vercel.app/assets/logo.png"
        />
      </head>

      <body className={inter.className}>
        <PageLoading />

        <Analytics />

        {children}

        <Toaster />
      </body>
    </html>
  );
}
