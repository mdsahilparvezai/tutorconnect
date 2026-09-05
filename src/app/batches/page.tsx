'use client'
import { Users, TrendingUp, CalendarDays, Wallet, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function BatchesPage() {
  const [tab, setTab] = useState<'browse' | 'create'>('browse')

  const batches = [
    { name: 'JEE Advanced 2027 — Physics Intensive', tutor: 'Dr. Priya Sharma', subject: 'Physics', size: 12, max: 20, price: 1500, sessionsPerMonth: 12, level: 'JEE Advanced' },
    { name: 'NEET Bio Weekly Batch', tutor: 'Dr. Meena Iyer', subject: 'Biology', size: 8, max: 15, price: 1200, sessionsPerMonth: 8, level: 'NEET' },
    { name: 'Python for Beginners (Coding Club)', tutor: 'Karan Singh', subject: 'Coding', size: 15, max: 25, price: 1000, sessionsPerMonth: 8, level: 'Class 8-12' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Group Tuition & Batch Classes</h1>
            <p className="text-gray-600 mt-2">Learn together. Save more. Groups get up to 50% off hourly rates.</p>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            <button onClick={() => setTab('browse')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'browse' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Browse</button>
            <button onClick={() => setTab('create')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'create' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Create</button>
          </div>
        </div>

        {tab === 'browse' ? (
          <div className="space-y-4">
            {batches.map(b => (
              <div key={b.name} className="card p-6 flex items-start gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge badge-primary">{b.level}</span>
                    <span className="badge badge-gray">{b.subject}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{b.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">by <span className="font-medium text-gray-900">{b.tutor}</span></p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {b.size}/{b.max} students</span>
                    <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {b.sessionsPerMonth} sessions/month</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Group discount applied</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-gray-900 mb-1">₹{b.price}</div>
                  <div className="text-xs text-gray-500 mb-3">/month</div>
                  <Link href="/book/1" className="btn-primary text-sm">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 max-w-xl mx-auto">
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Create a Batch Class</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Batch Name</label>
                <input className="input" placeholder="e.g., JEE 2027 Physics Intensive" />
              </div>
              <div>
                <label className="label">Subject</label>
                <select className="input"><option>Physics</option><option>Mathematics</option><option>Chemistry</option><option>Coding</option><option>Languages</option></select>
              </div>
              <div>
                <label className="label">Max Students</label>
                <input type="number" className="input" placeholder="20" defaultValue={20} />
              </div>
              <div>
                <label className="label">Sessions per Month</label>
                <input type="number" className="input" placeholder="8" defaultValue={8} />
              </div>
              <div>
                <label className="label">Monthly Price per Student (₹)</label>
                <input type="number" className="input" placeholder="1500" defaultValue={1500} />
              </div>
              <button className="btn-primary w-full">Launch Batch</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}