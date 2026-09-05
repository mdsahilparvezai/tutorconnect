import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, TutorProfile, StudentProfile } from './supabase'

interface AuthState {
  user: UserProfile | null
  tutorProfile: TutorProfile | null
  studentProfile: StudentProfile | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  setTutorProfile: (profile: TutorProfile | null) => void
  setStudentProfile: (profile: StudentProfile | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tutorProfile: null,
      studentProfile: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setTutorProfile: (tutorProfile) => set({ tutorProfile }),
      setStudentProfile: (studentProfile) => set({ studentProfile }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, tutorProfile: null, studentProfile: null }),
    }),
    {
      name: 'tutorconnect-auth',
      partialize: (state) => ({
        user: state.user,
        tutorProfile: state.tutorProfile,
        studentProfile: state.studentProfile,
      }),
    }
  )
)

interface SearchState {
  filters: Record<string, unknown>
  results: unknown[]
  isLoading: boolean
  setFilters: (filters: Record<string, unknown>) => void
  setResults: (results: unknown[]) => void
  setLoading: (loading: boolean) => void
  clearResults: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  filters: {},
  results: [],
  isLoading: false,
  setFilters: (filters) => set({ filters }),
  setResults: (results) => set({ results }),
  setLoading: (isLoading) => set({ isLoading }),
  clearResults: () => set({ results: [] }),
}))

interface UIState {
  isSidebarOpen: boolean
  isMapView: boolean
  activeTab: string
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setMapView: (isMap: boolean) => void
  setActiveTab: (tab: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isMapView: false,
  activeTab: 'list',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setMapView: (isMapView) => set({ isMapView }),
  setActiveTab: (activeTab) => set({ activeTab }),
}))