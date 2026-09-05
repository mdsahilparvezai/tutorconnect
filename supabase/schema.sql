-- TutorConnect Database Schema
-- Run this in Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'tutor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email),
  UNIQUE(phone)
);

-- 2. Subjects reference table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('academic', 'competitive', 'extracurricular', 'language')),
  class_levels TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tutor profiles
CREATE TABLE public.tutor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  qualification TEXT NOT NULL,
  college TEXT NOT NULL,
  graduation_year INTEGER NOT NULL CHECK (graduation_year BETWEEN 1950 AND EXTRACT(YEAR FROM NOW())::INT),
  subjects TEXT[] NOT NULL DEFAULT '{}',
  class_levels TEXT[] NOT NULL DEFAULT '{}',
  experience_years INTEGER NOT NULL DEFAULT 0 CHECK (experience_years BETWEEN 0 AND 50),
  teaching_mode TEXT NOT NULL CHECK (teaching_mode IN ('online', 'offline', 'hybrid')),
  hourly_rate INTEGER NOT NULL CHECK (hourly_rate >= 100),
  monthly_rate INTEGER CHECK (monthly_rate >= 1000),
  bio TEXT NOT NULL,
  intro_video_url TEXT,
  languages TEXT[] NOT NULL DEFAULT '{}',
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL CHECK (pincode ~ '^\d{6}$'),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  profile_completeness INTEGER DEFAULT 0 CHECK (profile_completeness BETWEEN 0 AND 100),
  response_rate INTEGER DEFAULT 100 CHECK (response_rate BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Student profiles
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  class_level TEXT NOT NULL,
  subjects_needed TEXT[] NOT NULL DEFAULT '{}',
  budget_min INTEGER NOT NULL CHECK (budget_min >= 100),
  budget_max INTEGER NOT NULL CHECK (budget_max >= 100),
  preferred_mode TEXT NOT NULL CHECK (preferred_mode IN ('online', 'offline', 'hybrid')),
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL CHECK (pincode ~ '^\d{6}$'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (budget_max >= budget_min)
);

-- 5. Tutor subjects (many-to-many with per-subject rates)
CREATE TABLE public.tutor_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tutor_id UUID NOT NULL REFERENCES public.tutor_profiles(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL,
  class_levels TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate INTEGER NOT NULL CHECK (hourly_rate >= 100),
  monthly_rate INTEGER CHECK (monthly_rate >= 1000),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tutor_id, subject_id)
);

-- 6. Verifications
CREATE TABLE public.verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tutor_id UUID NOT NULL REFERENCES public.tutor_profiles(id) ON DELETE CASCADE,
  id_document_url TEXT NOT NULL,
  qualification_document_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bookings (includes demo requests)
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id),
  subject_name TEXT NOT NULL,
  class_level TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('online', 'offline')),
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled', 'demo_requested', 'demo_scheduled', 'demo_completed')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes BETWEEN 30 AND 180),
  hourly_rate INTEGER NOT NULL CHECK (hourly_rate >= 100),
  total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
  student_notes TEXT,
  tutor_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(booking_id, student_id)
);

-- 9. Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Reports
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('fake_profile', 'harassment', 'no_show', 'inappropriate', 'other')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  admin_notes TEXT,
  resolved_by UUID REFERENCES public.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('new_message', 'demo_request', 'booking_confirmed', 'booking_cancelled', 'review_received', 'verification_update', 'payment')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_tutor_profiles_city ON public.tutor_profiles(city);
