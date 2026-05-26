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
      title: 'Loyihalar',
      value: stats.projects,
      icon: FileText,
      color: 'from-purple-600/20 to-purple-600/5',
      href: '/admin/projects',
    },
    {
      title: 'Ko\'nikmalar',
      value: stats.skills,
      icon: Users,
      color: 'from-blue-600/20 to-blue-600/5',
      href: '/admin/skills',
    },
    {
      title: 'Aloqa Xabarlari',
      value: stats.submissions,
      icon: MessageSquare,
      color: 'from-pink-600/20 to-pink-600/5',
      href: '#',
    },
    {
      title: 'Sahifa Ko\'rishlar',
      value: loading ? '...' : '0',
      icon: Eye,
      color: 'from-cyan-600/20 to-cyan-600/5',
      href: '/admin/profile',
    },
    {
      title: 'Men haqimda',
      value: 'Tahrir',
      icon: MessageSquare,
      color: 'from-emerald-600/20 to-emerald-600/5',
      href: '/admin/about',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Bosh sahifaga xush kelibsiz</h1>
        <p className="text-muted-foreground">Portifolio kontenti va sozlamalarni boshqaring</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-6 rounded-lg bg-gradient-to-br ${card.color} border border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-purple-500/20`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-background">
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{card.title}</p>
              <p className="text-3xl font-bold">{card.value}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Tez Amallar</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/projects"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Loyihalarni Boshqaring</h3>
            <p className="text-muted-foreground text-sm">Loyihalarni qo'shing, tahrir qiling yoki o'chiring</p>
          </Link>

          <Link
            href="/admin/skills"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Ko'nikmalarni Boshqaring</h3>
            <p className="text-muted-foreground text-sm">Texnik ko'nikmalar va malakangizni yangilang</p>
          </Link>

          <Link
            href="/admin/profile"
            className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Profilni Tahrir Qiling</h3>
            <p className="text-muted-foreground text-sm">Shaxsiy ma'lumotlarni yangilang</p>
          </Link>

          <Link
            href="/admin/about"
            className="p-6 rounded-lg bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 border border-border hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="font-bold mb-2">Men Haqimda Tahrir Qiling</h3>
            <p className="text-muted-foreground text-sm">Men Haqimda bo'limini boshqaring</p>
          </Link>

          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-border">
            <h3 className="font-bold mb-2">Jonli Saytni Ko'ring</h3>
            <Link href="/" className="text-primary hover:text-primary-foreground text-sm">
              Portifoliongizni tashrif buyuring →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
