'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated') === 'true'
    if (auth) {
      router.replace('/admin')
    }
  }, [router])

  const onSubmit = async (data: { email: string; password: string }) => {
    setErrorMessage('')
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000'
      const response = await fetch(`${backendUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Login failed")
        return
      }

      const result = await response.json()
      if (result.success) {
        localStorage.setItem('admin-authenticated', 'true')
        router.replace('/admin')
      }
    } catch (error) {
      setErrorMessage("Could not connect to the server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/80 p-8 shadow-xl shadow-black/10 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel Login</h1>
        <p className="text-sm text-muted-foreground mb-6">Please sign in with your admin email and password.</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="admin@example.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="********"
            />
            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
