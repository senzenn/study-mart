'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface SearchSuggestion {
  id: string
  title: string
  category: string
}

// Mock suggestions - replace with real API call
const mockSuggestions: SearchSuggestion[] = [
  { id: '1', title: 'Calculus Textbook', category: 'Books' },
  { id: '2', title: 'MacBook Pro', category: 'Electronics' },
  { id: '3', title: 'Scientific Calculator', category: 'Electronics' },
  { id: '4', title: 'Chemistry Lab Manual', category: 'Books' },
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulating API call with mock data
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <motion.div
        initial={false}
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for textbooks, electronics..."
          className="w-full px-6 py-4 pl-12 rounded-full bg-white/10 backdrop-blur-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        <motion.span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
          animate={{ scale: isFocused ? 1.1 : 1 }}
        >
          <FaSearch className="w-4 h-4" />
        </motion.span>
        {query && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            onClick={() => setQuery('')}
          >
            <FaTimes className="w-4 h-4" />
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {suggestions.map((suggestion) => (
              <motion.button
                key={suggestion.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                className="w-full px-6 py-3 text-left flex items-center justify-between group"
                onClick={() => {
                  setQuery(suggestion.title)
                  setIsFocused(false)
                }}
              >
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {suggestion.category}
                  </p>
                </div>
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaSearch className="w-4 h-4" />
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 