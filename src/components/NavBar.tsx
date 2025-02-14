'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  FaHome, 
  FaBox, 
  FaUser, 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaTimes,
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaRegBell,
  FaCheck,
  FaHeart,
  FaShoppingBag
} from 'react-icons/fa'

const mainNavItems = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/products', label: 'Products', icon: FaBox },
  { href: '/dashboard', label: 'Dashboard', icon: FaUser },
]

const userMenuItems = [
  { label: 'My Profile', icon: FaUser, href: '/profile' },
  { label: 'Wishlist', icon: FaBookmark, href: '/wishlist' },
  { label: 'Settings', icon: FaCog, href: '/settings' },
  { label: 'Sign Out', icon: FaSignOutAlt, href: '/auth/login' },
]

const cartItems = [
  { id: 1, name: 'Physics Textbook', price: 45.99, quantity: 1 },
  { id: 2, name: 'Scientific Calculator', price: 29.99, quantity: 1 },
]

export default function NavBar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const controls = useAnimation()

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New message from Sarah', time: '2m ago', isRead: false, type: 'message' },
    { id: 2, text: 'Your item was sold', time: '1h ago', isRead: false, type: 'sale' },
    { id: 3, text: 'Price drop alert', time: '3h ago', isRead: true, type: 'alert' },
  ])
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const unreadNotifications = notifications.filter(n => !n.isRead).length
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return FaRegBell
      case 'sale':
        return FaShoppingBag
      case 'alert':
        return FaHeart
      default:
        return FaRegBell
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
            >
              <motion.div
                className="relative w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  S
                </span>
              </motion.div>
              <motion.span
                className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
              >
                StudyMart
              </motion.span>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {mainNavItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                      pathname === item.href
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaSearch className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "300px" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-0 mt-1"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Shopping Cart</h3>
                    </div>
                    <div className="divide-y dark:divide-gray-700">
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t dark:border-gray-700">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium text-gray-900 dark:text-white">Total</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        Checkout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FaBell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          {unreadNotifications} new
                        </span>
                      )}
                    </div>
                    <div className="divide-y dark:divide-gray-700 max-h-96 overflow-y-auto">
                      {notifications.map((notification) => {
                        const NotificationIcon = getNotificationIcon(notification.type)
                        return (
                          <motion.div
                            key={notification.id}
                            whileHover={{ x: 2 }}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                              !notification.isRead ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'message' ? 'bg-blue-500' :
                                notification.type === 'sale' ? 'bg-green-500' : 'bg-yellow-500'
                              }`}>
                                <NotificationIcon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 dark:text-white">
                                  {notification.text}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {notification.time}
                                </span>
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUser className="w-4 h-4 text-white" />
                </motion.div>
                <FaChevronDown
                  className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                    </div>
                    <div className="py-2">
                      {userMenuItems.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 2 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.href
                        ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 