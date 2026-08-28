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
    <section id="skills" className="border-y border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold animate-slide-up sm:mb-12 sm:text-4xl">Skills &amp; Technologies</h2>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading skills...</div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center text-muted-foreground">No skills added yet</div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="mb-4 text-xl font-semibold text-primary capitalize sm:mb-6 sm:text-2xl">{category}</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="rounded-lg border border-border bg-background p-4 transition-all duration-300 hover:scale-[1.01] hover:border-primary hover:shadow-lg hover:shadow-purple-500/20 group"
                      style={{
                        animation: `slideUp 0.6s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      <p className="font-semibold transition-colors group-hover:text-primary">{skill.name}</p>
                      <p className="mt-1 text-xs capitalize text-muted-foreground">{skill.level}</p>
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
