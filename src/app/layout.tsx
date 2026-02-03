import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'
import './globals.css'

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Wei Hsuan Lee | Front-End Developer',
  description:
    'Front-end developer with 4+ years of experience in React, TypeScript, and modern web frameworks.',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#95C1D5' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1833' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${syne.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
