import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Analytics & Insights
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Now – Real-Time Global Weather App",
  description:
    "Weather Now is a modern Next.js application that delivers real-time weather updates for locations worldwide using the Open-Meteo API. Instantly check current conditions, hourly and 7-day forecasts, and key metrics like temperature, humidity, wind speed, and precipitation. With geolocation support, unit toggles, and a fully responsive design, Weather Now makes tracking the weather simple, fast, and accessible on any device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics></Analytics>
        <SpeedInsights></SpeedInsights>
      </body>
    </html>
  );
}
