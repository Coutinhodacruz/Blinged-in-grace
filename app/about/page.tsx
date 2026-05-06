'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, BookOpen, Cross } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div>
          {/* Hero */}
          <section className="py-20 lg:py-28 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  About Us
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
                  Two Sisters.{' '}
                  <span className="italic text-primary">One Creative Dream.</span>
                </h1>
                <p className="font-display text-lg italic text-accent mb-6">Blinged in Grace.</p>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Blinged in Grace is a children-owned creative business founded by two sisters, Desiree and Rire. Together, they created a brand that brings together creativity, sparkle, fashion, faith, and personalized design.
                </p>
              </motion.div>
            </div>
          </section>

          {/* What We Do */}
          <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-medium">
                      Our Story
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    What We <span className="italic text-primary">Do</span>
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    At Blinged in Grace, we create custom designs for people who want something personal, beautiful, and unique. We offer both sparkling handmade designs and custom printed products.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Whether you want a blinged water bottle, a personalized mug, a scripture t-shirt, birthday stickers, business labels, or a thoughtful gift, we are here to bring your idea to life.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    At Blinged in Grace, we create custom items that help people express themselves, celebrate special moments, promote their businesses, and enjoy beautiful products made with care. Every piece is created with love, creativity, and attention to detail.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rounded-2xl overflow-hidden aspect-[4/3]"
                >
                  <img
                    src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/61d225fef_generated_12d0d921.png"
                    alt="Desiree and Rire creating together"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Meet the Sisters */}
          <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  The Creatives
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
                  Meet the <span className="italic text-primary">Sisters</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Desiree */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/92f0b2cde_generated_33e72fef.png"
                      alt="Desiree - Bedazzle Artist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="font-body text-xs text-accent font-medium uppercase tracking-wider">Bedazzle Artist</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">Desiree</h3>
                    <p className="font-body text-sm text-primary/70 italic mb-4">Age 13</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                      Desiree creates sparkling bedazzled items filled with bling, beauty, and personality. She decorates items with rhinestones, glitter, gems, sparkle, and beautiful details — perfect for anyone who loves sparkle, shine, and a bold personal touch.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Water Bottles', 'Tumblers', 'Phone Cases', 'Shoes', 'Clothes', 'Bags', 'Accessories', 'Gift Items'].map((item) => (
                        <span key={item} className="font-body text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground">{item}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Rire */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/68d5f8a0d_generated_5dad218c.png"
                      alt="Rire - Custom Print Designer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="font-body text-xs text-accent font-medium uppercase tracking-wider">Custom Print Designer</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">Rire</h3>
                    <p className="font-body text-sm text-primary/70 italic mb-4">Age 11</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                      Rire creates custom printed designs on t-shirts, mugs, stickers, business labels, and more. She designs pieces that help people wear their message with confidence — from scripture shirts to birthday mugs to business branding.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Custom T-shirts', 'Mugs', 'Stickers', 'Business Labels', 'Scripture Designs', 'Photo Gifts', 'Faith Items'].map((item) => (
                        <span key={item} className="font-body text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground">{item}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Our Faith */}
          <section className="relative py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://media.base44.com/images/public/69f90aa4aed3d1c3e1966f53/7e3a59190_generated_873149a0.png"
                alt="Faith-inspired design elements"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-display text-lg">✝</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Blinged in <span className="italic text-primary">Grace</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  The name Blinged in Grace was inspired by Desiree and Rire's Christian faith and their love for God.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Their faith is part of the heart behind the brand, reminding them that creativity, kindness, purpose, and every good gift are rooted in grace.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Some of their designs include scriptures, faith-based messages, and encouraging words created to inspire and uplift others.
                </p>
                <p className="font-display text-lg italic text-primary/80">
                  "Faith, Creativity, and Sparkle Made Personal."
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-10 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Our mission is to create beautiful, personalized, and meaningful designs that help people feel confident, loved, inspired, and special. As two young Christian sisters, we use our creativity to design custom pieces that bring joy, sparkle, encouragement, and grace to everyday life.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="bg-card rounded-2xl p-10 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Our vision is to grow Blinged in Grace into a creative brand that inspires people of all ages to express themselves with confidence, faith, style, and joy. We want to show that creativity has no age limit, and that young dreamers can use their gifts to make something beautiful and meaningful.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
