import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Umer Khalil — Engineer & Automator",
  description: "Software engineer and GHL automation specialist. I build MLOps pipelines, deepfake detection systems, and full-stack products — or I design the automation infrastructure that runs your agency.",
  openGraph: {
    title: "Umer Khalil — Engineer & Automator",
    description: "Software engineer and GHL automation specialist based in Islamabad.",
    url: "https://umerkhalil.dev",
    siteName: "Umer Khalil",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Khalil — Engineer & Automator",
    description: "Software engineer and GHL automation specialist based in Islamabad.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jetbrains.variable} font-serif bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
