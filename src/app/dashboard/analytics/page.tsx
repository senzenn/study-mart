'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaChartArea,
  FaCalendarAlt,
  FaDownload,
  FaFilter
} from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Mock data for charts
const salesData = {
  daily: [
    { date: '2024-01-01', sales: 120, views: 450 },
    { date: '2024-01-02', sales: 150, views: 520 },
    { date: '2024-01-03', sales: 180, views: 600 },
    { date: '2024-01-04', sales: 140, views: 480 },
    { date: '2024-01-05', sales: 200, views: 700 },
    { date: '2024-01-06', sales: 170, views: 550 },
    { date: '2024-01-07', sales: 160, views: 500 },
  ],
  categories: [
    { name: 'Textbooks', value: 45 },
    { name: 'Notes', value: 25 },
    { name: 'Electronics', value: 15 },
    { name: 'Lab Materials', value: 10 },
    { name: 'Other', value: 5 },
  ],
  performance: {
    totalSales: 2845,
    totalViews: 12500,
    averageRating: 4.8,
    completionRate: 92,
  },
}

const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year']

// Chart options and data
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

const lineChartData = {
  labels: salesData.daily.map(item => item.date),
  datasets: [
    {
      label: 'Sales ($)',
      data: salesData.daily.map(item => item.sales),
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.5)',
      tension: 0.4,
    },
    {
      label: 'Views',
      data: salesData.daily.map(item => item.views),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4,
    },
  ],
}

const doughnutChartData = {
  labels: salesData.categories.map(item => item.name),
  datasets: [
    {
      data: salesData.categories.map(item => item.value),
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(249, 115, 22, 0.8)',
      ],
      borderColor: [
        'rgb(147, 51, 234)',
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(239, 68, 68)',
        'rgb(249, 115, 22)',
      ],
      borderWidth: 1,
    },
  ],
}

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
}

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 7 Days')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Analytics Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your performance and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 dark:text-gray-300"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <FaDownload className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Sales',
            value: `$${salesData.performance.totalSales}`,
            change: '+12.5%',
            icon: FaChartLine,
            color: 'purple',
          },
          {
            label: 'Total Views',
            value: salesData.performance.totalViews,
            change: '+24.3%',
            icon: FaChartBar,
            color: 'blue',
          },
          {
            label: 'Average Rating',
            value: salesData.performance.averageRating,
            change: '+0.2',
            icon: FaChartPie,
            color: 'green',
          },
          {
            label: 'Completion Rate',
            value: `${salesData.performance.completionRate}%`,
            change: '+5.2%',
            icon: FaChartArea,
            color: 'pink',
          },
        ].map((stat, index) => (
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Views Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Sales & Views
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaFilter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="h-80 w-full">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Category Distribution
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaFilter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="h-80 w-full">
            <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Product {item} was viewed
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    45 people viewed this item
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2 hours ago
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 