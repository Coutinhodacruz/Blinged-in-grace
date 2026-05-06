'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Sparkles, Palette, Gift, MessageSquare, 
  Calendar, CheckCircle2, ArrowRight, ArrowLeft,
  ShoppingBag, Send, Camera
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function CustomOrders() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    phone: '',
    details: '',
    date: '',
    file: null as File | null,
  });

  const steps = [
    { id: 1, title: 'The Vision', icon: Sparkles },
    { id: 2, title: 'The Details', icon: MessageSquare },
    { id: 3, title: 'The Contact', icon: ShoppingBag },
  ];

  const categories = [
    { id: 'bedazzled', name: 'Bedazzled Designs', icon: Sparkles, desc: 'Rhinestones, glitter, and gems.' },
    { id: 'apparel', name: 'T-Shirts & Apparel', icon: Heart, desc: 'Custom prints on hoodies & tees.' },
    { id: 'drinkware', name: 'Mugs & Drinkware', icon: Gift, desc: 'Personalized mugs & tumblers.' },
    { id: 'labels', name: 'Stickers & Labels', icon: Palette, desc: 'Branding and birthday stickers.' },
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
        // Optional: Reset or Redirect
    }, 5000);
  };

  const isStep1Valid = !!formData.category;
  const isStep2Valid = !!formData.details && !!formData.date;
  const isStep3Valid = !!formData.name && !!formData.email && !!formData.phone;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-secondary/30">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Personalized Creations</span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Let's Create Your <span className="italic text-primary">Custom</span> Masterpiece
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's a sparkling water bottle or a faith-inspired t-shirt, we bring your vision to life with grace and style.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Step-by-Step Experience */}
        <section className="py-20 lg:py-24 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto">
            {!submitted ? (
              <>
                {/* Progress Indicator */}
                <div className="flex justify-between items-center mb-16 max-w-md mx-auto relative">
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0" />
                   {steps.map((s) => {
                     const Icon = s.icon;
                     const active = step >= s.id;
                     return (
                        <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'bg-primary text-white shadow-lg' : 'bg-background border border-border text-muted-foreground'}`}>
                              <Icon className="w-5 h-5" />
                           </div>
                           <span className={`text-[10px] uppercase tracking-widest font-bold ${active ? 'text-primary' : 'text-muted-foreground'}`}>{s.title}</span>
                        </div>
                     );
                   })}
                </div>

                {/* Step Content */}
                <Card className="p-8 md:p-12 border-border/50 shadow-2xl relative overflow-hidden bg-card">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-foreground mb-2 font-display">Choose Your Canvas</h2>
                          <p className="text-muted-foreground">What kind of custom design are we creating today?</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = formData.category === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                className={`flex items-start gap-4 p-6 rounded-2xl border text-left transition-all cursor-pointer duration-300 group ${isSelected ? 'bg-primary/5 border-primary shadow-inner' : 'bg-background border-border hover:border-primary/50'}`}
                              >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-secondary text-primary group-hover:bg-primary group-hover:text-white'}`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-foreground">{cat.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-center pt-6">
                           <Button 
                             disabled={!isStep1Valid}
                             onClick={nextStep}
                             size="lg" 
                             className="rounded-full px-10 h-14 group"
                           >
                             Continue to Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                           </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-foreground mb-2 font-display">Share Your Vision</h2>
                          <p className="text-muted-foreground">Tell us everything about your dream design.</p>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                               <MessageSquare className="w-4 h-4" /> Design Details
                             </label>
                             <textarea 
                               value={formData.details}
                               onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                               placeholder="Color preferences, names to bedazzle, scripture verses, or business logos..."
                               className="w-full bg-background border border-border rounded-2xl p-6 min-h-[160px] focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                               <Calendar className="w-4 h-4" /> When do you need it?
                             </label>
                             <input 
                               type="date"
                               value={formData.date}
                               onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                               className="w-full bg-background border border-border rounded-2xl p-6 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                             />
                          </div>

                          <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                               <Camera className="w-4 h-4" /> Upload Inspiration
                             </label>
                             <div className="relative group">
                                <input 
                                  type="file"
                                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                  accept="image/*"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                />
                                <div className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 ${formData.file ? 'border-primary bg-primary/5' : 'border-border group-hover:border-primary/50 bg-secondary/5'}`}>
                                   {formData.file ? (
                                      <div className="flex flex-col items-center">
                                         <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                                         <span className="text-sm font-bold text-foreground line-clamp-1">{formData.file.name}</span>
                                         <span className="text-xs text-muted-foreground mt-1">File selected</span>
                                      </div>
                                   ) : (
                                      <div className="flex flex-col items-center">
                                         <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                            <Camera className="w-6 h-6 text-primary" />
                                         </div>
                                         <span className="text-sm font-bold text-foreground">Click or Drag to Upload</span>
                                         <span className="text-xs text-muted-foreground mt-1">Upload an image of what you'd like (Max 5MB)</span>
                                      </div>
                                   )}
                                </div>
                             </div>
                          </div>
                        </div>
                        <div className="flex justify-between pt-6">
                           <Button variant="ghost" onClick={prevStep} className="rounded-full flex items-center gap-2 text-muted-foreground">
                              <ArrowLeft className="w-4 h-4" /> Go Back
                           </Button>
                           <Button 
                             disabled={!isStep2Valid}
                             onClick={nextStep}
                             size="lg" 
                             className="rounded-full px-10 h-14 group"
                           >
                             Almost Done <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                           </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-foreground mb-2 font-display">Final Step</h2>
                          <p className="text-muted-foreground">How should we get in touch to finalize your order?</p>
                        </div>
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Full Name</label>
                              <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                className="w-full bg-background border border-border rounded-2xl px-6 h-14 focus:ring-2 focus:ring-primary focus:outline-none"
                              />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Email</label>
                                 <input 
                                   type="email"
                                   value={formData.email}
                                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                   placeholder="hello@example.com"
                                   className="w-full bg-background border border-border rounded-2xl px-6 h-14 focus:ring-2 focus:ring-primary focus:outline-none"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Phone</label>
                                 <input 
                                   type="tel"
                                   value={formData.phone}
                                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                   placeholder="(555) 000-0000"
                                   className="w-full bg-background border border-border rounded-2xl px-6 h-14 focus:ring-2 focus:ring-primary focus:outline-none"
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="flex justify-between pt-6">
                           <Button variant="ghost" onClick={prevStep} className="rounded-full flex items-center gap-2 text-muted-foreground">
                              <ArrowLeft className="w-4 h-4" /> Go Back
                           </Button>
                           <Button 
                             disabled={!isStep3Valid}
                             onClick={handleComplete}
                             size="lg" 
                             className="rounded-full px-12 h-14 bg-accent text-accent-foreground hover:bg-accent/90"
                           >
                             Submit Your Vision <Send className="w-4 h-4 ml-2" />
                           </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-4xl font-bold text-foreground font-display italic">Order Request Sent!</h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                   Thank you for trusting us with your custom order. We'll review your vision and get back to you within 24-48 hours with next steps and a quote.
                </p>
                <Button asChild size="lg" className="rounded-full px-10">
                   <Link href="/shop">Continue Shopping</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Custom Order Process (Condensed & Modernized) */}
        <section className="py-24 bg-secondary/20">
           <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4 block">The Journey</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16 italic font-display">How We Create Together</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                 {[
                   { id: 1, title: 'Vision', desc: 'Submit your request with all your creative ideas.' },
                   { id: 2, title: 'Connect', desc: "We'll chat to finalize design, timeline, and pricing." },
                   { id: 3, title: 'Craft', desc: 'Desiree & Rire bring your custom piece to life.' },
                   { id: 4, title: 'Joy', desc: 'Your personalized creation arrives at your door.' }
                 ].map((p) => (
                    <div key={p.id} className="group text-center">
                       <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                          <span className="text-xl font-bold">{p.id}</span>
                       </div>
                       <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                       <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
