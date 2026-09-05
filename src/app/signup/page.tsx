'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, User, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { signupSchema, type SignupFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'

const roleOptions = [
  { value: 'student', label: 'Student / Parent', description: 'Looking for a tutor', icon: User },
  { value: 'tutor', label: 'Tutor', description: 'Want to teach students', icon: User },
]

export default function SignupPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'student' | 'tutor'>('student')
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      role: 'student',
    },
  })

  const password = watch('password')

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ]

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      // For now, simulate signup - will integrate with Supabase Auth later
      console.log('Signup data:', data)
      toast.success('Account created! Please verify your OTP.')
      setStep(2)
      reset({ ...data, password: '', confirmPassword: '' })
    } catch (error) {
      toast.error('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (otp: string) => {
    setIsLoading(true)
    try {
      // Simulate OTP verification
      console.log('OTP:', otp)
      toast.success('Email/Phone verified successfully!')
      router.push(selectedRole === 'tutor' ? '/tutor/onboarding' : '/student/onboarding')
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
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
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className={cn('flex-1 h-1.5 rounded-full bg-gray-200', step === 2 && 'bg-primary-600')}>
              <div className={cn('h-1.5 rounded-full transition-all duration-300', step === 1 ? 'w-1/2 bg-primary-600' : 'w-full bg-primary-600')} />
            </div>
            <div className={cn('flex-1 h-1.5 rounded-full bg-gray-200 ml-2', step === 2 && 'bg-primary-600')} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-8">
            <span className={cn(step === 1 ? 'text-primary-600 font-medium' : 'text-green-600')}>
              {step === 1 ? '●' : '✓'} Account Details
            </span>
            <span className={cn(step === 2 ? 'text-primary-600 font-medium' : 'text-gray-300')}>
              {step === 2 ? '●' : '○'} Verify OTP
            </span>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="label">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.value)
                        setValue('role', role.value)
                      }}
                      className={cn(
                        'relative p-4 rounded-xl border-2 transition-all duration-200 text-left',
                        selectedRole === role.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center',
                          selectedRole === role.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                        )}>
                          <role.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{role.label}</p>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </div>
                      {selectedRole === role.value && (
                        <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="fullName"
                    {...register('fullName')}
                    className={cn('input pl-10', errors.fullName && 'input-error')}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Auth Method Toggle */}
              <div>
                <label className="label">Sign up with</label>
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
                      {...register('email')}
                      className={cn('input pl-10', errors.email && 'input-error')}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={cn('input pl-10', errors.phone && 'input-error')}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={cn('input pl-10 pr-12', errors.password && 'input-error')}
                    placeholder="Create a strong password"
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

                {/* Password Strength */}
                {password && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className={cn(
                          'w-4 h-4 rounded border transition-colors',
                          req.test(password) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                        )} />
                        <span className={cn(
                          req.test(password) ? 'text-green-600' : 'text-gray-400'
                        )}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            // Step 2: OTP Verification
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900">Verify your {authMethod}</h3>
              <p className="text-gray-600">
                We\'ve sent a 6-digit code to <strong>{watch(authMethod)}</strong>. Enter it below to continue.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(Array.from(e.currentTarget.elements).filter(el => el.tagName === 'INPUT').map(el => (el as HTMLInputElement).value).join('')) }} className="space-y-4">
                <div className="flex gap-3 justify-center">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !e.currentTarget.value && i > 0) {
                          (e.currentTarget.previousElementSibling as HTMLInputElement)?.focus()
                        } else if (/^\d$/.test(e.key) && i < 5) {
                          (e.currentTarget.nextElementSibling as HTMLInputElement)?.focus()
                        }
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>

              <p className="text-sm text-gray-500">
                Didn\'t receive the code?{' '}
                <button className="text-primary-600 hover:underline font-medium">Resend</button>
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <Link
            href="/login"
            className="btn-secondary w-full justify-center"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}