'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, BookOpen, IndianRupee, Monitor, Home, Wifi, CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { studentProfileSchema, type StudentProfileFormData } from '@/lib/validations'
import { CLASS_LEVELS, TEACHING_MODES, SUBJECT_CATEGORIES } from '@/lib/utils'
import { cn } from '@/lib/utils'

const subjectsByCategory = {
  academic: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
    'Social Studies', 'History', 'Geography', 'Political Science', 'Economics',
    'Accountancy', 'Business Studies', 'Computer Science', 'Informatics Practices'
  ],
  competitive: [
    'JEE Main', 'JEE Advanced', 'NEET', 'CUET', 'Olympiad', 'NTSE', 'KVPY',
    'Foundation', 'CA Foundation', 'CS Foundation', 'CMA Foundation',
    'UPSC', 'State PSC', 'SSC', 'Banking', 'Railway'
  ],
  extracurricular: [
    'Coding', 'Python', 'JavaScript', 'Web Development', 'App Development',
    'Music', 'Guitar', 'Piano', 'Violin', 'Vocals', 'Tabla',
    'Dance', 'Art & Craft', 'Sports', 'Yoga', 'Fitness'
  ],
  language: [
    'French', 'German', 'Spanish', 'Sanskrit', 'Japanese', 'Chinese', 'Korean'
  ],
}

