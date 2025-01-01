import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import '../styles/globals.css'

import { APP_URL, cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL as string),
  title: 'Global Community Organization',
  description:
    'Global Community Organization · Mission · To develop healthy, standardized, improved living system and sustainable environment is the only goal.',
  twitter: {
    title: 'Global Community Organization',
    description:
      'Global Community Organization · Mission · To develop healthy, standardized, improved living system and sustainable environment is the only goal.',
    images: [
      {
        url: '/child.jpg',
        alt: 'One tree for One child',
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: 'Global Community Organization',
    description:
      'Global Community Organization · Mission · To develop healthy, standardized, improved living system and sustainable environment is the only goal.',
    images: [
      {
        url: '/child.jpg',
        alt: 'One tree for One child',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen  !bg-white dark:!bg-zinc-800 font-sans antialiased overflow-x-hidden',
          fontSans.variable
        )}
      >
        <div vaul-drawer-wrapper="" className="bg-background">
          <NextTopLoader zIndex={1000} color="#5CB02F" showSpinner={false} />

          {children}
        </div>
      </body>
    </html>
  )
}
