'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaSearch, FaHeart, FaComments, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

interface ActionButton {
  id: string
  icon: typeof FaPlus
  label: string
  href: string
  color: string
}

const actionButtons: ActionButton[] = [
  {
    id: 'list',
    icon: FaPlus,
    label: 'List Item',
    href: '/products/new',
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    id: 'search',
    icon: FaSearch,
    label: 'Quick Search',
    href: '/products',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'wishlist',
    icon: FaHeart,
    label: 'Wishlist',
    href: '/wishlist',
    color: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    id: 'chat',
    icon: FaComments,
    label: 'Messages',
    href: '/messages',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
]

const menuVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute bottom-16 right-0 mb-4"
          >
            <div className="flex flex-col-reverse gap-4">
              {actionButtons.map((button) => (
                <motion.div key={button.id} variants={itemVariants}>
                  <Link href={button.href}>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: -8 }}
                    >
                      <span className="bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-lg text-sm">
                        {button.label}
                      </span>
                      <motion.button
                        className={`w-12 h-12 rounded-full text-white shadow-lg ${button.color}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <button.icon className="w-5 h-5 mx-auto" />
                      </motion.button>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 mx-auto" />
          ) : (
            <FaPlus className="w-6 h-6 mx-auto" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
} 