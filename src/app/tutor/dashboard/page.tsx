'use client'
import Link from 'next/link'
import { LayoutDashboard, CalendarDays, Wallet, UserCheck, Star, Clock, Users, IndianRupee, MessageSquare, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function TutorDashboard() {
  const [tab, setTab] = useState<'overview' | 'leads' | 'calendar' | 'earnings'>('overview')

  const tabs = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'leads', label: 'Leads & Requests', icon: MessageSquare },
    { key: 'calendar', label: 'Calendar', icon: CalendarDays },
    { key: 'earnings', label: 'Earnings', icon: Wallet },
  ]

  const statCards = [
    { label: 'Profile Views', value: '1,240', change: '+12%', icon: Eye },
    { label: 'Total Leads', value: '48', change: '+8 this week', icon: Users },
    { label: 'Response Rate', value: '98%', change: 'Excellent', icon: TrendingUp },
    { label: 'Completed Sessions', value: '86', change: '+5 this month', icon: UserCheck },
  ]

  const leads = [
    { student: 'Rohan Gupta', subject: 'Physics', level: 'Class 12 / JEE', mode: 'Online', rate: 800, time: '2 hours ago', status: 'New' },
    { student: 'Ishita Rao', subject: 'Mathematics', level: 'Class 10', mode: 'Offline', rate: 700, time: 'Yesterday', status: 'Contacted' },
    { student: 'Aarav Shah', subject: 'JEE Main', level: 'JEE', mode: 'Online', rate: 850, time: '2 days ago', status: 'Interested' },
  ]

  const earnings = [
    { subject: 'Physics — Demo', date: 'Sep 5', amount: 800, status: 'Completed' },
    { subject: 'Mathematics — Session', date: 'Sep 4', amount: 700, status: 'Completed' },
    { subject: 'JEE Advanced — Batch', date: 'Sep 3', amount: 1500, status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 hidden md:block">
        <div className="p-5">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary-600">
            <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">TC</span>
            TutorConnect
          </Link>
        </div>
        <nav className="px-3 space-y-1 mt-4">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === t.key ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <t.icon className="w-5 h-5" /> {t.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="card p-4 bg-gradient-to-br from-primary-600 to-primary-700">
            <p className="text-white text-sm font-medium mb-1">Profile Completeness</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full"><div className="h-full w-[95%] bg-white rounded-full" /></div>
              <span className="text-white text-xs font-bold">95%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900">{tab === 'overview' ? 'Welcome back, Priya!' : tabs.find(t => t.key === tab)?.label}</h1>
              <p className="text-sm text-gray-500 hidden sm:block">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            <button className="btn-primary text-sm">Add Availability</button>
          </div>
        </header>

        <main className="p-6">
          {tab === 'overview' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((s, i) => (
                  <div key={i} className="card p-5">
                    <s.icon className="w-5 h-5 text-primary-600 mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className="text-xs text-green-600 mt-1">{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-gray-900">Recent Leads</h3>
                    <button onClick={() => setTab('leads')} className="text-xs text-primary-600">View all</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {leads.map((l, i) => (
                      <div key={i} className="px-5 py-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">{l.student.split(' ').map(n=>n[0]).join('')}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{l.student}</p>
                          <p className="text-xs text-gray-500">{l.subject} • {l.level} • {l.mode}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="badge badge-primary text-xs">{l.status}</span>
                          <p className="text-xs text-gray-400 mt-1">{l.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-gray-900">This Month</h3>
                    <span className="badge badge-success">+₹5,400</span>
                  </div>
                  <div className="p-5">
                    {[
                      { label: 'Total Earnings', value: '₹18,400', pct: 80 },
                      { label: 'Sessions Completed', value: '22', pct: 60 },
                      { label: 'New Bookings', value: '9', pct: 45 },
                    ].map((r, i) => (
                      <div key={i} className="mb-5 last:mb-0">
                        <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{r.label}</span><span className="font-semibold text-gray-900">{r.value}</span></div>
                        <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-primary-600 rounded-full" style={{ width: `${r.pct}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'leads' && (
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-display font-semibold text-gray-900">All Leads</h3></div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                  <tr><th className="p-3">Student</th><th className="p-3">Subject</th><th className="p-3">Level</th><th className="p-3">Mode</th><th className="p-3">Requested Rate</th><th className="p-3">Actions</th></tr>
                </thead>
                <tbody>
                  {leads.map((l, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="p-3 font-medium text-gray-900">{l.student}</td>
                      <td className="p-3">{l.subject}</td>
                      <td className="p-3">{l.level}</td>
                      <td className="p-3">{l.mode}</td>
                      <td className="p-3 font-semibold">₹{l.rate}</td>
                      <td className="p-3">
                        <button className="btn-primary text-xs px-3 py-1.5">Accept</button>
                        <button className="btn-secondary text-xs px-3 py-1.5 ml-2">Chat</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'calendar' && (
            <div className="card p-6">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {['Today 10:00 AM — Physics • Rohan Gupta', 'Today 04:00 PM — Mathematics • Ishita Rao', 'Tomorrow 11:00 AM — JEE • Aarav Shah'].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-primary-600" /><span className="text-sm text-gray-800">{s}</span></div>
                    <span className="badge badge-success text-xs">Confirmed</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'earnings' && (
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-display font-semibold text-gray-900">Earnings History</h3>
                <span className="badge badge-success">Balance: ₹25,800</span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {earnings.map((e, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="p-4"><IndianRupee className="w-4 h-4 inline text-primary-600 mr-2" /><span className="font-medium text-gray-900">{e.subject}</span></td>
                      <td className="p-4 text-gray-500">{e.date}</td>
                      <td className="p-4 text-right font-semibold text-green-600">+₹{e.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

import { Eye } from 'lucide-react'