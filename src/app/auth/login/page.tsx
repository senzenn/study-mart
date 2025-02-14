'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    // Add your authentication logic here
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/60">Sign in to continue to StudyMart</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
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
        <div>
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
              placeholder="Enter your password"
            />
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-white/60">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </Link>
        </div>

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
          ) : (
            'Sign In'
          )}
        </motion.button>

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

        {/* Sign Up Link */}
        <p className="text-center text-white/60">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
} 