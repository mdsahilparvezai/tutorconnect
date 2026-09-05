'use client'
import { Star, Check, Minus } from 'lucide-react'

export default function ComparePage() {
  const tutors = [
    { name: 'Dr. Priya Sharma', rating: 4.8, price: 800, exp: 8, mode: 'Online', classes: '11-12, JEE', verified: true },
    { name: 'Rohit Verma', rating: 4.6, price: 600, exp: 5, mode: 'Offline', classes: '11-12, JEE', verified: true },
    { name: 'Anjali Mehta', rating: 4.9, price: 700, exp: 12, mode: 'Hybrid', classes: '9-12', verified: true },
  ]
  const rows = [
    { label: 'Rating', render: (t: any) => <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{t.rating}</span> },
    { label: 'Hourly Rate', render: (t: any) => <strong>₹{t.price}/hr</strong> },
    { label: 'Experience', render: (t: any) => `${t.exp} years` },
    { label: 'Teaching Mode', render: (t: any) => t.mode },
    { label: 'Classes', render: (t: any) => t.classes },
    { label: 'Verified', render: (t: any) => t.verified ? <Check className="w-4 h-4 text-green-600" /> : <Minus className="w-4 h-4 text-gray-400" /> },
  ]
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-gray-900 text-center mb-8">Compare Tutors</h1>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 text-left text-gray-500 font-medium">Feature</th>
                {tutors.map(t => (
                  <th key={t.name} className="p-4 text-center font-display font-semibold text-gray-900">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={`${i % 2 ? 'bg-gray-50' : ''} border-b border-gray-100 last:border-0`}>
                  <td className="p-4 text-gray-500">{r.label}</td>
                  {tutors.map(t => (
                    <td key={t.name} className="p-4 text-center">{r.render(t)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}