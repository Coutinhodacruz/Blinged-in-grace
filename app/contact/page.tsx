'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, MessageSquare, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Simulate form submission
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Let&apos;s Create Something Beautiful
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions? Want to start a project? We&apos;d love to hear from you. Get in touch below.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Email
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      info@blingedinsgrace.com
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Response Time
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Quick responses to inquiries
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Custom orders answered within 24-48 hours
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Orders
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Custom orders available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submit orders anytime. We work on your schedule.
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t border-border">
                  <h3 className="font-bold text-foreground mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/shop" className="text-primary hover:underline text-sm">
                        Browse Our Shop
                      </Link>
                    </li>
                    <li>
                      <Link href="/custom-orders" className="text-primary hover:underline text-sm">
                        Start Custom Order
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery" className="text-primary hover:underline text-sm">
                        View Gallery
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-primary hover:underline text-sm">
                        Learn About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {submitted && (
                  <div className="mb-8 p-4 bg-accent/10 border border-accent rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.name ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.subject ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or question..."
                      rows={6}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                        errors.message ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full"
                    disabled={submitted}
                  >
                    {submitted ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'How long does a custom order take?',
                  a: 'Custom orders typically take 1-3 weeks depending on complexity and our current workload. We discuss timelines when we contact you about your order.',
                },
                {
                  q: 'Can I request a rush order?',
                  a: 'Yes! Rush orders may be available depending on our schedule. Contact us to discuss rush options for your project.',
                },
                {
                  q: 'What if I don\'t like my design?',
                  a: 'We work closely with you throughout the process and offer revisions to ensure you\'re happy with your design before final production.',
                },
                {
                  q: 'Do you ship orders?',
                  a: 'Yes, we ship custom orders to customers nationwide. Shipping costs will be discussed when we finalize your order details.',
                },
                {
                  q: 'Can I order smaller quantities?',
                  a: 'Absolutely! We work with custom orders of any size, from single items to bulk orders for businesses.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept major credit cards and can discuss payment plans for larger orders. Details are provided after your initial consultation.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-2">
                    {item.q}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
