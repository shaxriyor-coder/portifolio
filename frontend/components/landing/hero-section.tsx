'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Profile {
  name?: string
  title?: string
  bio?: string
  github?: string
}

export function HeroSection() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(apiUrl('/api/profile'))
        const data = await res.json()
        setProfile(data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    fetchProfile()
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
        {/* Welcome text */}
        <p className="text-lg text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-6">
          Mening portifoliomga xush kelibsiz
        </p>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {profile?.name || 'Tam Stack Dasturchi'}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {profile?.title || 'Zamonaviy texnologiyalar bilan elegant yechimlar yaratish'} • {profile?.bio || 'Chiroyli va foydali veb tajribalarni yaratishga ishtiyoq'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 flex items-center gap-2"
          >
            Mening ishlarini ko'ring
            <ArrowRight size={20} />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-border hover:bg-card transition-colors duration-200 font-semibold"
          >
            Menga murojaat qiling
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Github size={24} />
            </a>
          )}
          <a
            href="#contact"
            className="p-3 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
