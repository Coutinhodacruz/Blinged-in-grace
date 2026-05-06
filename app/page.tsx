'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Heart, Sparkles, Gift, Palette, ArrowRight, Star, Quote } from 'lucide-react'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const FEATURED_ITEMS = [
    {
      id: 1,
      name: 'Personalized Blinged Water Bottle / Tumbler',
      by: 'Desiree',
      category: 'bedazzled',
      startingPrice: 'Starting at $25',
      description: 'Your name or message bedazzled in sparkling rhinestones on a tumbler or water bottle. Choose your colours, theme, and design.',
      image: 'https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/5bd216c04_image.png',
      tags: ['Rhinestones', 'Personalized', 'Gift Idea'],
    },
    {
    id: 2,
    name: 'Custom T-Shirt',
    by: 'Rire',
    category: 'printed',
    startingPrice: 'Starting at $18',
    description: 'Design your own t-shirt with a custom print — your name, favourite quote, faith message, birthday design, or business logo.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop',
    tags: ['T-Shirt', 'Custom Print', 'Fashion'],
  },
   {
    id: 3,
    name: 'Custom Stickers & Labels',
    by: 'Rire',
    category: 'printed',
    startingPrice: 'Starting at $8',
    description: 'High-quality stickers and labels for personal use, businesses, gifts, packaging, or special events.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop',
    tags: ['Stickers', 'Labels', 'Branding'],
  },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <HeroSection />


        {/* Featured Products Section */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
            >
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3 block">Handcrafted Favorites</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Featured <span className="italic text-primary">Designs</span>
                </h2>
              </div>
              <Button asChild variant="ghost" className="text-primary hover:text-primary/80 font-bold group">
                <Link href="/shop">
                  View All Products <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEATURED_ITEMS.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="text-xs font-bold text-primary">{item.startingPrice}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-secondary rounded-md text-muted-foreground font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
                        {item.description}
                      </p>
                      <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">D</div>
                          <span className="text-xs text-muted-foreground">by <span className="font-semibold text-foreground">{item.by}</span></span>
                        </div>
                        <Link href={`/shop`} className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* NEW SECTION: Handcrafted With Love */}
        <section className="py-20 lg:py-28 overflow-hidden bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                  <img
                    src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/92f0b2cde_generated_33e72fef.png"
                    alt="Handcrafted bedazzled items"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary border border-border/50 rounded-2xl p-8 shadow-2xl z-20 hidden md:flex flex-col justify-center text-center">
                  <span className="text-4xl font-bold text-primary mb-1">100%</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Handmade with Love</span>
                  <Sparkles className="w-4 h-4 text-accent mx-auto mt-4" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[1px] bg-primary"></div>
                    <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Our Philosophy</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.2]">
                    Every Sparkle Tells <span className="italic text-primary">A Story</span>.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At Blinged in Grace, we believe creativity is a gift meant to be shared. Founded by sisters Desiree and Rire, our brand combines professional craftsmanship with a personal, heartfelt touch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Unique Artistry</h4>
                    <p className="text-muted-foreground leading-relaxed">No mass production. Every item is individually crafted to ensure it's as unique as you are.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Faith Rooted</h4>
                    <p className="text-muted-foreground leading-relaxed">Our work is inspired by our faith, aiming to spread joy and encouragement through every design.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg group">
                    <Link href="/about">
                      Discover Our Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Testimonial/Quote */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10"><Sparkles className="w-20 h-20" /></div>
            <div className="absolute bottom-10 right-10"><Sparkles className="w-32 h-32" /></div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Quote className="w-12 h-12 text-accent/20 mx-auto mb-8" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display italic font-medium text-foreground leading-snug mb-8"
            >
              "Faith, Creativity, and Sparkle Made Personal. We design custom pieces that bring joy and grace to your everyday life."
            </motion.h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-muted-foreground/30"></div>
              <span className="font-bold tracking-widest uppercase text-xs text-muted-foreground">The Founders</span>
              <div className="w-12 h-[1px] bg-muted-foreground/30"></div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12"
            >
              <motion.div variants={itemVariants} className="text-center group">
                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sparkle & Shine</h3>
                <p className="text-muted-foreground leading-relaxed">Every design crafted with beautiful details and high-quality shine.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Palette className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Personalized</h3>
                <p className="text-muted-foreground leading-relaxed">Fully customizable to match your unique style and creative vision.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center group">
                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Heart className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Made With Grace</h3>
                <p className="text-muted-foreground leading-relaxed">Handcrafted with care and purpose by our two founding sisters.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Gift className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Special Moments</h3>
                <p className="text-muted-foreground leading-relaxed">Perfect for meaningful gifts, celebrations, and lasting memories.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 px-6 sm:px-8 relative overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-secondary z-0" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Have a Custom <span className="italic text-primary">Vision</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let us bring your ideas to life with sparkle and grace. Submit a custom order request and we'll create something special just for you.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-12 h-16 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-xl"
              >
                <Link href="/custom-orders">
                  Start Your Custom Order
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
