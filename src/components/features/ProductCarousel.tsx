'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useTransform, useScroll } from 'framer-motion'
import { FaBook, FaLaptop, FaMobileAlt } from 'react-icons/fa'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  price: number
  category: string
  condition: string
  image: string
  icon: typeof FaBook
}

const products: Product[] = [
  {
    id: 1,
    title: 'Calculus Textbook',
    price: 45,
    category: 'Books',
    condition: 'Like New',
    image: '/placeholder.jpg',
    icon: FaBook,
  },
  {
    id: 2,
    title: 'MacBook Pro',
    price: 999,
    category: 'Electronics',
    condition: 'Good',
    image: '/placeholder.jpg',
    icon: FaLaptop,
  },
  {
    id: 3,
    title: 'iPad Pro',
    price: 699,
    category: 'Electronics',
    condition: 'Excellent',
    image: '/placeholder.jpg',
    icon: FaMobileAlt,
  },
  // Duplicate items for infinite scroll effect
  {
    id: 4,
    title: 'Physics Textbook',
    price: 35,
    category: 'Books',
    condition: 'Good',
    image: '/placeholder.jpg',
    icon: FaBook,
  },
  {
    id: 5,
    title: 'Scientific Calculator',
    price: 75,
    category: 'Electronics',
    condition: 'Like New',
    image: '/placeholder.jpg',
    icon: FaLaptop,
  },
]

export default function ProductCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const controls = useAnimation()

  // Create duplicate items for infinite scroll
  const allProducts = [...products, ...products, ...products]

  useEffect(() => {
    const scrollAnimation = async () => {
      await controls.start({
        x: [0, -1920], // Adjust based on your container width
        transition: {
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }

    scrollAnimation()
  }, [controls])

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-indigo-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-900 to-transparent z-10" />

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-hidden"
      >
        <motion.div
          animate={controls}
          className="flex gap-6 px-6"
        >
          {allProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              whileHover={{ y: -10, scale: 1.02 }}
              className="flex-shrink-0 w-72 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                  <product.icon className="w-12 h-12" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/60">
                    {product.condition}
                  </span>
                  <span className="text-lg font-bold text-purple-400">
                    ${product.price}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 