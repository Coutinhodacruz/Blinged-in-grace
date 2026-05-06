'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/61d225fef_generated_12d0d921.png"
          alt="Desiree and Rire in their creative studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
                Designed by Sisters. Inspired by Grace.
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-foreground mb-6">
              Two Sisters.{' '}
              <span className="italic text-primary">One Creative</span>{' '}
              Dream.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Blinged In Grace is a custom design business created by two young sisters, bringing sparkle, style, faith, and creativity to personalized designs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/shop">
                  Explore Our Designs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative sparkle elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.7, repeatDelay: 2 }}
        className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-accent rounded-full"
      />
    </section>
  )
}
