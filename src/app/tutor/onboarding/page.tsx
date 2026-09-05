'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, MapPin, GraduationCap, Briefcase, Clock, IndianRupee, Languages, Video, Camera, CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { tutorProfileSchema, type TutorProfileFormData } from '@/lib/validations'
import { CLASS_LEVELS, TEACHING_MODES, LANGUAGES, SUBJECT_CATEGORIES } from '@/lib/utils'
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

export default function TutorOnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TutorProfileFormData>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      qualification: '',
      college: '',
      graduationYear: new Date().getFullYear(),
      subjects: [],
      classLevels: [],
      experienceYears: 0,
      teachingMode: 'hybrid',
      hourlyRate: 500,
      monthlyRate: undefined,
      bio: '',
      introVideoUrl: '',
      languages: ['English'],
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
  })

  const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({
    control,
    name: 'subjects',
  })

  const { fields: classFields, append: appendClass, remove: removeClass } = useFieldArray({
    control,
    name: 'classLevels',
  })

  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({
    control,
    name: 'languages',
  })

  const watchedSubjects = watch('subjects')
  const watchedClasses = watch('classLevels')
  const watchedLanguages = watch('languages')
  const watchedTeachingMode = watch('teachingMode')

  const onSubmit = async (data: TutorProfileFormData) => {
    setIsLoading(true)
    try {
      console.log('Tutor profile data:', data)
      toast.success('Profile created successfully!')
      router.push('/tutor/dashboard')
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
    { num: 1, title: 'Qualifications', desc: 'Your education & expertise' },
    { num: 2, title: 'Subjects & Classes', desc: 'What you teach' },
    { num: 3, title: 'Rates & Mode', desc: 'Pricing & teaching style' },
    { num: 4, title: 'Location & Bio', desc: 'Where you teach & about you' },
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
              <div key={i} className={cn('text-center w-1/4', i === currentStep - 1 ? 'text-primary-600 font-medium' : 'text-gray-400')}>
                <p>{step.title}</p>
                <p className="hidden sm:block">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="container-custom py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Current Step Content */}
          <div className="card p-6 md:p-8 animate-in">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-900">{stepData[currentStep - 1].title}</h2>
              <p className="text-gray-600 mt-1">{stepData[currentStep - 1].desc}</p>
            </div>

            {/* Step 1: Qualifications */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="qualification" className="label">Highest Qualification <span className="text-red-500">*</span></label>
                  <input
                    id="qualification"
                    {...register('qualification')}
                    className={cn('input', errors.qualification && 'input-error')}
                    placeholder="e.g., M.Sc. Physics, B.Tech CSE, M.A. English"
                  />
                  {errors.qualification && <p className="mt-1 text-sm text-red-500">{errors.qualification.message}</p>}
                </div>

                <div>
                  <label htmlFor="college" className="label">College / University <span className="text-red-500">*</span></label>
                  <input
                    id="college"
                    {...register('college')}
                    className={cn('input', errors.college && 'input-error')}
                    placeholder="e.g., IIT Delhi, Delhi University, BITS Pilani"
                  />
                  {errors.college && <p className="mt-1 text-sm text-red-500">{errors.college.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="graduationYear" className="label">Graduation Year <span className="text-red-500">*</span></label>
                    <select
                      id="graduationYear"
                      {...register('graduationYear', { valueAsNumber: true })}
                      className={cn('input', errors.graduationYear && 'input-error')}
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => (
                        <option key={1950 + i} value={1950 + i}>{1950 + i}</option>
                      )).reverse()}
                    </select>
                    {errors.graduationYear && <p className="mt-1 text-sm text-red-500">{errors.graduationYear.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="experienceYears" className="label">Years of Experience <span className="text-red-500">*</span></label>
                    <input
                      id="experienceYears"
                      type="number"
                      {...register('experienceYears', { valueAsNumber: true })}
                      className={cn('input', errors.experienceYears && 'input-error')}
                      placeholder="0"
                      min="0"
                      max="50"
                    />
                    {errors.experienceYears && <p className="mt-1 text-sm text-red-500">{errors.experienceYears.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Subjects & Classes */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Subjects */}
                <div>
                  <label className="label">Subjects You Teach <span className="text-red-500">*</span></label>
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
                                    setValue('subjects', [...watchedSubjects, subj], { shouldValidate: true })
                                  } else {
                                    setValue('subjects', watchedSubjects.filter(s => s !== subj), { shouldValidate: true })
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
                  {errors.subjects && <p className="mt-1 text-sm text-red-500">{errors.subjects.message}</p>}
                </div>

                {/* Class Levels */}
                <div>
                  <label className="label">Class Levels <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {CLASS_LEVELS.map((cls) => (
                      <label
                        key={cls}
                        className={cn(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border-2 transition-all cursor-pointer',
                          watchedClasses.includes(cls)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="checkbox"
                          value={cls}
                          checked={watchedClasses.includes(cls)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setValue('classLevels', [...watchedClasses, cls], { shouldValidate: true })
                            } else {
                              setValue('classLevels', watchedClasses.filter(c => c !== cls), { shouldValidate: true })
                            }
                          }}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        {cls}
                      </label>
                    ))}
                  </div>
                  {errors.classLevels && <p className="mt-1 text-sm text-red-500">{errors.classLevels.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Rates & Mode */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Teaching Mode */}
                <div>
                  <label className="label">Teaching Mode <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    {TEACHING_MODES.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => setValue('teachingMode', mode.value as 'online' | 'offline' | 'hybrid')}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all',
                          watchedTeachingMode === mode.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <div className={cn(
                          'w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center',
                          watchedTeachingMode === mode.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                        )}>
                          {mode.value === 'online' && <Video className="w-6 h-6" />}
                          {mode.value === 'offline' && <MapPin className="w-6 h-6" />}
                          {mode.value === 'hybrid' && (
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              <MapPin className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium text-gray-900">{mode.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <label htmlFor="hourlyRate" className="label">Hourly Rate (₹) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="hourlyRate"
                      type="number"
                      {...register('hourlyRate', { valueAsNumber: true })}
                      className={cn('input pl-10', errors.hourlyRate && 'input-error')}
                      placeholder="500"
                      min="100"
                      max="10000"
                      step="50"
                    />
                  </div>
                  {errors.hourlyRate && <p className="mt-1 text-sm text-red-500">{errors.hourlyRate.message}</p>}
                  <p className="mt-1 text-sm text-gray-500">Minimum ₹100/hour</p>
                </div>

                {/* Monthly Rate */}
                <div>
                  <label htmlFor="monthlyRate" className="label">Monthly Package Rate (₹) <span className="text-gray-400">(Optional)</span></label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="monthlyRate"
                      type="number"
                      {...register('monthlyRate', { valueAsNumber: true })}
                      className={cn('input pl-10', errors.monthlyRate && 'input-error')}
                      placeholder="5000"
                      min="1000"
                      max="200000"
                      step="500"
                    />
                  </div>
                  {errors.monthlyRate && <p className="mt-1 text-sm text-red-500">{errors.monthlyRate.message}</p>}
                  <p className="mt-1 text-sm text-gray-500">For students preferring monthly packages (8-12 sessions)</p>
                </div>
              </div>
            )}

            {/* Step 4: Location & Bio */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="label">Bio / Introduction <span className="text-red-500">*</span></label>
                  <textarea
                    id="bio"
                    {...register('bio')}
                    rows={5}
                    className={cn('input resize-none', errors.bio && 'input-error')}
                    placeholder="Tell students about your teaching philosophy, methodology, achievements, and what makes you a great tutor..."
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>}
                  <p className="mt-1 text-sm text-gray-500">Minimum 50 characters. This helps students understand your teaching style.</p>
                </div>

                {/* Intro Video */}
                <div>
                  <label htmlFor="introVideoUrl" className="label">Intro Video URL <span className="text-gray-400">(Optional)</span></label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="introVideoUrl"
                      type="url"
                      {...register('introVideoUrl')}
                      className={cn('input pl-10', errors.introVideoUrl && 'input-error')}
                      placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                    />
                  </div>
                  {errors.introVideoUrl && <p className="mt-1 text-sm text-red-500">{errors.introVideoUrl.message}</p>}
                  <p className="mt-1 text-sm text-gray-500">YouTube, Google Drive, or Vimeo link. A 1-2 min intro video increases trust significantly.</p>
                </div>

                {/* Languages */}
                <div>
                  <label className="label">Languages Spoken <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <label
                        key={lang}
                        className={cn(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border-2 transition-all cursor-pointer',
                          watchedLanguages.includes(lang)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="checkbox"
                          value={lang}
                          checked={watchedLanguages.includes(lang)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setValue('languages', [...watchedLanguages, lang], { shouldValidate: true })
                            } else {
                              setValue('languages', watchedLanguages.filter(l => l !== lang), { shouldValidate: true })
                            }
                          }}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                  {errors.languages && <p className="mt-1 text-sm text-red-500">{errors.languages.message}</p>}
                </div>

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

// Need to import Link
import Link from 'next/link'