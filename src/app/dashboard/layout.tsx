'use client'

import React from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
} 