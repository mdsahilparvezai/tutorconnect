'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, SlidersHorizontal, X, Star, Clock, IndianRupee, CheckCircle } from 'lucide-react'
import { CLASS_LEVELS, SUBJECT_CATEGORIES } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedMode, setSelectedMode] = useState('online')

  const tutors = [
    { id: 1, name: 'Dr. Priya Sharma', role: 'Physics & Mathematics', subjects: ['Physics', 'Mathematics'], classes: ['Class 11', 'Class 12', 'JEE Advanced'], rating: 4.8, reviews: 124, hourlyRate: 800, mode: 'online', experience: 8, verified: true, location: 'Mumbai, Maharashtra', image: 'PS', distance: 2.5, languages: ['English', 'Hindi'], profileCompleteness: 95 },
    { id: 2, name: 'Rohit Verma', role: 'JEE & NEET Expert', subjects: ['Physics', 'Chemistry', 'Mathematics'], classes: ['Class 11', 'Class 12', 'JEE Main', 'NEET'], rating: 4.6, reviews: 89, hourlyRate: 600, mode: 'offline', experience: 5, verified: true, location: 'Delhi', image: 'RV', distance: 5.2, languages: ['English', 'Hindi'], profileCompleteness: 88 },
    { id: 3, name: 'Anjali Mehta', role: 'English Literature & Writing', subjects: ['English', 'Writing Skills'], classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'], rating: 4.9, reviews: 210, hourlyRate: 700, mode: 'hybrid', experience: 12, verified: true, location: 'Bangalore', image: 'AM', distance: 8.1, languages: ['English', 'Hindi', 'Kannada'], profileCompleteness: 100 },
    { id: 4, name: 'Karan Singh', role: 'Coding & Computer Science', subjects: ['Python', 'Web Development', 'Computer Science'], classes: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Coding'], rating: 4.7, reviews: 56, hourlyRate: 950, mode: 'online', experience: 6, verified: false, location: 'Gurgaon', image: 'KS', distance: 12.3, languages: ['English', 'Hindi'], profileCompleteness: 72 },
    { id: 5, name: 'Dr. Meena Iyer', role: 'Mathematics & Olympiad', subjects: ['Mathematics', 'Olympiad'], classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'], rating: 4.5, reviews: 34, hourlyRate: 550, mode: 'offline', experience: 4, verified: true, location: 'Chennai', image: 'MI', distance: 15.0, languages: ['English', 'Tamil', 'Hindi'], profileCompleteness: 82 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/" className="font-display font-bold text-xl text-primary-600 shrink-0">TC</Link>
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects, classes, or tutor names..."
              className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-primary-500/20 text-sm"
            />
          </div>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="btn-secondary shrink-0">
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
          </button>
          <div className="hidden sm:flex bg-gray-100 rounded-xl p-0.5 shrink-0">
            <button onClick={() => setViewMode('list')} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}>List</button>
            <button onClick={() => setViewMode('map')} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', viewMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}>Map</button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={cn('w-72 shrink-0', isFilterOpen ? 'block' : 'hidden lg:block')}>
            <div className="card p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-gray-900">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="lg:hidden"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'English', 'Python', 'Web Development', 'JEE', 'NEET', 'Coding'].map(s => (
                      <button key={s} onClick={() => setSelectedSubject(s === selectedSubject ? '' : s)} className={cn('px-2.5 py-1 rounded-lg text-xs border transition-all', selectedSubject === s ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300')}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Class / Exam</h4>
                  <div className="flex flex-wrap gap-2">
                    {CLASS_LEVELS.slice(0, 10).map(cls => (
                      <button key={cls} onClick={() => setSelectedClass(cls === selectedClass ? '' : cls)} className={cn('px-2.5 py-1 rounded-lg text-xs border transition-all', selectedClass === cls ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300')}>{cls}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Teaching Mode</h4>
                  <div className="flex gap-2">
                    {['online', 'offline', 'hybrid'].map(m => (
                      <button key={m} onClick={() => setSelectedMode(m)} className={cn('flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center', selectedMode === m ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300')}>{m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">Find Your Tutor</h1>
              <p className="text-sm text-gray-500">{tutors.length} results found</p>
            </div>

            <div className={cn('grid gap-4', viewMode === 'map' ? 'hidden' : 'block')}>
              {tutors.map(tutor => (
                <Link key={tutor.id} href={`/tutor/${tutor.id}`} className="card hover:shadow-card-hover transition-all group">
                  <div className="flex gap-5 p-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-xl shrink-0 shadow-sm">
                      {tutor.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{tutor.name}</h3>
                          <p className="text-sm text-gray-600">{tutor.role}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-bold text-gray-900">₹{tutor.hourlyRate}</span>
                          <span className="text-sm text-gray-500">/hr</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-gray-900">{tutor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">({tutor.reviews} reviews)</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-500">{tutor.experience} yrs exp.</span>
                        {tutor.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tutor.subjects.map(s => (
                          <span key={s} className="badge badge-gray">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {tutor.location}</span>
                        <span>{tutor.distance} km away</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {viewMode === 'map' && (
              <div className="card p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-500">Interactive map with tutor pins coming soon. Switch back to list view for now.</p>
                <button onClick={() => setViewMode('list')} className="btn-primary mt-4">Back to List</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}