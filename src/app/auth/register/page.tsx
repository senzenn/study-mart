'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaUniversity } from 'react-icons/fa'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    studentId: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Add your registration logic here
  }

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-white/60">Join StudyMart and start trading</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 0.3 }}
          >
            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your full name"
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Create a password"
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Confirm your password"
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 0.3 }}
          >
            {/* University Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                University
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your university"
                />
                <FaUniversity className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            {/* Student ID Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Student ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter your student ID"
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'
          }`}
        >
          {isLoading ? (
            <motion.div
              className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : step === 1 ? (
            'Continue'
          ) : (
            'Create Account'
          )}
        </motion.button>

        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          <motion.div
            className={`h-2 w-2 rounded-full ${
              step === 1 ? 'bg-purple-500' : 'bg-white/20'
            }`}
            animate={{ scale: step === 1 ? 1.2 : 1 }}
          />
          <motion.div
            className={`h-2 w-2 rounded-full ${
              step === 2 ? 'bg-purple-500' : 'bg-white/20'
            }`}
            animate={{ scale: step === 2 ? 1.2 : 1 }}
          />
        </div>

        {/* Social Login */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-white/60 bg-[#2D1B69]">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold"
          >
            <FaGoogle className="w-5 h-5" />
            Google
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold"
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </motion.button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-white/60">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
} 