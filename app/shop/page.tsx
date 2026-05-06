'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'bedazzled',
      name: 'Bedazzled Designs',
      image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
      color: 'accent',
      description: 'Water bottles, tumblers, phone cases, and shoes—all sparkled with premium rhinestones.',
      items: [
        'Water Bottles',
        'Tumblers & Drinkware',
        'Phone Cases',
        'Shoes & Footwear',
        'Bags & Accessories',
      ],
    },
    {
      id: 'apparel',
      name: 'Custom Apparel',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
      color: 'primary',
      description: 'Personalized t-shirts and hoodies for events, families, and businesses with custom designs.',
      items: [
        'T-Shirts',
        'Birthday Shirts',
        'Family Shirts',
        'Church Event Shirts',
        'Scripture Shirts',
      ],
    },
    {
      id: 'mugs',
      name: 'Custom Mugs',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?w=800&auto=format&fit=crop',
      color: 'accent',
      description: 'Photo mugs, Scripture mugs, and personalized gifts for every special occasion.',
      items: [
        'Photo Mugs',
        'Birthday Mugs',
        'Scripture Mugs',
        'Holiday Mugs',
        'Business Logo Mugs',
      ],
    },
    {
      id: 'stickers',
      name: 'Stickers & Labels',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
      color: 'primary',
      description: 'Custom stickers for businesses, events, packaging, and personal branding.',
      items: [
        'Business Logo Stickers',
        'Product Labels',
        'Packaging Stickers',
        'Event Stickers',
        'Thank-You Stickers',
      ],
    },
    {
      id: 'faith',
      name: 'Faith Collection',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop',
      color: 'accent',
      description: 'Scripture-based and inspirational designs to encourage and uplift beautifully.',
      items: [
        'Scripture Apparel',
        'Faith-Based Gifts',
        'Inspirational Quotes',
        'Prayer Items',
        'Christian Designs',
      ],
    },
    {
      id: 'business',
      name: 'Business Branding',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop',
      color: 'primary',
      description: 'Branded items to help small businesses look professional and memorable.',
      items: [
        'Branded Shirts',
        'Logo Stickers',
        'Business Mugs',
        'Product Labels',
        'Branded Gifts',
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Handcrafted with Love</span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Our <span className="italic text-primary">Creative</span> Shop
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore our collection of custom designs. Every piece is a canvas for your story, sparkled with grace and style.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id
                return (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`group rounded-3xl overflow-hidden transition-all duration-500 bg-card border border-border/50 hover:shadow-2xl ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div 
                      className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                      onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute bottom-6 left-6 right-6">
                         <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                         <p className="text-white/80 text-xs uppercase tracking-widest font-medium">Explore Collection</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                        {category.description}
                      </p>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-8 pt-6 border-t border-border">
                              <p className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
                                Available Custom Items:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                  <span
                                    key={item}
                                    className="text-[11px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        asChild
                        className="w-full rounded-full h-12 text-sm font-bold tracking-widest uppercase group"
                      >
                        <Link href={`/custom-orders?category=${category.id}`}>
                          Start Order <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Ready to Order CTA */}
        <section className="py-24 px-6 sm:px-8 bg-secondary relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display italic">
              Don't See What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              We love a creative challenge! Submit a custom request and tell us about your unique vision—we'll do our best to bring it to life.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-12 h-14 text-sm font-bold tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl"
            >
              <Link href="/custom-orders">
                Custom Request <Sparkles className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
