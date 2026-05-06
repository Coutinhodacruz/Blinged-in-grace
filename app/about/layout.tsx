import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Blinged in Grace',
  description: 'Meet Desiree and Rire, the young sisters behind Blinged in Grace, creating beautiful custom designs with sparkle and grace.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
