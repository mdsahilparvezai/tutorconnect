'use client'

import { useState } from 'react'
import { CheckCircle, CalendarDays, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BookingConfirmPage({ params }: { params: { id: string } }) {
  const [confirmed, setConfirmed] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="card max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Demo Request Sent!</h1>
        <p className="text-gray-600 mb-6">Dr. Priya Sharma will confirm your demo class shortly. You'll receive a notification once accepted.</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm"><CalendarDays className="w-4 h-4 text-gray-400" /> <span>Monday, Sep 8, 2026 — 10:00 AM</span></div>
          <div className="flex items-center gap-3 text-sm"><Clock className="w-4 h-4 text-gray-400" /> <span>60 minutes • Physics • JEE Level</span></div>
          <div className="flex items-center gap-3 text-sm"><MessageSquare className="w-4 h-4 text-gray-400" /> <span>Chat available</span></div>
        </div>

        <div className="flex gap-3">
          <Link href="/chat" className="btn-primary flex-1">Open Chat</Link>
          <Link href="/search" className="btn-secondary flex-1">Find More</Link>
        </div>
      </div>
    </div>
  )
}