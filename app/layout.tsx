import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// eslint-disable-next-line @next/next/no-page-custom-font
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ServiceWorkerRegister } from "@/components/providers/ServiceWorkerRegister";
import { AppShell } from "@/components/navigation/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1a73e8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Pulse - AI-Powered Venue Intelligence",
  description: "An AI-powered Progressive Web App for large-scale live events.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pulse",
  },
};

import { VenueContextProvider } from "@/context/VenueContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ServiceWorkerRegister />
          <VenueContextProvider>
            <AppShell>
              {children}
            </AppShell>
          </VenueContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
