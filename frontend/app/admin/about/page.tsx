'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { apiUrl } from '@/lib/api-client'

interface AboutMe {
  id?: number
  content: string
  email?: string
  phone_number?: string
  telegram?: string
  yearly_experience?: number
  projects_completed?: number
  client_satisfaction?: number
  technologies?: string
}

export default function AboutAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutId, setAboutId] = useState<number | null>(null)
  const [aboutMe, setAboutMe] = useState<AboutMe>({
    id: undefined,
    content: '',
    email: '',
    phone_number: '',
    telegram: '',
    yearly_experience: 0,
    projects_completed: 0,
    client_satisfaction: 0,
    technologies: '',
  })

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch(apiUrl('/api/about-me'))
        const data = await res.json()
        const item = Array.isArray(data) ? data[0] : data
        setAboutId(item?.id ?? null)
        setAboutMe(item ?? {
          id: undefined,
          content: '',
          email: '',
          phone_number: '',
          telegram: '',
          yearly_experience: 0,
          projects_completed: 0,
          client_satisfaction: 0,
          technologies: '',
        })
      } catch (error) {
        toast.error('Failed to load About Me')
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (!aboutMe.content.trim()) {
      toast.error('Please add About Me content')
      setSaving(false)
      return
    }

    try {
      const requestUrl = aboutId
        ? apiUrl(`/api/about-me/${aboutId}/`)
        : apiUrl('/api/about-me/')
      const method = aboutId ? 'PUT' : 'POST'

      const res = await fetch(requestUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: aboutMe.content,
          email: aboutMe.email || '',
          phone_number: aboutMe.phone_number || '',
          telegram: aboutMe.telegram || '',
          yearly_experience: Number(aboutMe.yearly_experience) || 0,
          projects_completed: Number(aboutMe.projects_completed) || 0,
          client_satisfaction: Number(aboutMe.client_satisfaction) || 0,
          technologies: aboutMe.technologies || '',
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to save About Me')
        setSaving(false)
        return
      }

      const data = await res.json()
      setAboutId(data.id ?? aboutId)
      setAboutMe(data)
      toast.success('About Me saved!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save About Me')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center text-muted-foreground">Yuklanmoqda...</div>
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Men Haqimda</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-8 space-y-6">
          {/* About Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Men Haqimda Mazmuni *</label>
            <textarea
              value={aboutMe.content}
              onChange={(e) => setAboutMe({ ...aboutMe, content: e.target.value })}
              placeholder="Portifoliongiz uchun batafsil Men haqimda bo'limini yozing"
              rows={8}
              className="w-full px-4 py-4 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-4">Aloqa Ma'lumotlari</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={aboutMe.email || ''}
                  onChange={(e) => setAboutMe({ ...aboutMe, email: e.target.value })}
                  placeholder="siz@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefon Raqami</label>
                <input
                  type="tel"
                  value={aboutMe.phone_number || ''}
                  onChange={(e) => setAboutMe({ ...aboutMe, phone_number: e.target.value })}
                  placeholder="+998 90 000-00-00"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telegram</label>
                <input
                  type="text"
                  value={aboutMe.telegram || ''}
                  onChange={(e) => setAboutMe({ ...aboutMe, telegram: e.target.value })}
                  placeholder="@sizningusername"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Experience & Statistics */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-4">Tajriba va Statistika</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Yillik Tajriba (yil)</label>
                <input
                  type="number"
                  min="0"
                  value={aboutMe.yearly_experience || 0}
                  onChange={(e) => setAboutMe({ ...aboutMe, yearly_experience: parseInt(e.target.value) || 0 })}
                  placeholder="5"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tugallangan Loyihalar</label>
                <input
                  type="number"
                  min="0"
                  value={aboutMe.projects_completed || 0}
                  onChange={(e) => setAboutMe({ ...aboutMe, projects_completed: parseInt(e.target.value) || 0 })}
                  placeholder="25"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mijozlar Qanaqatligi (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={aboutMe.client_satisfaction || 0}
                  onChange={(e) => setAboutMe({ ...aboutMe, client_satisfaction: parseInt(e.target.value) || 0 })}
                  placeholder="95"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-4">Texnologiyalar</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Texnologiyalar (vergul bilan ajratilgan)</label>
              <textarea
                value={aboutMe.technologies || ''}
                onChange={(e) => setAboutMe({ ...aboutMe, technologies: e.target.value })}
                placeholder="React, Next.js, TypeScript, Node.js, PostgreSQL, Docker"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saqlanmoqda...' : 'Men Haqimda Saqla'}
          </button>
        </div>
      </form>
    </div>
  )
}
