'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Simulate login - will integrate with Supabase Auth later
      console.log('Login data:', data)
      toast.success('Welcome back!')
      // Redirect based on role - would come from user profile
      router.push('/dashboard')
    } catch (error) {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl text-primary-600">
            <span className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg">TC</span>
            TutorConnect
          </Link>
        </div>

        {/* Card */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Auth Method Toggle */}
            <div>
              <label className="label">Sign in with</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    authMethod === 'email'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Mail className="inline w-4 h-4 mr-1.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    authMethod === 'phone'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Phone className="inline w-4 h-4 mr-1.5" /> Phone
                </button>
              </div>
            </div>

            {/* Email or Phone */}
            {authMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    {...register('identifier')}
                    className={cn('input pl-10', errors.identifier && 'input-error')}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.identifier && <p className="mt-1 text-sm text-red-500">{errors.identifier.message}</p>}
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="label">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    {...register('identifier')}
                    className={cn('input pl-10', errors.identifier && 'input-error')}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
                {errors.identifier && <p className="mt-1 text-sm text-red-500">{errors.identifier.message}</p>}
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label mb-0">Password</label>
                <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={cn('input pl-10 pr-12', errors.password && 'input-error')}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          <Link
            href="/signup"
            className="btn-secondary w-full justify-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}