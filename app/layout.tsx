/**
 * FortiTwin - Root Layout
 * 
 * This is the top-level layout component for the entire application.
 * It wraps all pages with:
 * - Font configuration (Inter)
 * - Theme provider
 * - Error boundary
 * - Suspense for loading states
 * - Toaster for notifications
 * 
 * It also defines metadata for SEO and Open Graph.
 */

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata, Viewport } from "next"

// Configure the Inter font with Latin character subset
const inter = Inter({ subsets: ["latin"], display: "swap" })

/**
 * Metadata configuration for SEO and social sharing
 */
export const metadata: Metadata = {
  title: "FortiTwin",
  description: "A modern platform for conducting interviews and assessments",
  keywords: ['interview platform', 'recruitment', 'assessment', 'hiring'],
  authors: [{ name: 'FortiTwin' }],
  openGraph: {
    title: 'FortiTwin',
    description: 'A modern platform for conducting interviews and assessments',
    type: 'website',
    locale: 'en_US',
    siteName: 'FortiTwin',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FortiTwin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FortiTwin',
    description: 'A modern platform for conducting interviews and assessments',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

/**
 * Viewport configuration
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7C3AED',
}

/**
 * Root layout component that wraps all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and manifest links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {/* Theme provider to handle light/dark mode */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Error boundary to catch rendering errors */}
          <ErrorBoundary>
            {/* Suspense for handling loading states */}
            <Suspense fallback={<LoadingSpinner />}>
              {children}
              {/* Global toast notifications */}
              <Toaster />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
