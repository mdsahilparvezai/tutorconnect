'use client'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function AIMatchingPage() {
  const matches = [
    { tutor: 'Dr. Priya Sharma', match: 97, subjects: ['Physics', 'Math'], reason: 'Exact subject + same class level + budget match' },
    { tutor: 'Anjali Mehta', match: 89, subjects: ['English', 'Writing'], reason: 'Language preference + hybrid mode' },
    { tutor: 'Rohit Verma', match: 82, subjects: ['JEE', 'Physics'], reason: 'Competitive exam + experienced' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4"><Sparkles className="w-8 h-8 text-white" /></div>
          <h1 className="font-display text-3xl font-bold text-gray-900">AI Tutor Matching</h1>
          <p className="text-gray-600 mt-2">Based on your profile and preferences, here are your best matches.</p>
        </div>
        <div className="space-y-4">
          {matches.map((m) => (
            <div key={m.tutor} className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-sm">{m.tutor.split(' ').map(n=>n[0]).join('')}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1"><h3 className="font-display font-bold text-lg">{m.tutor}</h3><span className="badge badge-primary">{m.match}% Match</span></div>
                <p className="text-xs text-gray-500 mb-1">{m.subjects.join(', ')}</p>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
              <Link href={`/tutor/1`} className="btn-primary text-sm shrink-0">View Profile <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}