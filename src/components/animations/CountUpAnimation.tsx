'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUpAnimation({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      let startTime = 0
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(end * progress))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      controls.start({ opacity: 1, y: 0 })
    }
  }, [inView, end, duration, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <span className="font-bold">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
    </motion.div>
  )
} 