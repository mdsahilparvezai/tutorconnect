'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, MapPin, Clock, IndianRupee, CheckCircle, MessageCircle, Calendar, Award, Users, BookOpen, Languages, PlayCircle } from 'lucide-react'

export default function TutorProfilePage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [tab, setTab] = useState<'about' | 'reviews' | 'availability'>('about')

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), value: d.toISOString().split('T')[0], num: d.getDate() }
  })

  const slots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM']

  const reviews = [
    { name: 'Anita R.', rating: 5, comment: 'Excellent teacher! My son\'s grades improved from C to A in 3 months. Very patient and explains concepts clearly.', subject: 'Mathematics', date: '2 weeks ago', avatar: 'AR' },
    { name: 'Vikram S.', rating: 5, comment: 'Best Physics tutor I\'ve had. The way he explains complex topics with real-world examples is amazing.', subject: 'Physics', date: '1 month ago', avatar: 'VS' },
    { name: 'Sneha M.', rating: 4, comment: 'Great teaching style, very organized. Provides good study material and mock tests.', subject: 'JEE Main', date: '2 months ago', avatar: 'SM' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-custom py-4">
          <Link href="/search" className="text-sm text-gray-500 hover:text-primary-600">← Back to search</Link>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-3xl shadow-sm shrink-0">PS</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">Dr. Priya Sharma</h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified Tutor
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Physics & Mathematics Expert • JEE Advanced Mentor</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> <strong className="text-gray-900">4.8</strong> (124 reviews)</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 350+ students</span>
                    <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> 8 yrs exp.</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Mumbai</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="border-b border-gray-100">
                <div className="flex">
                  {['about', 'reviews', 'availability'].map(t => (
                    <button key={t} onClick={() => setTab(t as 'about' | 'reviews' | 'availability')} className={`flex-1 px-4 py-4 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {tab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-2">About Me</h3>
                      <p className="text-gray-600 leading-relaxed">I have 8+ years of experience teaching Physics and Mathematics to students preparing for JEE Main, JEE Advanced, and NEET. I believe in building strong conceptual foundations rather than rote learning. My teaching methodology focuses on problem-solving techniques, visualization of concepts, and regular assessments. I have helped 200+ students crack JEE Advanced with top ranks.</p>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Qualifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600"><BookOpen className="w-4 h-4 text-primary-600" /> M.Sc. Physics, IIT Bombay (2015)</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><Award className="w-4 h-4 text-primary-600" /> B.Sc. (Hons) Physics, Delhi University (2013)</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-primary-600" /> B.Ed. (Bachelor of Education)</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Subjects & Classes</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Physics', 'Mathematics', 'JEE Main', 'JEE Advanced', 'NEET'].map(s => (
                          <span key={s} className="badge badge-primary">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Hindi', 'Marathi'].map(l => (
                          <span key={l} className="badge badge-gray"><Languages className="w-3 h-3 mr-1" />{l}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Teaching Mode</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Online', 'Offline', 'Hybrid'].map(m => (
                          <span key={m} className="badge badge-primary">{m}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary-50 rounded-xl p-4">
                      <h3 className="font-display font-semibold text-gray-900 mb-2 flex items-center gap-2"><PlayCircle className="w-5 h-5 text-primary-600" /> Watch Intro Video</h3>
                      <p className="text-sm text-gray-600">Get to know my teaching style in this 2-minute introduction.</p>
                    </div>
                  </div>
                )}

                {tab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900">4.8</div>
                        <div className="flex items-center justify-center gap-0.5 my-1">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-sm text-gray-500">124 reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[{s: 5, p: 85}, {s: 4, p: 10}, {s: 3, p: 3}, {s: 2, p: 1}, {s: 1, p: 1}].map(r => (
                          <div key={r.s} className="flex items-center gap-2 text-sm">
                            <span className="w-4 text-gray-500">{r.s}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400" style={{width: `${r.p}%`}} />
                            </div>
                            <span className="w-10 text-gray-500">{r.p}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((r, i) => (
                        <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm shrink-0">{r.avatar}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-900">{r.name}</p>
                                <span className="text-xs text-gray-500">{r.date}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />)}</div>
                                <span className="badge badge-gray text-xs">{r.subject}</span>
                              </div>
                              <p className="text-sm text-gray-600">{r.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'availability' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Select Date</h3>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {dates.map(d => (
                          <button key={d.value} onClick={() => setSelectedDate(d.value)} className={`p-3 rounded-xl border-2 transition-all text-center ${selectedDate === d.value ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <p className="text-xs text-gray-500">{d.label}</p>
                            <p className="font-bold text-gray-900">{d.num}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-3">Available Time Slots</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {slots.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)} className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${selectedTime === t ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">₹800<span className="text-lg text-gray-500">/hr</span></div>
                <p className="text-sm text-gray-500">or ₹12,000/month for 16 sessions</p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="btn-primary w-full py-3">
                  <Calendar className="w-4 h-4 mr-2" /> Request Demo Class
                </button>
                <button className="btn-secondary w-full py-3">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat Now
                </button>
              </div>

              <div className="space-y-3 text-sm border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Response Rate</span>
                  <span className="font-semibold text-gray-900">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Avg. Response</span>
                  <span className="font-semibold text-gray-900">2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Profile Views</span>
                  <span className="font-semibold text-gray-900">1,240</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}