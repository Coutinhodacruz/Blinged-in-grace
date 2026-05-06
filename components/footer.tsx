import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">BG</span>
              </div>
              <span className="font-serif text-lg font-bold">Blinged in Grace</span>
            </div>
            <p className="text-sm opacity-90">Made with sparkle, style, and grace.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:underline">Shop</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:underline">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=bedazzled" className="hover:underline">Bedazzled Designs</Link>
              </li>
              <li>
                <Link href="/shop?category=apparel" className="hover:underline">Custom Apparel</Link>
              </li>
              <li>
                <Link href="/shop?category=mugs" className="hover:underline">Custom Mugs</Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:underline">Custom Orders</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:underline">Get in Touch</Link>
              </li>
              <li>Email: Blingedingrace@gmail.com</li>
              <li className="text-xs opacity-75">
                Custom orders available by request
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-90 text-center md:text-left max-w-xl">
              Blinged in Grace is proudly created by two young sisters, Desiree and Rire, bringing sparkle, style, faith, and creativity to custom designs.
            </p>
            <div className="text-sm opacity-75 flex items-center gap-1">
              Made with &nbsp;<Heart className="w-4 h-4 fill-current text-red-600" /> &nbsp; {currentYear} <Link href="https://ireemedia.com">Ireemedia.com</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
