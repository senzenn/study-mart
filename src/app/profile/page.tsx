'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaStar, FaBox, FaHistory, FaCog } from 'react-icons/fa'

const userProfile = {
  name: 'John Doe',
  email: 'john.doe@university.edu',
  rating: 4.8,
  totalSales: 24,
  totalPurchases: 12,
  memberSince: 'September 2023',
  recentActivity: [
    { id: 1, type: 'sale', item: 'Physics Textbook', date: '2 days ago', amount: 55 },
    { id: 2, type: 'purchase', item: 'Scientific Calculator', date: '1 week ago', amount: 35 },
    { id: 3, type: 'sale', item: 'Chemistry Notes', date: '2 weeks ago', amount: 20 },
  ],
}

const menuItems = [
  { id: 'listings', label: 'My Listings', icon: FaBox },
  { id: 'history', label: 'Purchase History', icon: FaHistory },
  { id: 'settings', label: 'Settings', icon: FaCog },
]

export default function Profile() {
  const profileRef = useRef(null)
  const activityRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile info animation
      gsap.from('.profile-info', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      })

      // Activity items animation
      gsap.from('.activity-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: activityRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div ref={profileRef} className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
            >
              <FaUser className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <div className="flex-1">
              <div className="profile-info">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {userProfile.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <FaEnvelope />
                  <span>{userProfile.email}</span>
                </div>
              </div>
              <div className="profile-info grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                    <FaStar />
                    <span className="font-semibold">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {userProfile.rating}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                    <FaBox />
                    <span className="font-semibold">Total Sales</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {userProfile.totalSales}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                    <FaHistory />
                    <span className="font-semibold">Member Since</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    {userProfile.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <div ref={activityRef} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {userProfile.recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                className="activity-item flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                whileHover={{ x: 5 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {activity.item}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.type === 'sale' ? 'Sold' : 'Purchased'} • {activity.date}
                  </p>
                </div>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  ${activity.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 