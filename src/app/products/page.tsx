'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaBook, FaLaptop, FaMobileAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { id: 'all', name: 'All Items', icon: FaSearch },
  { id: 'books', name: 'Books', icon: FaBook },
  { id: 'electronics', name: 'Electronics', icon: FaLaptop },
  { id: 'gadgets', name: 'Gadgets', icon: FaMobileAlt },
]

const dummyProducts = [
  {
    id: 1,
    title: 'Calculus Textbook',
    category: 'books',
    price: 45,
    condition: 'Like New',
    image: '/placeholder.jpg',
  },
  {
    id: 2,
    title: 'Scientific Calculator',
    category: 'electronics',
    price: 35,
    condition: 'Good',
    image: '/placeholder.jpg',
  },
  {
    id: 3,
    title: 'iPad Pro',
    category: 'gadgets',
    price: 450,
    condition: 'Excellent',
    image: '/placeholder.jpg',
  },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const productsRef = useRef(null)

  const filteredProducts = dummyProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: productsRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [filteredProducts])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            Browse Products
          </h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <FaFilter />
              Filter
            </motion.button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap
                ${selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
            >
              <category.icon />
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
                  {/* Image placeholder */}
                  <div className="flex items-center justify-center text-gray-400">
                    <FaBook className="w-12 h-12" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Condition: {product.condition}
                    </span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 