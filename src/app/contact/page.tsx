'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import NavBar from '@/components/NavBar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Have questions or suggestions? We'd love to hear from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                  <p className="text-gray-300 mb-8">
                    Reach out to us through any of these channels, and we'll get back to you as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: FaEnvelope,
                      title: 'Email',
                      content: 'support@studymart.com',
                      link: 'mailto:support@studymart.com',
                    },
                    {
                      icon: FaPhone,
                      title: 'Phone',
                      content: '+91 (123) 456-7890',
                      link: 'tel:+911234567890',
                    },
                    {
                      icon: FaMapMarkerAlt,
                      title: 'Office',
                      content: 'Mumbai, Maharashtra, India',
                      link: '#',
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-gray-400">{item.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 