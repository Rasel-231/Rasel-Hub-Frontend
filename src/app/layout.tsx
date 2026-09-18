import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// AntD v5 এ রিসেট সিএসএস ইমপোর্ট করা ভালো প্র্যাকটিস
import "antd/dist/reset.css"; 

import ClientLayout from "./ClientLayout";
import Providers from "./lib/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RASEL HUB — Premium Digital Services",
    template: "%s | RASEL HUB",
  },
  description:
    "Professional digital services by Rasel Hasan — YouTube & Facebook promotion, web development and data entry.",
  applicationName: "RASEL HUB",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}