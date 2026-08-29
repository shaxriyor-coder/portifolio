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
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6">
      {/* Gradient background elements */}
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-4xl text-center animate-fade-in">
        {/* Welcome text */}
        <p className="mb-4 text-base text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text sm:text-lg">
          Welcome to my portfolio
        </p>

        {/* Main heading */}
        <h1 className="mb-6 text-[clamp(2rem,6vw,4.8rem)] font-bold leading-tight">
          {profile?.name || 'Full Stack Developer'}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
          {profile?.title || 'Building elegant solutions with modern technology'} • {profile?.bio || 'Passionate about crafting beautiful, functional web experiences'}
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50"
          >
            View my work
            <ArrowRight size={20} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 font-semibold transition-colors duration-200 hover:bg-card"
          >
            Get in touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-card p-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <Github size={24} />
            </a>
          )}
          <a
            href="https://www.linkedin.com/in/shaxriyor-egamberdiyev-57595240a/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-card p-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-card p-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8">
        <div className="animate-bounce">
          <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
