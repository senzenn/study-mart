'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  FaHome, 
  FaChartBar, 
  FaWallet, 
  FaUser, 
  FaCog, 
  FaBell, 
  FaSearch,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaChevronDown,
  FaExchangeAlt,
  FaChartLine,
  FaHistory
} from 'react-icons/fa'

const menuItems = [
  { href: '/dashboard', label: 'Overview', icon: FaHome },
  { href: '/dashboard/trading', label: 'Trading', icon: FaChartLine },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: FaChartBar },
  { href: '/dashboard/transactions', label: 'Transactions', icon: FaExchangeAlt },
  { href: '/dashboard/history', label: 'History', icon: FaHistory },
]

const notifications = [
  { id: 1, title: 'Trade Executed', message: 'BTC/USDT order filled at $45,234', time: '2m ago', isRead: false },
  { id: 2, title: 'Portfolio Alert', message: 'ETH position up 5.2% today', time: '15m ago', isRead: false },
  { id: 3, title: 'Account Update', message: 'Verification level 2 approved', time: '1h ago', isRead: true },
]

export default function DashboardNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter(n => !n.isRead).length
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNotificationClick = (id: number) => {
    setUnreadNotifications(prev => Math.max(0, prev - 1))
  }

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <motion.div
                className="relative w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  F
                </span>
              </motion.div>
              <motion.span
                className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text hidden md:block"
                whileHover={{ scale: 1.05 }}
              >
                FundFix
              </motion.span>
            </Link>

            <div className="hidden md:flex md:ml-10 md:space-x-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900/50 transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900/50 transition-colors"
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900/50 transition-colors"
              >
                <FaBell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-black border border-gray-800/50 rounded-xl shadow-lg overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-4 border-b border-gray-800/50 flex justify-between items-center">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <span className="text-xs text-purple-400">{unreadNotifications} new</span>
                      )}
                    </div>
                    <div className="divide-y divide-gray-800/50 max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ x: 2 }}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 hover:bg-gray-900/50 cursor-pointer ${
                            !notification.isRead ? 'bg-purple-900/10' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <p className="text-sm text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900/50 transition-colors"
            >
              {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-900/50 transition-colors"
              >
                <motion.div
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUser className="w-4 h-4 text-white" />
                </motion.div>
                <FaChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
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
                    className="absolute right-0 mt-2 w-48 bg-black border border-gray-800/50 rounded-xl shadow-lg overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-4 border-b border-gray-800/50">
                      <p className="text-sm font-medium text-white">John Doe</p>
                      <p className="text-xs text-gray-400">john@example.com</p>
                    </div>
                    <div className="py-2">
                      {[
                        { label: 'Profile', icon: FaUser, href: '/dashboard/profile' },
                        { label: 'Settings', icon: FaCog, href: '/dashboard/settings' },
                        { label: 'Sign Out', icon: FaSignOutAlt, href: '/auth/login' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 2 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900/50"
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
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trades, markets, or settings..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 