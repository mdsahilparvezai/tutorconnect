'use client'
import Link from 'next/link'
import { ShieldCheck, Flag, Users, FileCheck, MessageSquare, Check, X, Eye, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboard() {
  const [tab, setTab] = useState<'verifications' | 'reports' | 'users' | 'health'>('verifications')

  const pendingVerifications = [
    { tutor: 'Karan Singh', qualification: 'B.Tech CSE, NIT Delhi', subject: 'Coding', submitted: '2 hrs ago', status: 'pending' },
    { tutor: 'Shalini Rao', qualification: 'M.A. English, DU', subject: 'English', submitted: '5 hrs ago', status: 'pending' },
    { tutor: 'Vikram Joshi', qualification: 'B.Sc. Chemistry, Pune', subject: 'Chemistry', submitted: 'Yesterday', status: 'pending' },
  ]

  const reports = [
    { reporter: 'Rohan G.', reported: 'Tutor XYZ', type: 'No Show', desc: 'Tutor missed 3 scheduled sessions without notice.', status: 'investigating', time: '1 hr ago' },
    { reporter: 'Ishita R.', reported: 'Tutor ABC', type: 'Fake Profile', desc: 'Profile claims IIT PhD but uploaded unrelated certificate.', status: 'pending', time: '3 hrs ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-900 text-white hidden md:block z-40">
        <div className="p-5">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-sm">TC</span> Admin
          </div>
        </div>
        <nav className="px-3 space-y-1">
          {[
            { key: 'verifications', label: 'Verifications', icon: FileCheck, count: 3 },
            { key: 'reports', label: 'Reports', icon: Flag, count: 2 },
            { key: 'users', label: 'Users', icon: Users, count: null },
            { key: 'health', label: 'Platform Health', icon: ShieldCheck, count: null },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === t.key ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <t.icon className="w-5 h-5" /> {t.label}
              {t.count && <span className="ml-auto bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">{t.count}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-6 py-4">
          <h1 className="font-display text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage platform safety and health</p>
        </header>

        <main className="p-6">
          {tab === 'verifications' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[{ label: 'Pending Review', value: 3 }, { label: 'Approved this week', value: 12 }, { label: 'Rejected this week', value: 2 }].map((s, i) => (
                  <div key={i} className="card p-5"><div className="text-2xl font-bold text-gray-900">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div></div>
                ))}
              </div>
              {pendingVerifications.map((v, i) => (
                <div key={i} className="card p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold">{v.tutor.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><p className="font-semibold text-gray-900">{v.tutor}</p><span className="badge badge-primary text-xs">{v.subject}</span></div>
                    <p className="text-sm text-gray-600 mt-1">{v.qualification}</p>
                    <p className="text-xs text-gray-400 mt-1">Submitted {v.submitted}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="btn-primary text-xs px-3 py-2"><Eye className="w-3 h-3 mr-1 inline" />Review</button>
                    <button className="btn-secondary text-xs px-3 py-2"><Check className="w-3 h-3 mr-1 inline text-green-600" />Approve</button>
                    <button className="btn-secondary text-xs px-3 py-2"><X className="w-3 h-3 mr-1 inline text-red-500" />Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'reports' && (
            <div className="space-y-4">
              {reports.map((r, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.type === 'Fake Profile' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}><AlertTriangle className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2"><p className="font-semibold text-gray-900">{r.reported}</p><span className="badge badge-danger text-xs">{r.type}</span></div>
                      <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">Reported by {r.reporter} • {r.time}</p>
                    </div>
                    <span className={`badge text-xs ${r.status === 'investigating' ? 'badge-warning' : 'badge-gray'}`}>{r.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-primary text-xs px-4 py-2">Investigate</button>
                    <button className="btn-secondary text-xs px-4 py-2">Contact User</button>
                    <button className="btn-ghost text-xs px-4 py-2 text-red-500">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'users' && (
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-display font-semibold text-gray-900">Platform Users</h3></div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                  <tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Location</th><th className="p-3">Joined</th><th className="p-3">Status</th></tr>
                </thead>
                <tbody>
                  {[['Dr. Priya Sharma','Tutor','Mumbai','Jan 2026','Active'], ['Rohan Gupta','Student','Delhi','Feb 2026','Active'], ['Karan Singh','Tutor','Gurgaon','Mar 2026','Pending Verification']].map((u, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="p-3 font-medium text-gray-900">{u[0]}</td><td className="p-3">{u[1]}</td><td className="p-3">{u[2]}</td><td className="p-3 text-gray-500">{u[3]}</td>
                      <td className="p-3"><span className={`badge ${u[4] === 'Active' ? 'badge-success' : 'badge-warning'}`}>{u[4]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'health' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[{ label: 'Total Users', value: '2,450' }, { label: 'Active Tutors', value: '520' }, { label: 'Bookings/Month', value: '1,380' }, { label: 'Avg. Response', value: '2.5 hrs' }].map((s, i) => (
                <div key={i} className="card p-6"><div className="text-3xl font-bold text-gray-900">{s.value}</div><div className="text-sm text-gray-500 mt-1">{s.label}</div></div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}