CREATE INDEX idx_tutor_profiles_state ON public.tutor_profiles(state);
CREATE INDEX idx_tutor_profiles_pincode ON public.tutor_profiles(pincode);
CREATE INDEX idx_tutor_profiles_verified ON public.tutor_profiles(is_verified);
CREATE INDEX idx_tutor_profiles_subjects ON public.tutor_profiles USING GIN(subjects);
CREATE INDEX idx_tutor_profiles_class_levels ON public.tutor_profiles USING GIN(class_levels);
CREATE INDEX idx_tutor_profiles_location ON public.tutor_profiles USING GIST(
  ll_to_earth(latitude, longitude)
);
CREATE INDEX idx_student_profiles_city ON public.student_profiles(city);
CREATE INDEX idx_tutor_subjects_tutor ON public.tutor_subjects(tutor_id);
CREATE INDEX idx_tutor_subjects_subject ON public.tutor_subjects(subject_id);
CREATE INDEX idx_bookings_student ON public.bookings(student_id);
CREATE INDEX idx_bookings_tutor ON public.bookings(tutor_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_scheduled ON public.bookings(scheduled_at);
CREATE INDEX idx_reviews_tutor ON public.reviews(tutor_id);
CREATE INDEX idx_reviews_subject ON public.reviews(subject_id);
CREATE INDEX idx_messages_booking ON public.messages(booking_id);
CREATE INDEX idx_messages_created ON public.messages(created_at);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_verifications_status ON public.verifications(status);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read their own profile, tutors can read student profiles for bookings, admins can read all
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Tutor profiles: Public read for verified tutors, tutors can manage own, admins can manage all
CREATE POLICY "Verified tutors are publicly readable" ON public.tutor_profiles
  FOR SELECT USING (is_verified = true OR auth.uid() = user_id);

CREATE POLICY "Tutors can insert own profile" ON public.tutor_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Tutors can update own profile" ON public.tutor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all tutor profiles" ON public.tutor_profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Student profiles: Students can manage own, tutors can read for their bookings
CREATE POLICY "Students can manage own profile" ON public.student_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Tutors can read student profiles for bookings" ON public.student_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.tutor_id = auth.uid()
      AND bookings.student_id = student_profiles.user_id
      AND bookings.status IN ('confirmed', 'completed', 'demo_scheduled', 'demo_completed')
    )
  );

-- Tutor subjects: Public read for verified tutors, tutors manage own
CREATE POLICY "Tutor subjects readable for verified tutors" ON public.tutor_subjects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tutor_profiles
      WHERE tutor_profiles.id = tutor_subjects.tutor_id
      AND tutor_profiles.is_verified = true
    )
    OR EXISTS (
      SELECT 1 FROM public.tutor_profiles
      WHERE tutor_profiles.id = tutor_subjects.tutor_id
      AND tutor_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Tutors manage own subjects" ON public.tutor_subjects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tutor_profiles
      WHERE tutor_profiles.id = tutor_subjects.tutor_id
      AND tutor_profiles.user_id = auth.uid()
    )
  );

-- Verifications: Tutors can insert own, admins can manage all
CREATE POLICY "Tutors can submit verification" ON public.verifications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tutor_profiles
      WHERE tutor_profiles.id = verifications.tutor_id
      AND tutor_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Tutors can view own verification" ON public.verifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tutor_profiles
      WHERE tutor_profiles.id = verifications.tutor_id
      AND tutor_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins manage verifications" ON public.verifications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Bookings: Students and tutors can read own bookings, create bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = tutor_id);

CREATE POLICY "Students can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own pending bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = student_id AND status IN ('requested', 'demo_requested'));

CREATE POLICY "Tutors can update booking status" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = tutor_id
    AND status IN ('requested', 'demo_requested', 'demo_scheduled', 'confirmed')
  );

-- Reviews: Public read for completed bookings, students can create for completed bookings
CREATE POLICY "Reviews readable for completed bookings" ON public.reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.status = 'completed'
    )
  );

CREATE POLICY "Students can review completed bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = student_id
    AND EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.student_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- Messages: Participants can read and send messages
CREATE POLICY "Participants can read messages" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = messages.booking_id
      AND (bookings.student_id = auth.uid() OR bookings.tutor_id = auth.uid())
    )
  );

CREATE POLICY "Participants can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = messages.booking_id
      AND (bookings.student_id = auth.uid() OR bookings.tutor_id = auth.uid())
      AND bookings.status IN ('confirmed', 'demo_scheduled', 'demo_completed', 'completed')
    )
  );

-- Reports: Reporters can create, admins manage
CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Reporters can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = reporter_id);

