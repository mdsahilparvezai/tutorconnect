'use client'
import { useState } from 'react'
import { Gift, Copy, Check, Users, IndianRupee, Share2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'SAHILTC2026'
  const referralLink = 'https://tutorconnect.app/?ref=SAHILTC2026'

  const copy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { icon: Users, label: 'Total Referrals', value: 8 },
    { icon: IndianRupee, label: 'Credits Earned', value: '₹2,000' },
    { icon: Sparkles, label: 'Pending Rewards', value: '₹500' },
  ]

  const referrals = [
    { name: 'Rahul Kumar', status: 'Joined', reward: '₹250', date: 'Sep 2, 2026' },
    { name: 'Sneha Patel', status: 'Booked', reward: '₹250', date: 'Aug 28, 2026' },
    { name: 'Aditya Verma', status: 'Completed', reward: '₹500', date: 'Aug 15, 2026' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mx-auto mb-4"><Gift className="w-8 h-8 text-white" /></div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Refer & Earn ₹500 Each</h1>
          <p className="text-gray-600 mt-2">Invite friends to TutorConnect. Get ₹500 credits when they complete their first booking.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="card p-4 text-center">
              <s.icon className="w-5 h-5 text-primary-600 mx-auto mb-2" />
              <div className="font-display text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Referral Code Card */}
        <div className="card p-6 mb-8">
          <h3 className="font-display font-semibold text-gray-900 mb-4">Your Referral Code</h3>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 mb-4">
            <code className="flex-1 font-mono text-lg font-bold text-primary-600 tracking-widest">{referralCode}</code>
            <button onClick={copy} className="btn-primary text-sm shrink-0">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}</button>
          </div>
          <button onClick={copy} className="btn-secondary w-full"><Share2 className="w-4 h-4 mr-2" /> Share Link</button>
          <p className="text-xs text-gray-500 mt-3 text-center">{referralLink}</p>
        </div>

        {/* Referral History */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-display font-semibold text-gray-900">Your Referrals</h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {referrals.map((r, i) => (
                <tr key={i} className={`border-b border-gray-50 last:border-0 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                  <td className="p-4">
                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-xs">{r.name.split(' ').map(n=>n[0]).join('')}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{r.name}</td>
                  <td className="p-4"><span className={`badge ${r.status === 'Completed' ? 'badge-success' : r.status === 'Booked' ? 'badge-primary' : 'badge-gray'}`}>{r.status}</span></td>
                  <td className="p-4 text-right font-semibold text-green-600">{r.reward}</td>
                  <td className="p-4 text-right text-xs text-gray-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}