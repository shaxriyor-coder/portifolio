'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Users, Eye, MessageSquare } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Stats {
  projects: number
  skills: number
  submissions: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    submissions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, skillsRes, contactRes] = await Promise.all([
          fetch(apiUrl('/api/projects')),
          fetch(apiUrl('/api/skills')),
          fetch(apiUrl('/api/contact')),
        ])

        const projects = await projectsRes.json()
        const skills = await skillsRes.json()
        const submissions = await contactRes.json()

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
          submissions: Array.isArray(submissions) ? submissions.length : 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: FileText,
      color: 'from-purple-600/20 to-purple-600/5',
      href: '/admin/projects',
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Users,
      color: 'from-blue-600/20 to-blue-600/5',
      href: '/admin/skills',
    },
    {
      title: 'Contact Messages',
      value: stats.submissions,
      icon: MessageSquare,
      color: 'from-pink-600/20 to-pink-600/5',
      href: '#',
    },
    {
      title: 'Page Views',
      value: loading ? '...' : '0',
      icon: Eye,
      color: 'from-cyan-600/20 to-cyan-600/5',
      href: '/admin/profile',
    },
    {
      title: 'About',
      value: 'Edit',
      icon: MessageSquare,
      color: 'from-emerald-600/20 to-emerald-600/5',
      href: '/admin/about',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">Welcome to the dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-4 sm:p-6 rounded-lg bg-gradient-to-br ${card.color} border border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-purple-500/20`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-background">
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{card.title}</p>
              <p className="text-2xl sm:text-3xl font-bold break-words">{card.value}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/projects"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Manage Projects</h3>
            <p className="text-muted-foreground text-sm">Add, edit, or delete projects</p>
          </Link>

          <Link
            href="/admin/skills"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Manage Skills</h3>
            <p className="text-muted-foreground text-sm">Update your technical skills and expertise</p>
          </Link>

          <Link
            href="/admin/profile"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Edit Profile</h3>
            <p className="text-muted-foreground text-sm">Update your personal information</p>
          </Link>

          <Link
            href="/admin/about"
            className="p-6 rounded-lg bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Edit About</h3>
            <p className="text-muted-foreground text-sm">Manage the About Me section</p>
          </Link>

          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border">
            <h3 className="font-bold mb-2">View Live Site</h3>
            <Link href="/" className="text-primary hover:text-primary-foreground text-sm">
              Visit your portfolio →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
