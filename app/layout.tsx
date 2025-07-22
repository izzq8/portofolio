import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Faiz Abhinaya - Web Developer & Fotografer',
  description: 'Portfolio profesional Faiz Abhinaya - Web Developer dan Fotografer. Mahasiswa Sistem Informasi dengan pengalaman dalam Next.js, React, TypeScript, dan fotografi.',
  keywords: 'Faiz Abhinaya, Web Developer, Fotografer, Next.js, React, TypeScript, Portfolio',
  authors: [{ name: 'Faiz Abhinaya' }],
  creator: 'Faiz Abhinaya',
  generator: 'Next.js',
  openGraph: {
    title: 'Faiz Abhinaya - Web Developer & Fotografer',
    description: 'Portfolio profesional Faiz Abhinaya - Web Developer dan Fotografer',
    type: 'website',
    locale: 'id_ID',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: '32x32' }
    ],
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
