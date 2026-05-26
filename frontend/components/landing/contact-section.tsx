'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, MessageSquare } from 'lucide-react'
import { apiUrl } from '@/lib/api-client'

export function ContactSection() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.error || 'Failed to send message')
        setLoading(false)
        return
      }

      toast.success('Message sent successfully!')
      setFormData({ email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-card/30 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center animate-slide-up">Menga Murojaat Qiling</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Loyihangiz haqidagi fikr bormi? Keling, hamkorlik qilib birgalikda ajoyib narsa yaratamiz.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Manzili
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sizning@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Xabar
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-muted-foreground" size={20} />
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Menga loyihangiz haqida ayting..."
                rows={5}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Jo\'natilmoqda...' : 'Xabar jo\'natish'}
          </button>
        </form>
      </div>
    </section>
  )
}
