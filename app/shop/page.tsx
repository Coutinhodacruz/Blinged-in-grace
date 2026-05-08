'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ])
        const catData = await catRes.json()
        const prodData = await prodRes.json()
        setCategories(catData)
        setProducts(prodData)
      } catch (error) {
        console.error('Failed to fetch shop data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShopData()
  }, [])

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
                                {category.items.map((item: any) => (
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

        {/* Ready to Buy Collection */}
        <section className="py-20 px-6 sm:px-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Ready to Buy</span>
              <h2 className="text-4xl font-display font-bold text-foreground">Our <span className="italic text-primary">Signature</span> Collection</h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Pre-designed pieces ready to bring sparkle to your day immediately.</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Sparkles className="animate-pulse text-primary" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: any) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500 flex flex-col"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-bold text-primary">${product.price}</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-2">
                        {product.description}
                      </p>
                      <Button asChild className="w-full rounded-full h-12 text-xs font-bold uppercase tracking-widest">
                        <Link href="/custom-orders">Order Similar Piece</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
