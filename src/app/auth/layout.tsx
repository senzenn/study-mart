'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-purple-800">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] bg-white rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 2 + 1,
              }}
              animate={{
                y: ['-20%', '120%'],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * -10,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
              >
                StudyMart
              </motion.span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center text-white/60 text-sm">
            <p>© 2024 StudyMart. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
} 