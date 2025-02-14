'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaBook, FaLaptop, FaMobileAlt, FaArrowRight, FaShieldAlt, 
  FaUserGraduate, FaHandshake, FaChartLine, FaGithub, 
  FaTwitter, FaInstagram, FaLinkedin 
} from 'react-icons/fa'
import SearchBar from '@/components/ui/SearchBar'
import FloatingActionMenu from '@/components/ui/FloatingActionMenu'
import ProductCarousel from '@/components/features/ProductCarousel'
import CountUpAnimation from '@/components/animations/CountUpAnimation'
import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: FaBook,
    title: 'Textbooks & Notes',
    description: 'Find affordable textbooks or sell your used ones to fellow students.',
  },
  {
    icon: FaLaptop,
    title: 'Electronics',
    description: 'Buy and sell laptops, calculators, and other electronic essentials.',
  },
  {
    icon: FaMobileAlt,
    title: 'Gadgets',
    description: 'Trade smartphones, tablets, and other tech gadgets within your campus.',
  },
]

const benefits = [
  {
    icon: FaShieldAlt,
    title: 'Verified Students',
    description: 'All users are verified students, ensuring a safe and trusted community.',
  },
  {
    icon: FaUserGraduate,
    title: 'Campus Focus',
    description: 'Connect with students from your own campus for easy exchanges.',
  },
  {
    icon: FaHandshake,
    title: 'Direct Deals',
    description: 'No middleman fees. Deal directly with other students.',
  },
  {
    icon: FaChartLine,
    title: 'Best Value',
    description: 'Get the best prices for your academic needs.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    image: '/avatars/avatar1.jpg',
    text: 'StudyMart helped me find all my textbooks at half the bookstore price. Amazing platform!',
  },
  {
    name: 'Mike Chen',
    role: 'Engineering Student',
    image: '/avatars/avatar2.jpg',
    text: 'Selling my old calculator and laptop was super easy. Great community!',
  },
  {
    name: 'Emma Davis',
    role: 'Medical Student',
    image: '/avatars/avatar3.jpg',
    text: 'The verification system makes me feel safe when trading. Highly recommended!',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const showcaseRef = useRef(null)
  const testimonialsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })

      gsap.from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power4.out',
      })

      gsap.from('.hero-button', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'back.out(1.7)',
      })

      // Animated background
      gsap.to('.animated-bg', {
        y: -50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      // Features section animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      })

      // Showcase section animation
      gsap.from('.showcase-item', {
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      })

      // Testimonials animation
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  return (

    <>
      <NavBar />
      
      <main className="flex min-h-screen flex-col pt-4">
        <HeroSection />
        {/* Other sections */}
      </main>
    </>
  )
}
