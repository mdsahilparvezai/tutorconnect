import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'TutorConnect - Find Trusted Home Tutors Near You',
    template: '%s | TutorConnect',
  },
  description: 'Discover verified home tutors for Class 1-12, JEE, NEET, CUET, and more. Book demo classes, chat securely, and learn with confidence.',
  keywords: ['tutor', 'home tutor', 'online tutor', 'JEE coaching', 'NEET coaching', 'private tuition', 'tutor near me'],
  authors: [{ name: 'TutorConnect' }],
  creator: 'TutorConnect',
  publisher: 'TutorConnect',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tutorconnect.app',
    siteName: 'TutorConnect',
    title: 'TutorConnect - Find Trusted Home Tutors Near You',
    description: 'Discover verified home tutors for Class 1-12, JEE, NEET, CUET, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TutorConnect - Home Tutor Discovery Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TutorConnect - Find Trusted Home Tutors',
    description: 'Discover verified home tutors for Class 1-12, JEE, NEET, CUET, and more.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1f2937',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
            },
            success: {
              iconTheme: {
                primary: '#059669',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}