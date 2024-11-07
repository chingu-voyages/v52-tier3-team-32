import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalAppProvider from "./global-ui/providers/GlobalAppProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solar Panel App",
  description:
    "Currently being developed by members of chingu.io V52-tier3-team32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalAppProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </GlobalAppProvider>
  );
}
