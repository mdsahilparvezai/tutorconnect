import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type UserRole = 'student' | 'tutor' | 'admin'

export interface UserProfile {
  id: string
  email: string
  phone?: string
  full_name: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface TutorProfile {
  id: string
  user_id: string
  qualification: string
  college: string
  graduation_year: number
  subjects: string[]
  class_levels: string[]
  experience_years: number
  teaching_mode: 'online' | 'offline' | 'hybrid'
  hourly_rate: number
  monthly_rate?: number
  bio: string
  intro_video_url?: string
  languages: string[]
  address: string
  latitude?: number
  longitude?: number
  city: string
  state: string
  pincode: string
  is_verified: boolean
  verification_status: 'pending' | 'approved' | 'rejected'
  profile_completeness: number
  response_rate: number
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string
  user_id: string
  class_level: string
  subjects_needed: string[]
  budget_min: number
  budget_max: number
  preferred_mode: 'online' | 'offline' | 'hybrid'
  address: string
  latitude?: number
  longitude?: number
  city: string
  state: string
  pincode: string
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  name: string
  category: 'academic' | 'competitive' | 'extracurricular' | 'language'
  class_levels: string[]
  created_at: string
}

export interface TutorSubject {
  id: string
  tutor_id: string
  subject_id: string
  subject_name: string
  class_levels: string[]
  hourly_rate: number
  monthly_rate?: number
  created_at: string
}

export interface Verification {
  id: string
  tutor_id: string
  id_document_url: string
  qualification_document_url: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  student_id: string
  tutor_id: string
  subject_id: string
  subject_name: string
  class_level: string
  mode: 'online' | 'offline'
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled' | 'demo_requested' | 'demo_scheduled' | 'demo_completed'
  scheduled_at: string
  duration_minutes: number
  hourly_rate: number
  total_amount: number
  student_notes?: string
  tutor_notes?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  booking_id: string
  student_id: string
  tutor_id: string
  subject_id: string
  rating: number
  comment: string
  is_anonymous: boolean
  created_at: string
}

export interface Message {
  id: string
  booking_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'system'
  is_read: boolean
  created_at: string
}

export interface Report {
  id: string
  reporter_id: string
  reported_user_id: string
  report_type: 'fake_profile' | 'harassment' | 'no_show' | 'inappropriate' | 'other'
  description: string
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  admin_notes?: string
  resolved_by?: string
  resolved_at?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'new_message' | 'demo_request' | 'booking_confirmed' | 'booking_cancelled' | 'review_received' | 'verification_update' | 'payment'
  title: string
  body: string
  data?: Record<string, unknown>
  is_read: boolean
  created_at: string
}