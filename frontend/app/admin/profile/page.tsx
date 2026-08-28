'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { apiUrl } from '@/lib/api-client'

interface Profile {
  id?: number
  name: string
  title: string
  email: string
  phone: string
  telegram: string
  github: string
}

export default function ProfileAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileId, setProfileId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Profile>({
    name: '',
    title: '',
    email: '',
    phone: '',
    telegram: '',
    github: '',
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(apiUrl('/api/profile/'))
        const data = await res.json()
        setFormData(data)
        setProfileId(data?.id ?? null)
      } catch (error) {
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const requestUrl = profileId
        ? apiUrl(`/api/profile/${profileId}/`)
        : apiUrl('/api/profile/')
      const method = profileId ? 'PUT' : 'POST'

      const res = await fetch(requestUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to save profile')
        setSaving(false)
        return
      }

      const data = await res.json()
      setProfileId(data.id ?? profileId)
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center text-muted-foreground">Yuklanmoqda...</div>
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Profil Sozlamalari</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Ism Familiya *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Sizning ismingiz"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Kasbiy Lavozim *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masalan: Yuqori Darajali Tam Stack Dasturchi"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sizning@email.com"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 90 000-00-00"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telegram</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="username (@ belgisisiz)"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium mb-2">GitHub Profil URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saqlanmoqda...' : 'O\'zgarishlarni Saqla'}
          </button>
        </div>
      </form>
    </div>
  )
}