CREATE POLICY "Admins manage reports" ON public.reports
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Notifications: Users can read own, system can create
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Functions for updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_tutor_profiles_updated_at BEFORE UPDATE ON public.tutor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_student_profiles_updated_at BEFORE UPDATE ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_tutor_subjects_updated_at BEFORE UPDATE ON public.tutor_subjects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_verifications_updated_at BEFORE UPDATE ON public.verifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_verifications_updated_at BEFORE UPDATE ON public.verifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, phone, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update tutor profile completeness
CREATE OR REPLACE FUNCTION public.update_tutor_completeness(tutor_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
  completeness INTEGER := 0;
  profile RECORD;
BEGIN
  SELECT * INTO profile FROM public.tutor_profiles WHERE id = tutor_id;

  IF profile.qualification IS NOT NULL AND profile.qualification != '' THEN completeness := completeness + 10; END IF;
  IF profile.college IS NOT NULL AND profile.college != '' THEN completeness := completeness + 10; END IF;
  IF profile.graduation_year IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF array_length(profile.subjects, 1) > 0 THEN completeness := completeness + 15; END IF;
  IF array_length(profile.class_levels, 1) > 0 THEN completeness := completeness + 10; END IF;
  IF profile.experience_years IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF profile.teaching_mode IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF profile.hourly_rate IS NOT NULL THEN completeness := completeness + 10; END IF;
  IF profile.bio IS NOT NULL AND profile.bio != '' THEN completeness := completeness + 10; END IF;
  IF array_length(profile.languages, 1) > 0 THEN completeness := completeness + 5; END IF;
  IF profile.address IS NOT NULL AND profile.address != '' THEN completeness := completeness + 5; END IF;
  IF profile.city IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF profile.state IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF profile.pincode IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF profile.intro_video_url IS NOT NULL AND profile.intro_video_url != '' THEN completeness := completeness + 5; END IF;

  UPDATE public.tutor_profiles SET profile_completeness = completeness WHERE id = tutor_id;
END;
$$;

-- Create trigger for tutor profile completeness
CREATE OR REPLACE FUNCTION public.trigger_tutor_completeness()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  PERFORM public.update_tutor_completeness(NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER tutor_profile_completeness
  AFTER INSERT OR UPDATE ON public.tutor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.trigger_tutor_completeness();

-- Insert default subjects
INSERT INTO public.subjects (name, category, class_levels) VALUES
  -- Academic subjects
  ('Mathematics', 'academic', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Physics', 'academic', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Chemistry', 'academic', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Biology', 'academic', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('English', 'academic', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Hindi', 'academic', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Social Studies', 'academic', ARRAY['Class 6','Class 7','Class 8','Class 9','Class 10']),
  ('History', 'academic', ARRAY['Class 11','Class 12']),
  ('Geography', 'academic', ARRAY['Class 11','Class 12']),
  ('Political Science', 'academic', ARRAY['Class 11','Class 12']),
  ('Economics', 'academic', ARRAY['Class 11','Class 12']),
  ('Accountancy', 'academic', ARRAY['Class 11','Class 12']),
  ('Business Studies', 'academic', ARRAY['Class 11','Class 12']),
  ('Computer Science', 'academic', ARRAY['Class 11','Class 12']),
  ('Informatics Practices', 'academic', ARRAY['Class 11','Class 12']),
  -- Competitive exams
  ('JEE Main', 'competitive', ARRAY['Class 11','Class 12','JEE Main']),
  ('JEE Advanced', 'competitive', ARRAY['Class 11','Class 12','JEE Advanced']),
  ('NEET', 'competitive', ARRAY['Class 11','Class 12','NEET']),
  ('CUET', 'competitive', ARRAY['Class 12','CUET']),
  ('Olympiad', 'competitive', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10']),
  ('NTSE', 'competitive', ARRAY['Class 10']),
  ('KVPY', 'competitive', ARRAY['Class 11','Class 12']),
  ('Foundation', 'competitive', ARRAY['Class 6','Class 7','Class 8','Class 9','Class 10']),
  ('CA Foundation', 'competitive', ARRAY['CA Foundation']),
  ('CS Foundation', 'competitive', ARRAY['CS Foundation']),
  ('CMA Foundation', 'competitive', ARRAY['CMA Foundation']),
  ('UPSC', 'competitive', ARRAY['UPSC']),
  ('State PSC', 'competitive', ARRAY['State PSC']),
  ('SSC', 'competitive', ARRAY['SSC']),
  ('Banking', 'competitive', ARRAY['Banking']),
  ('Railway', 'competitive', ARRAY['Railway']),
  -- Extracurricular
  ('Coding', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Python', 'extracurricular', ARRAY['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('JavaScript', 'extracurricular', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Web Development', 'extracurricular', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('App Development', 'extracurricular', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Music', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Guitar', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Piano', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Violin', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Vocals', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Tabla', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Dance', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Art & Craft', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Sports', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Yoga', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Fitness', 'extracurricular', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  -- Languages
  ('French', 'language', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('German', 'language', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Spanish', 'language', ARRAY['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Sanskrit', 'language', ARRAY['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']),
  ('Japanese', 'language', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Chinese', 'language', ARRAY['Class 9','Class 10','Class 11','Class 12']),
  ('Korean', 'language', ARRAY['Class 9','Class 10','Class 11','Class 12']);

-- Enable Realtime for messages and notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;