export default function StudentOnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<StudentProfileFormData>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      classLevel: '',
      subjectsNeeded: [],
      budgetMin: 500,
      budgetMax: 2000,
      preferredMode: 'hybrid',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
  })

  const watchedSubjects = watch('subjectsNeeded')
  const watchedMode = watch('preferredMode')
  const watchedBudgetMin = watch('budgetMin')
  const watchedBudgetMax = watch('budgetMax')

  const onSubmit = async (data: StudentProfileFormData) => {
    setIsLoading(true)
    try {
      console.log('Student profile data:', data)
      toast.success('Profile created successfully!')
      router.push('/search')
    } catch (error) {
      toast.error('Failed to create profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const stepData = [
    { num: 1, title: 'Learning Needs', desc: 'What you want to learn' },
    { num: 2, title: 'Budget & Mode', desc: 'Your preferences' },
    { num: 3, title: 'Location', desc: 'Where you want lessons' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary-600">
              <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">TC</span>
              TutorConnect
            </Link>
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {stepData.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={cn(
                  'flex-1 h-1.5 rounded-full transition-colors',
                  i < currentStep - 1 ? 'bg-primary-600' : i === currentStep - 1 ? 'bg-primary-600' : 'bg-gray-200'
                )} />
                {i < stepData.length - 1 && (
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    i < currentStep - 1 ? 'bg-primary-600 text-white' :
                    i === currentStep - 1 ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                    'bg-gray-100 text-gray-400'
                  )}>
                    {i < currentStep - 1 ? <CheckCircle className="w-4 h-4" /> : step.num}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-3 text-xs">
            {stepData.map((step, i) => (
              <div key={i} className={cn('text-center w-1/3', i === currentStep - 1 ? 'text-primary-600 font-medium' : 'text-gray-400')}>
                <p>{step.title}</p>
                <p className="hidden sm:block">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="container-custom py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Current Step Content */}
          <div className="card p-6 md:p-8 animate-in">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-900">{stepData[currentStep - 1].title}</h2>
              <p className="text-gray-600 mt-1">{stepData[currentStep - 1].desc}</p>
            </div>

            {/* Step 1: Learning Needs */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Class Level */}
                <div>
                  <label htmlFor="classLevel" className="label">Current Class / Level <span className="text-red-500">*</span></label>
                  <select
                    id="classLevel"
                    {...register('classLevel')}
                    className={cn('input', errors.classLevel && 'input-error')}
                  >
                    <option value="">Select your class</option>
                    {CLASS_LEVELS.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  {errors.classLevel && <p className="mt-1 text-sm text-red-500">{errors.classLevel.message}</p>}
                </div>

                {/* Subjects Needed */}
                <div>
                  <label className="label">Subjects You Need Help With <span className="text-red-500">*</span></label>
                  <div className="space-y-4">
                    {SUBJECT_CATEGORIES.map((cat) => (
                      <div key={cat.value} className="border border-gray-200 rounded-xl p-4">
                        <h4 className="font-medium text-gray-700 mb-3 capitalize">{cat.label}</h4>
                        <div className="flex flex-wrap gap-2">
                          {subjectsByCategory[cat.value as keyof typeof subjectsByCategory].map((subj) => (
                            <label
                              key={subj}
                              className={cn(
                                'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border-2 transition-all cursor-pointer',
                                watchedSubjects.includes(subj)
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              )}
                            >
                              <input
                                type="checkbox"
                                value={subj}
                                checked={watchedSubjects.includes(subj)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setValue('subjectsNeeded', [...watchedSubjects, subj], { shouldValidate: true })
                                  } else {
                                    setValue('subjectsNeeded', watchedSubjects.filter(s => s !== subj), { shouldValidate: true })
                                  }
                                }}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                              />
                              {subj}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.subjectsNeeded && <p className="mt-1 text-sm text-red-500">{errors.subjectsNeeded.message}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Budget & Mode */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Budget Range */}
                <div>
                  <label className="label">Monthly Budget Range (₹)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budgetMin" className="label">Minimum Budget</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="budgetMin"
                          type="number"
                          {...register('budgetMin', { valueAsNumber: true })}
                          className={cn('input pl-10', errors.budgetMin && 'input-error')}
                          placeholder="500"
                          min="100"
                          max={watchedBudgetMax}
                          step="100"
                        />
                      </div>
                      {errors.budgetMin && <p className="mt-1 text-sm text-red-500">{errors.budgetMin.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="budgetMax" className="label">Maximum Budget</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="budgetMax"
                          type="number"
                          {...register('budgetMax', { valueAsNumber: true })}
                          className={cn('input pl-10', errors.budgetMax && 'input-error')}
                          placeholder="2000"
                          min={watchedBudgetMin}
                          max="50000"
                          step="100"
                        />
                      </div>
                      {errors.budgetMax && <p className="mt-1 text-sm text-red-500">{errors.budgetMax.message}</p>}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">This helps us show you tutors within your budget range.</p>
                </div>

                {/* Teaching Mode */}
                <div>
                  <label className="label">Preferred Teaching Mode <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    {TEACHING_MODES.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => setValue('preferredMode', mode.value as 'online' | 'offline' | 'hybrid')}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all',
                          watchedMode === mode.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <div className={cn(
                          'w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center',
                          watchedMode === mode.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                        )}>
                          {mode.value === 'online' && <Monitor className="w-6 h-6" />}
                          {mode.value === 'offline' && <Home className="w-6 h-6" />}
                          {mode.value === 'hybrid' && <Wifi className="w-6 h-6" />}
                        </div>
                        <p className="font-medium text-gray-900">{mode.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Address */}
                <div>
                  <label htmlFor="address" className="label">Full Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <textarea
                      id="address"
                      {...register('address')}
                      rows={2}
                      className={cn('input pl-10 resize-none', errors.address && 'input-error')}
                      placeholder="House/Flat No., Building, Street, Area, Landmark"
                    />
                  </div>
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="label">City <span className="text-red-500">*</span></label>
                    <input
                      id="city"
                      {...register('city')}
                      className={cn('input', errors.city && 'input-error')}
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="label">State <span className="text-red-500">*</span></label>
                    <input
                      id="state"
                      {...register('state')}
                      className={cn('input', errors.state && 'input-error')}
                      placeholder="Maharashtra"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="label">Pincode <span className="text-red-500">*</span></label>
                    <input
                      id="pincode"
                      {...register('pincode')}
                      className={cn('input', errors.pincode && 'input-error')}
                      placeholder="400001"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode.message}</p>}
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Your location helps us find tutors near you. We only show your area, not exact address, to tutors.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary"
              >
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Profile...
                    </span>
                  ) : (
                    <>
                      Complete Profile
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}