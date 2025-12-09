import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

import { BASE_URL } from '@/config';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Matt の 小天地',
    template: '%s | Matt の 小天地',
  },
  description: '一個自我紀錄的小角落 - 有時技術，有時感悟',
  openGraph: {
    title: 'Matt の 小天地',
    description: '一個自我紀錄的小角落 - 有時技術，有時感悟',
    url: BASE_URL,
    siteName: 'Matt の 小天地',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matt の 小天地',
    description: '一個自我紀錄的小角落 - 有時技術，有時感悟',
  },
  verification: {
    google: '4yXQoexDZDdb70jGClBcTSfOHyJ333IWYCP5rr4I5Hg',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
