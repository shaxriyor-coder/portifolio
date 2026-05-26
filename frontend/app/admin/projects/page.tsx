'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

interface Project {
  id: number
  title: string
  description: string
  project_type: 'web' | 'bot'
  tech_stack: string
  github_url?: string
  live_url?: string
  image_url?: string
  bot_username?: string
}

interface FormData {
  title: string
  description: string
  project_type: 'web' | 'bot'
  tech_stack: string
  github_url: string
  live_url: string
  image_url: string
  bot_username: string
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    project_type: 'web',
    tech_stack: '',
    github_url: '',
    live_url: '',
    image_url: '',
    bot_username: '',
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const res = await fetch(apiUrl('/api/projects'))
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim() || !formData.tech_stack.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects'

      const res = await fetch(apiUrl(url), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to save project')
        return
      }

      toast.success(editingId ? 'Project updated!' : 'Project created!')
      setFormData({
        title: '',
        description: '',
        project_type: 'web',
        tech_stack: '',
        github_url: '',
        live_url: '',
        image_url: '',
        bot_username: '',
      })
      setEditingId(null)
      setShowForm(false)
      fetchProjects()
    } catch (error) {
      toast.error('Failed to save project')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(apiUrl(`/api/projects/${id}`), { method: 'DELETE' })

      if (!res.ok) {
        toast.error('Failed to delete project')
        return
      }

      toast.success('Project deleted!')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  function handleEdit(project: Project) {
    setFormData({
      title: project.title,
      description: project.description,
      project_type: project.project_type,
      tech_stack: project.tech_stack,
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      image_url: project.image_url || '',
      bot_username: project.bot_username || '',
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({
              title: '',
              description: '',
              project_type: 'web',
              tech_stack: '',
              github_url: '',
              live_url: '',
              image_url: '',
              bot_username: '',
            })
            setShowForm(!showForm)
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          <Plus size={20} />
          Yangi loyiha
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editingId ? 'Loyihani tahrirlash' : 'Yangi loyiha'}</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Loyiha turi *</label>
              <select
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value as 'web' | 'bot' })}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              >
                <option value="web">Veb loyihasi</option>
                <option value="bot">Telegram bot</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sarlavha *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Loyiha sarlavhasi"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tavsif *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Loyiha haqida batafsil ma'lumot"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Texnologiyalar *</label>
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  placeholder="React, Next.js, TypeScript"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              {formData.project_type === 'bot' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Bot username *</label>
                  <input
                    type="text"
                    value={formData.bot_username}
                    onChange={(e) => setFormData({ ...formData, bot_username: e.target.value })}
                    placeholder="@mybot"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">Rasm URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="text"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Jonli URL</label>
                <input
                  type="text"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              {editingId ? 'Yangilash' : 'Yaratish'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="px-6 py-2 rounded-lg border border-border hover:bg-card transition-all"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="text-center text-muted-foreground">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No projects yet. Create your first project!</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-6 flex justify-between items-start hover:border-primary transition-all"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.split(',').map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded bg-background">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg hover:bg-background transition-all text-muted-foreground hover:text-foreground"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg hover:bg-background transition-all text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
