'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Camera } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: 'Blinged Water Bottle',
      category: 'Bedazzled Designs',
      image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
      description: 'Hand-placed rhinestones with custom name detailing.',
    },
    {
      id: 2,
      title: 'Faith Scripture Shirt',
      category: 'Faith Collection',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop',
      description: 'Soft cotton tee with metallic gold scripture print.',
    },
    {
      id: 3,
      title: 'Custom Photo Mug',
      category: 'Custom Mugs',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?w=800&auto=format&fit=crop',
      description: 'Vibrant photo transfer with personalized message.',
    },
    {
      id: 4,
      title: 'Business Branding Kit',
      category: 'Business Branding',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
      description: 'Coordinated stickers and labels for a boutique brand.',
    },
    {
      id: 5,
      title: 'Glitter Ombre Tumbler',
      category: 'Bedazzled Designs',
      image: 'https://images.unsplash.com/photo-1570857502809-08184874388e?w=800&auto=format&fit=crop',
      description: 'Double-walled tumbler with custom glitter finish.',
    },
    {
      id: 6,
      title: 'Inspirational Hooded Sweatshirt',
      category: 'Printed Apparel',
      image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop',
      description: 'Premium heavyweight hoodie with custom quote.',
    },
    {
      id: 7,
      title: 'Luxe Rhinestone Phone Case',
      category: 'Bedazzled Designs',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
      description: 'Full-coverage bedazzled case for ultimate sparkle.',
    },
    {
      id: 8,
      title: 'Personalized Gift Mug',
      category: 'Custom Mugs',
      image: 'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06?w=800&auto=format&fit=crop',
      description: 'Beautiful ceramic mug with handwritten-style name.',
    },
    {
      id: 9,
      title: 'Custom Brand Stickers',
      category: 'Stickers & Labels',
      image: 'https://images.unsplash.com/photo-1589948182061-2b860e382e97?w=800&auto=format&fit=crop',
      description: 'Durable vinyl stickers for professional packaging.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Our Portfolio</span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                A Gallery of <span className="italic text-primary">Grace</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Browse through our collection of past creations. Every item here was once a dream shared by a customer, brought to life with sparkle and care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 px-6 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group rounded-3xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                       <p className="text-white text-sm font-medium italic">Handcrafted by Blinged in Grace</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {item.category}
                       </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 sm:px-8 bg-secondary relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
           
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display italic leading-tight">
              Inspired by Our Work?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              We can create something just as beautiful (or even more so!) for you. Let's start the journey of making your vision a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-xl group"
              >
                <Link href="/custom-orders">
                  Start Custom Order <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 border-primary text-primary hover:bg-primary/5"
              >
                <Link href="/shop">
                  Browse Shop
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
