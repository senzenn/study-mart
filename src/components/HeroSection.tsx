'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
  FaChartLine, 
  FaUserCircle, 
  FaPlay, 
  FaChartBar, 
  FaBitcoin, 
  FaEthereum,
  FaChartPie,
  FaLock,
  FaBook, 
  FaGraduationCap, 
  FaSearch,
  FaBookOpen,
  FaChalkboardTeacher,
  FaLaptop
} from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'

interface TraderCardProps {
  name: string
  fund: string
  image?: string
  delay?: number
  performance?: string
  trades?: number
}

interface CryptoPrice {
  symbol: string
  price: string
  change: string
  icon: React.ElementType
}

interface TrendingItem {
  title: string
  category: string
  price: string
  icon: React.ElementType
}

const cryptoPrices: CryptoPrice[] = [
  { symbol: 'BTC', price: '$45,234', change: '+2.5%', icon: FaBitcoin },
  { symbol: 'ETH', price: '$2,345', change: '+1.8%', icon: FaEthereum },
]

const trendingItems: TrendingItem[] = [
  { title: 'Engineering Books', category: 'Books', price: '₹499', icon: FaBook },
  { title: 'Study Materials', category: 'Notes', price: '₹299', icon: FaBookOpen },
]

const TraderCard = ({ name, fund, image, delay = 0, performance = '+12.5%', trades = 156 }: TraderCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 6px rgba(0,0,0,0.1)',
        }}
        className="flex flex-col gap-3 bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-gray-800 cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                  <FaUserCircle className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <p className="text-white font-medium">{name}</p>
              <p className="text-green-400 text-sm">Fund {fund}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-medium">{performance}</p>
            <p className="text-gray-400 text-sm">{trades} trades</p>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          className="pt-3 border-t border-gray-800"
        >
          <div className="flex justify-between text-sm text-gray-400">
            <span>Win Rate</span>
            <span className="text-green-400">68%</span>
          </div>
          <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800"
  >
    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
)

export default function HeroSection() {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    })
  }, [controls])

  return (
    <div className="relative min-h-screen bg-[#2D1B69] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y, opacity }}>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </motion.div>
      </div>

      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Live Crypto Prices */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 px-6 py-2.5 bg-gray-900/40 backdrop-blur-xl rounded-full border border-gray-800/50"
        >
          {cryptoPrices.map((crypto, index) => (
            <div key={crypto.symbol} className="flex items-center gap-2">
              {index > 0 && <div className="w-px h-6 bg-gray-800" />}
              <crypto.icon className="w-5 h-5 text-yellow-500" />
              <span className="text-white/90 font-medium">{crypto.price}</span>
              <span className="text-green-400/90 text-sm">{crypto.change}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trending Items */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 px-6 py-2.5 bg-gray-900/40 backdrop-blur-xl rounded-full border border-gray-800/50"
        >
          {trendingItems.map((item, index) => (
            <div key={item.title} className="flex items-center gap-2">
              {index > 0 && <div className="w-px h-6 bg-gray-800" />}
              <item.icon className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">{item.title}</span>
              <span className="text-green-400/90 text-sm">{item.price}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
        >
          <span className="text-pink-500 mr-2">✨</span>
          <span className="text-white/90 text-sm">Join Your Campus Community</span>
        </motion.div>

        {/* Main Content Container */}
        <div className="max-w-4xl mb-12 md:mb-20">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight"
          >
            Your Campus
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Marketplace
            </span>
            <br />
            Made Easy
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mb-8 md:mb-10"
          >
            Buy and sell textbooks, study materials, and academic resources within your campus community. Save money and help others do the same.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Exploring
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <FaPlay className="w-4 h-4" />
              How It Works
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 md:mb-24">
          <FeatureCard
            icon={FaBook}
            title="Academic Resources"
            description="Find textbooks, notes, and study materials for your courses."
            delay={0.6}
          />
          <FeatureCard
            icon={FaGraduationCap}
            title="Campus Community"
            description="Connect with students from your own campus for easy exchanges."
            delay={0.7}
          />
          <FeatureCard
            icon={FaLaptop}
            title="Tech Exchange"
            description="Buy and sell laptops, calculators, and other academic equipment."
            delay={0.8}
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="relative py-12 md:py-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: '50+', label: 'Campuses' },
              { value: '10k+', label: 'Active Users' },
              { value: '50k+', label: 'Items Listed' },
              { value: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/90 text-lg">How StudyMart Works - Tutorial Video</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 