'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Star, Calendar, User, Upload, MessageCircle, Archive, Shield } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: Star },
    { href: '/schedule', label: 'Events', icon: Calendar },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/submit', label: 'Submit', icon: Upload },
    { href: '/feedback', label: 'Feedback', icon: MessageCircle },
    { href: '/gallery', label: 'Gallery', icon: Archive },
    { href: '/safety', label: 'Safety', icon: Shield },
  ]

  return (
    <nav className="bg-white shadow-soft border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-purple rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">Abhivyakti</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}