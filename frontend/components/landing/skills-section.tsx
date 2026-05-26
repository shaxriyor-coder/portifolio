'use client'

import { useEffect, useState } from 'react'
import { apiUrl } from '@/lib/api-client'

interface Skill {
  id: number
  category: string
  name: string
  level: string
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(apiUrl('/api/skills'))
        const data = await res.json()
        setSkills(data)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-20 px-6 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center animate-slide-up">Ko'nikmalar va Texnologiyalar</h2>

        {loading ? (
          <div className="text-center text-muted-foreground">Ko'nikmalar yuklanmoqda...</div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center text-muted-foreground">Hali ko'nikma qo'shilmagan</div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-6 text-primary capitalize">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-lg bg-background border border-border hover:border-primary hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group"
                      style={{
                        animation: `slideUp 0.6s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <p className="font-semibold group-hover:text-primary transition-colors">{skill.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{skill.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
