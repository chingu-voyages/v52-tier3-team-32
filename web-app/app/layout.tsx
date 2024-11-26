import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './gradients.css';

import GlobalProviders from './global-ui/providers/GlobalAppProviders';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/shared/Footer';
import { Inter, Instrument_Sans } from 'next/font/google';

const geistSans = localFont({
  src: './global-ui/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './global-ui/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrumental-sans',
  weight: ['400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: 'Solar Wise',
  description: 'Be Wise, Choose Solar',
  metadataBase: new URL('https://solarwise.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSans.variable} antialiased modern-black-blue flex flex-col p-5 gap-4`}
      >
        <GlobalProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
