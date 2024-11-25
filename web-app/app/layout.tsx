import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalProviders from "./global-ui/providers/GlobalAppProviders";

const geistSans = localFont({
  src: "./global-ui/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./global-ui/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solar Wise",
  description: "Be Wise, Choose Solar",
  metadataBase: new URL("https://solarwise.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProviders>
          <main>{children}</main>
        </GlobalProviders>
      </body>
    </html>
  );
}
