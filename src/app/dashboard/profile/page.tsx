'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaBell, 
  FaMoon, 
  FaGlobe,
  FaShieldAlt,
  FaCreditCard,
  FaCamera,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa'

const settings = [
  {
    id: 'profile',
    label: 'Profile Information',
    icon: FaUser,
  },
  {
    id: 'security',
    label: 'Security',
    icon: FaShieldAlt,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: FaBell,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: FaMoon,
  },
  {
    id: 'payment',
    label: 'Payment Methods',
    icon: FaCreditCard,
  },
]

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 234 567 890',
    university: 'Example University',
    bio: 'Computer Science student passionate about technology and learning.',
  })
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    twoFactorAuth: false,
  })

  const handlePreferenceToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof preferences],
    }))
  }

  const handleProfileUpdate = () => {
    setIsEditing(false)
    // Add API call to update profile
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <nav className="space-y-1 p-4">
              {settings.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => setActiveSection(setting.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === setting.id
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <setting.icon className="w-5 h-5" />
                  <span className="font-medium">{setting.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {activeSection === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      Profile Information
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </motion.button>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <FaUser className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
                          <FaCamera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {profileData.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {profileData.university}
                      </p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="space-y-4">
                    {Object.entries(profileData).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    Security Settings
                  </h2>
                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FaLock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Change Password
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Update your password regularly to keep your account secure
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                        >
                          Update
                        </motion.button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FaShieldAlt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handlePreferenceToggle('twoFactorAuth')}
                          className="text-2xl text-purple-500 hover:text-purple-600"
                        >
                          {preferences.twoFactorAuth ? (
                            <FaToggleOn />
                          ) : (
                            <FaToggleOff />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'emailNotifications',
                        label: 'Email Notifications',
                        description: 'Receive notifications via email',
                      },
                      {
                        key: 'pushNotifications',
                        label: 'Push Notifications',
                        description: 'Receive notifications on your device',
                      },
                      {
                        key: 'newsletter',
                        label: 'Newsletter',
                        description: 'Receive our weekly newsletter',
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePreferenceToggle(item.key)}
                          className="text-2xl text-purple-500 hover:text-purple-600"
                        >
                          {preferences[item.key as keyof typeof preferences] ? (
                            <FaToggleOn />
                          ) : (
                            <FaToggleOff />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    Appearance Settings
                  </h2>
                  <div className="space-y-4">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Dark Mode
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Toggle dark mode theme
                        </p>
                      </div>
                      <button
                        onClick={() => handlePreferenceToggle('darkMode')}
                        className="text-2xl text-purple-500 hover:text-purple-600"
                      >
                        {preferences.darkMode ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'payment' && (
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      Add Payment Method
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 