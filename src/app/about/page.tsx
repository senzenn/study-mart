'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaHandshake, FaUsers, FaShieldAlt } from 'react-icons/fa'
import NavBar from '@/components/NavBar'

const values = [
  {
    icon: FaGraduationCap,
    title: 'Student-First Approach',
    description: 'Built by students, for students. We understand your academic needs and budget constraints.',
  },
  {
    icon: FaHandshake,
    title: 'Community Trust',
    description: 'Creating a trusted environment where students can safely trade academic resources.',
  },
  {
    icon: FaUsers,
    title: 'Campus Connection',
    description: 'Bringing together students from the same campus for convenient exchanges.',
  },
  {
    icon: FaShieldAlt,
    title: 'Verified Users',
    description: 'All users are verified students, ensuring a safe and trusted marketplace.',
  },
]

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About StudyMart
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              We're revolutionizing how students access academic resources by creating a trusted
              marketplace exclusively for the campus community.
            </motion.p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-gray-300">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    StudyMart was born from a simple observation: students needed a better way to
                    exchange academic resources within their campus community.
                  </p>
                  <p>
                    What started as a small campus initiative has grown into a trusted platform
                    connecting thousands of students across multiple universities.
                  </p>
                  <p>
                    Today, we're proud to help students save money and make education more
                    accessible for everyone.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Mission</h4>
                    <p className="text-gray-400">
                      To make academic resources more accessible and affordable for every student.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Vision</h4>
                    <p className="text-gray-400">
                      To create a sustainable ecosystem where students can easily share and access
                      educational resources.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 