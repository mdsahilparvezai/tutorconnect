import { z } from 'zod'

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian phone number')

export const emailSchema = z.string().email('Enter a valid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const otpSchema = z.string().length(6, 'OTP must be 6 digits')

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  password: passwordSchema,
  role: z.enum(['student', 'tutor']),
}).refine((data) => data.email || data.phone, {
  message: 'Either email or phone is required',
  path: ['email'],
})

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or phone is required'),
  password: z.string().min(1, 'Password is required'),
})

export const otpVerificationSchema = z.object({
  identifier: z.string().min(1, 'Email or phone is required'),
  otp: otpSchema,
})

export const tutorProfileSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  college: z.string().min(1, 'College/University is required'),
  graduationYear: z.number().min(1950).max(new Date().getFullYear()),
  subjects: z.array(z.string()).min(1, 'Select at least one subject'),
  classLevels: z.array(z.string()).min(1, 'Select at least one class level'),
  experienceYears: z.number().min(0).max(50),
  teachingMode: z.enum(['online', 'offline', 'hybrid']),
  hourlyRate: z.number().min(100, 'Minimum hourly rate is ₹100').max(10000),
  monthlyRate: z.number().min(1000).max(200000).optional(),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(2000),
  introVideoUrl: z.string().url().optional().or(z.literal('')),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  address: z.string().min(10, 'Enter complete address'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter valid 6-digit pincode'),
})

export const studentProfileSchema = z.object({
  classLevel: z.string().min(1, 'Class level is required'),
  subjectsNeeded: z.array(z.string()).min(1, 'Select at least one subject'),
  budgetMin: z.number().min(100, 'Minimum budget is ₹100'),
  budgetMax: z.number().min(100, 'Maximum budget is required'),
  preferredMode: z.enum(['online', 'offline', 'hybrid']),
  address: z.string().min(10, 'Enter complete address'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter valid 6-digit pincode'),
}).refine((data) => data.budgetMax >= data.budgetMin, {
  message: 'Maximum budget must be greater than minimum budget',
  path: ['budgetMax'],
})

export const bookingSchema = z.object({
  tutorId: z.string().uuid(),
  subjectId: z.string().uuid(),
  subjectName: z.string().min(1),
  classLevel: z.string().min(1),
  mode: z.enum(['online', 'offline']),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().min(30).max(180).default(60),
  hourlyRate: z.number().min(100),
  studentNotes: z.string().max(1000).optional(),
})

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  subjectId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(1000),
  isAnonymous: z.boolean().default(false),
})

export const messageSchema = z.object({
  bookingId: z.string().uuid(),
  content: z.string().min(1, 'Message cannot be empty').max(2000),
  messageType: z.enum(['text', 'image', 'file']).default('text'),
})

export const reportSchema = z.object({
  reportedUserId: z.string().uuid(),
  reportType: z.enum(['fake_profile', 'harassment', 'no_show', 'inappropriate', 'other']),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
})

export const searchFiltersSchema = z.object({
  subject: z.string().optional(),
  classLevel: z.string().optional(),
  distanceKm: z.number().min(1).max(100).default(10),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().max(10000).optional(),
  rating: z.number().min(0).max(5).optional(),
  mode: z.enum(['online', 'offline', 'hybrid']).optional(),
  gender: z.enum(['male', 'female', 'any']).optional(),
  language: z.string().optional(),
  availability: z.string().optional(),
  sortBy: z.enum(['distance', 'rating', 'price_low', 'price_high', 'experience']).default('distance'),
})