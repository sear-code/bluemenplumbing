import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/index.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blue Men Plumbing - Professional Plumbing Services in GTA',
  description: 'Quality plumbing services at affordable prices. Emergency repairs, bathroom renovations, drain cleaning, and more. Why pay more when you can pay less!',
  keywords: ['plumbing', 'GTA', 'Toronto', 'Scarborough', 'emergency plumber', 'drain cleaning', 'bathroom renovation', 'leak repair'],
  authors: [{ name: 'Blue Men Plumbing' }],
  openGraph: {
    title: 'Blue Men Plumbing - Professional Plumbing Services',
    description: 'Quality plumbing services at affordable prices in GTA',
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

