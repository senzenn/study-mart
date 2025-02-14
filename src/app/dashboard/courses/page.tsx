'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBook, 
  FaClock, 
  FaGraduationCap,
  FaChartLine,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlayCircle,
  FaFileAlt,
  FaLock,
  FaStar
} from 'react-icons/fa'

const courses = [
  {
    id: 1,
    title: 'Calculus I',
    progress: 75,
    nextLesson: 'Integration Techniques',
    instructor: 'Dr. Sarah Wilson',
    lastAccessed: '2 days ago',
    totalHours: 48,
    completedHours: 36,
    rating: 4.8,
    reviews: 124,
    modules: [
      {
        title: 'Limits and Continuity',
        completed: true,
        lessons: 12,
        completedLessons: 12,
      },
      {
        title: 'Derivatives',
        completed: true,
        lessons: 15,
        completedLessons: 15,
      },
      {
        title: 'Integration',
        completed: false,
        lessons: 18,
        completedLessons: 9,
      },
      {
        title: 'Applications',
        completed: false,
        lessons: 12,
        completedLessons: 0,
      },
    ],
  },
  // Add more courses...
]

const stats = [
  {
    label: 'Enrolled Courses',
    value: '8',
    icon: FaBook,
    change: '+2 this month',
    color: 'purple',
  },
  {
    label: 'Hours Studied',
    value: '156',
    icon: FaClock,
    change: '+24 this week',
    color: 'blue',
  },
  {
    label: 'Completed Courses',
    value: '5',
    icon: FaGraduationCap,
    change: '+1 this month',
    color: 'green',
  },
  {
    label: 'Average Grade',
    value: '92%',
    icon: FaChartLine,
    change: '+3% improvement',
    color: 'pink',
  },
]

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your progress and continue learning
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
        >
          Browse Courses
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
                <div className={`p-3 bg-${stat.color}-500/10 dark:bg-${stat.color}-500/20 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
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

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Current Courses</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedCourse.id === course.id ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaClock className="w-4 h-4 mr-1" />
                        {course.completedHours}/{course.totalHours} hours
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="w-4 h-4 mr-1" />
                        Last accessed {course.lastAccessed}
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Course Details</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Course Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedCourse.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FaGraduationCap className="w-4 h-4 mr-1" />
                    {selectedCourse.instructor}
                  </div>
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 mr-1 text-yellow-400" />
                    {selectedCourse.rating} ({selectedCourse.reviews} reviews)
                  </div>
                </div>
              </div>

              {/* Next Lesson */}
              <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  Next Lesson
                </h4>
                <p className="text-purple-800 dark:text-purple-200">
                  {selectedCourse.nextLesson}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors w-full flex items-center justify-center"
                >
                  <FaPlayCircle className="w-4 h-4 mr-2" />
                  Continue Learning
                </motion.button>
              </div>

              {/* Modules */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Course Modules
                </h4>
                {selectedCourse.modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white flex items-center">
                          {module.completed ? (
                            <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          ) : (
                            <FaLock className="w-4 h-4 text-gray-400 mr-2" />
                          )}
                          {module.title}
                        </h5>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaFileAlt className="w-4 h-4 mr-1" />
                          {module.completedLessons}/{module.lessons} lessons
                        </div>
                      </div>
                      <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {Math.round((module.completedLessons / module.lessons) * 100)}%
                      </div>
                    </div>
                    {/* Module Progress Bar */}
                    <div className="mt-3">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(module.completedLessons / module.lessons) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 