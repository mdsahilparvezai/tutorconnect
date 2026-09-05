'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'hi'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<string, { en: string; hi: string }> = {
  tagline: { en: 'Find the Perfect Home Tutor Near You', hi: 'Apne paas ka perfect home tutor dhundhein' },
  subtitle: { en: 'Verified tutors for Class 1-12, JEE, NEET, CUET, Commerce, Coding & more.', hi: 'Class 1-12, JEE, NEET, CUET, Commerce, Coding & zyada ke liye verified tutors.' },
  findMyTutor: { en: 'Find My Tutor', hi: 'Apna Tutor Dhundhein' },
  browse: { en: 'Browse Tutors', hi: 'Tutors Dekhein' },
  howItWorks: { en: 'How It Works', hi: 'Kaise Kaam Karta Hai' },
  subjects: { en: 'Subjects', hi: 'Vishay' },
  whyChoose: { en: 'Why Choose TutorConnect?', hi: 'TutorConnect kyun chunein?' },
  popularSubjects: { en: 'Popular Subjects & Exams', hi: 'Popular Vishay aur Exams' },
}

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (k) => k })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = (key: string) => {
    const item = translations[key]
    if (!item) return key
    return lang === 'en' ? item.en : item.hi
  }
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex bg-gray-100 rounded-xl p-0.5">
      <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lang === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>English</button>
      <button onClick={() => setLang('hi')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lang === 'hi' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>हिंदी</button>
    </div>
  )
}