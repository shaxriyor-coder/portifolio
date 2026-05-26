'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Trash2, Plus } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Skill {
  id: number
  category: string
  name: string
  level: string
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    level: 'intermediate',
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    try {
      const res = await fetch(apiUrl('/api/skills'))
      if (!res.ok) {
        throw new Error('Failed to load skills')
      }

      const data = await res.json()
      setSkills(data)
    } catch (error) {
      toast.error('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.category.trim() || !formData.name.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const res = await fetch(apiUrl('/api/skills'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to add skill')
        return
      }

      const newSkill = await res.json()
      setSkills((prev) => [...prev, newSkill])

      toast.success('Skill added!')
      setFormData({ category: '', name: '', level: 'intermediate' })
      setShowForm(false)
    } catch (error) {
      toast.error('Failed to add skill')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return

    try {
      const res = await fetch(apiUrl(`/api/skills/${id}`), { method: 'DELETE' })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        toast.error(errorData?.error || 'Failed to delete skill')
        return
      }

      setSkills((prev) => prev.filter((skill) => skill.id !== id))
      toast.success('Skill deleted!')
    } catch (error) {
      toast.error('Failed to delete skill')
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Skills</h1>
        <button
          onClick={() => {
            setFormData({ category: '', name: '', level: 'intermediate' })
            setShowForm(!showForm)
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">New Skill</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Frontend, Backend, Tools"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Skill Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. React, TypeScript, Node.js"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Add Skill
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 rounded-lg border border-border hover:bg-card transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Skills List */}
      {loading ? (
        <div className="text-center text-muted-foreground">Loading...</div>
      ) : Object.keys(groupedSkills).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No skills yet. Add your first skill!</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 capitalize text-primary">{category}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-card border border-border rounded-lg p-4 flex justify-between items-center hover:border-primary transition-all"
                  >
                    <div>
                      <p className="font-semibold">{skill.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{skill.level}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-2 rounded-lg hover:bg-background transition-all text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
