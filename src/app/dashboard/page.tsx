'use client'
import Link from 'next/link'
import { BookOpen, CalendarDays, Star, MessageSquare, Search, IndianRupee, CheckCircle, Clock } from 'lucide-react'

export default function StudentDashboard() {
  const upcoming = [
    { tutor: 'Dr. Priya Sharma', subject: 'Physics', date: 'Today, 4:00 PM', mode: 'Online', status: 'Confirmed' },
    { tutor: 'Anjali Mehta', subject: 'English', date: 'Tomorrow, 11:00 AM', mode: 'Hybrid', status: 'Confirmed' },
  ]

  const recent = [
    { tutor: 'Rohit Verma', subject: 'Math', date: 'Sep 2', rating: 5, hours: 1 },
    { tutor: 'Dr. Meena Iyer', subject: 'Chemistry', date: 'Aug 28', rating: 4, hours: 1 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary-600">
            <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">TC</span>
            TutorConnect
          </Link>
          <Link href="/search" className="btn-primary text-sm"><Search className="w-4 h-4 mr-1" /> Find Tutors</Link>
        </div>
      </header>

      <div className="container-custom py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
        <p className="text-gray-600 mb-8">Track your lessons, messages, and tutor matches.</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Active Subjects', value: '4' },
            { icon: CalendarDays, label: 'Sessions This Month', value: '12' },
            { icon: Star, label: 'Hours Learned', value: '48' },
            { icon: IndianRupee, label: 'Total Spent', value: '₹8,400' },
          ].map((s, i) => (
            <div key={i} className="card p-5">
              <s.icon className="w-5 h-5 text-primary-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display font-semibold text-gray-900">Upcoming Sessions</h3>
              <Link href="#" className="text-xs text-primary-600">View calendar</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {upcoming.map((s, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-sm">{s.tutor.split(' ').slice(0,2).map(n=>n[0]).join('')}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{s.subject} with {s.tutor}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{s.date} • {s.mode}</p>
                  </div>
                  <span className="badge badge-success text-xs shrink-0">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="card">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-display font-semibold text-gray-900">Recent Sessions & Reviews</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recent.map((r, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{r.subject}</p>
                    <p className="text-xs text-gray-500">{r.tutor} • {r.date} • {r.hours}hr</p>
                  </div>
                  <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />)}</div>
                  <button className="btn-secondary text-xs px-3 py-1.5 shrink-0">Rate</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Match CTA */}
        <div className="card mt-6 p-6 bg-gradient-to-r from-primary-50 to-accent-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900">Your AI Tutor Matches are ready!</h3>
              <p className="text-sm text-gray-600 mt-1">Based on your profile, we found 5 tutors that perfectly match your needs.</p>
            </div>
            <Link href="/ai-match" className="btn-primary shrink-0">View Matches</Link>
          </div>
        </div>
      </div>
    </div>
  )
}