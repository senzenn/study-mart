'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaFilter, 
  FaHeart, 
  FaStar, 
  FaBookOpen,
  FaShoppingCart,
  FaChevronDown,
  FaTags
} from 'react-icons/fa'

const categories = [
  'All Categories',
  'Textbooks',
  'Notes',
  'Study Guides',
  'Lab Materials',
  'Research Papers',
]

const products = [
  {
    id: 1,
    title: 'Calculus: Early Transcendentals',
    category: 'Textbooks',
    price: 85.00,
    condition: 'Like New',
    rating: 4.5,
    reviews: 12,
    seller: 'Sarah Wilson',
    image: '/textbook-1.jpg',
    tags: ['Mathematics', 'Engineering', 'Science'],
    isWishlisted: false,
  },
  {
    id: 2,
    title: 'Physics Lab Manual',
    category: 'Lab Materials',
    price: 45.00,
    condition: 'Good',
    rating: 4.0,
    reviews: 8,
    seller: 'John Smith',
    image: '/lab-manual.jpg',
    tags: ['Physics', 'Laboratory', 'Science'],
    isWishlisted: true,
  },
  // Add more products...
]

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedConditions, setSelectedConditions] = useState(['All'])
  const [sortBy, setSortBy] = useState('newest')

  const conditions = ['All', 'New', 'Like New', 'Very Good', 'Good', 'Acceptable']

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All Categories' || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter(product =>
      selectedConditions.includes('All') || selectedConditions.includes(product.condition)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Find and sell study materials
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
        >
          + List an Item
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
              <FaChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10"
                >
                  <div className="p-4 space-y-4">
                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-gray-900 dark:text-white"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Range
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-24 px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-gray-900 dark:text-white"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-24 px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Condition
                      </label>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <label key={condition} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedConditions.includes(condition)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedConditions([...selectedConditions, condition])
                                } else {
                                  setSelectedConditions(selectedConditions.filter(c => c !== condition))
                                }
                              }}
                              className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-gray-900 dark:text-white"
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group"
          >
            {/* Product Image */}
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <FaBookOpen className="w-12 h-12" />
              </div>
              <button
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  product.isWishlisted 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400'
                } backdrop-blur-sm hover:scale-110 transition-transform`}
              >
                <FaHeart className="w-4 h-4" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    by {product.seller}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FaStar className="w-4 h-4" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  >
                    <FaTags className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                >
                  <FaShoppingCart className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 