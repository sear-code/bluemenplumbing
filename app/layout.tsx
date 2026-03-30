import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/index.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bluemenplumbing.com'),
  title: 'Blue Men Plumbing - Professional Plumbing Services in GTA',
  description: 'Affordable, professional plumbing services in the GTA. Emergency repairs, bathroom renovations, drain cleaning, and more. Serving Toronto, Scarborough, and surrounding areas.',
  keywords: ['plumbing', 'GTA', 'Toronto', 'Scarborough', 'emergency plumber', 'drain cleaning', 'bathroom renovation', 'leak repair'],
  authors: [{ name: 'Blue Men Plumbing' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Blue Men Plumbing - Professional Plumbing Services',
    description: 'Quality plumbing services at affordable prices in GTA',
    type: 'website',
    locale: 'en_CA',
    url: '/',
    siteName: 'Blue Men Plumbing',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blue Men Plumbing - Professional Plumbing Services in GTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Men Plumbing - Professional Plumbing Services',
    description: 'Quality plumbing services at affordable prices in GTA',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#045372',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#045372',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: 'Blue Men Plumbing',
  description: 'Professional plumbing services in the Greater Toronto Area. Emergency repairs, bathroom renovations, drain cleaning, and more.',
  url: 'https://bluemenplumbing.com',
  telephone: '+16475007989',
  email: 'info@bluemenplumbing.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '65 Canadian Rd',
    addressLocality: 'Scarborough',
    addressRegion: 'ON',
    postalCode: 'M1R 5G2',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.7615,
    longitude: -79.2628,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 43.7615,
      longitude: -79.2628,
    },
    geoRadius: '50000',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '20',
    bestRating: '5',
    worstRating: '1',
  },
  image: 'https://bluemenplumbing.com/og-image.jpg',
  sameAs: [
    'https://share.google/B88kLmpVaa9flScJr',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Plumbing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Emergency Plumbing',
          description: '24/7 emergency plumbing repairs including burst pipes, severe leaks, and flooding.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Drain Cleaning',
          description: 'Professional drain cleaning and unclogging services for residential and commercial properties.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bathroom Renovation',
          description: 'Complete bathroom plumbing for renovations including fixture installation and pipe work.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kitchen Plumbing',
          description: 'Kitchen plumbing installation and repair including sink, dishwasher, and garbage disposal.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/lotties/bluemen_lottie.json"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/logos/bmp-light.png"
          as="image"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:text-primary focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
