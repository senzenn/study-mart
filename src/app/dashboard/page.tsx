'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaBook, 
  FaShoppingCart, 
  FaChartLine, 
  FaUsers,
  FaPlus,
  FaSearch,
  FaHeart
} from 'react-icons/fa'

const stats = [
  { icon: FaBook, label: 'Active Listings', value: '24', change: '+12%' },
  { icon: FaShoppingCart, label: 'Total Sales', value: '$2,845', change: '+18%' },
  { icon: FaChartLine, label: 'Views', value: '1.2k', change: '+32%' },
  { icon: FaUsers, label: 'New Followers', value: '48', change: '+8%' },
]

const recentActivity = [
  {
    id: 1,
    type: 'sale',
    title: 'Calculus Textbook',
    price: '$85.00',
    buyer: 'Sarah Wilson',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'view',
    title: 'Physics Lab Manual',
    views: 45,
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'listing',
    title: 'Chemistry Notes',
    price: '$35.00',
    time: '6 hours ago',
  },
]

const quickActions = [
  { icon: FaPlus, label: 'New Listing', color: 'bg-purple-500' },
  { icon: FaSearch, label: 'Browse Items', color: 'bg-blue-500' },
  { icon: FaHeart, label: 'Wishlist', color: 'bg-pink-500' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
        >
          + New Listing
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                    {stat.value}
                  </h3>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className={`p-3 ${action.color} rounded-lg`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h2>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {activity.type === 'sale' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      New sale: {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Sold to {activity.buyer} for {activity.price}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              )}
              {activity.type === 'view' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {activity.title} got new views
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.views} people viewed your listing
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              )}
              {activity.type === 'listing' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      New listing: {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Listed for {activity.price}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 