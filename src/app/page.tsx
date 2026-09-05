import Link from 'next/link'
import { Search, Users, Shield, Star, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react'

const stats = [
  { value: '5000+', label: 'Verified Tutors' },
  { value: '50+', label: 'Subjects Covered' },
  { value: '95%', label: 'Parent Satisfaction' },
  { value: '24h', label: 'Avg. Response Time' },
]

const features = [
  {
    icon: Search,
    title: 'Smart Search & Filters',
    description: 'Find tutors by subject, class, distance, price, rating, and availability. Toggle between map and list views.',
  },
  {
    icon: Users,
    title: 'Verified Profiles',
    description: 'Every tutor undergoes ID and qualification verification. See verified badges, ratings, and detailed reviews.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'In-app chat keeps your contact private until you choose to share. Report system and admin moderation.',
  },
  {
    icon: Star,
    title: 'Demo Classes First',
    description: 'Book a free demo class before committing. Experience the teaching style and decide with confidence.',
  },
  {
    icon: MapPin,
    title: 'Local & Online',
    description: 'Find tutors near you for home tuition or choose online classes. Hybrid options available.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. Tutors manage availability calendars for easy booking.',
  },
]

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'JEE Main/Advanced', 'NEET', 'CUET', 'Commerce', 'Accountancy',
  'Economics', 'Computer Science', 'Python', 'Web Development',
  'Languages', 'Music', 'Art', 'Dance', 'Yoga',
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary-600">
              <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">TC</span>
              TutorConnect
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Find Tutors</Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">How It Works</Link>
              <Link href="/subjects" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Subjects</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block btn-secondary text-sm">Log In</Link>
              <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Now serving 50+ cities across India
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-in">
              Find the Perfect{' '}
              <span className="text-gradient">Home Tutor</span>{' '}
              Near You
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-in" style={{ animationDelay: '100ms' }}>
              Verified tutors for Class 1–12, JEE, NEET, CUET, Commerce, Coding, Languages & more.
              Book a free demo class today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in" style={{ animationDelay: '200ms' }}>
              <Link href="/signup" className="btn-primary w-full sm:w-auto text-base px-8 py-4">
                Find My Tutor
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/search" className="btn-outline w-full sm:w-auto text-base px-8 py-4">
                Browse Tutors
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 animate-in" style={{ animationDelay: '300ms' }}>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No registration fee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Free demo class
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Pay after satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Subjects & Exams
            </h2>
            <p className="text-gray-600">Expert tutors across academic, competitive, and extracurricular categories</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {subjects.map((subject) => (
              <Link
                key={subject}
                href={`/search?subject=${encodeURIComponent(subject)}`}
                className="card p-4 text-center hover:border-primary-200 group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  {subject}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/subjects" className="btn-outline">
              View All Subjects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TutorConnect?
            </h2>
            <p className="text-gray-600">Built for Indian parents and students who value quality, safety, and convenience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card p-6 group">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-gray-50" id="how-it-works">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Three simple steps to start learning</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell Us Your Needs',
                description: 'Select subject, class level, budget, preferred mode (online/offline), and location. We\'ll match you with relevant tutors.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Compare & Connect',
                description: 'View verified tutor profiles with ratings, reviews, qualifications, and intro videos. Chat securely in-app before booking.',
                icon: Users,
              },
              {
                step: '03',
                title: 'Start Learning',
                description: 'Book a free demo class. If satisfied, schedule regular sessions. Track progress with session reports and reviews.',
                icon: CheckCircle,
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-display font-bold text-xl">
                  {step.step}
                </div>
                <div className="card p-8 pt-14 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <div className="card overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 p-8 md:p-12 lg:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Tutor?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students and parents who trust TutorConnect for quality home tuition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="btn bg-white text-primary-600 hover:bg-primary-50 text-base px-8 py-4 w-full sm:w-auto">
                Start Free Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/tutor/signup" className="btn border-2 border-white text-white hover:bg-primary-800 text-base px-8 py-4 w-full sm:w-auto">
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white mb-4">
                <span className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm">TC</span>
                TutorConnect
              </Link>
              <p className="text-sm leading-relaxed">India\'s trusted platform for finding verified home tutors. Quality education, delivered.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Students</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/search" className="hover:text-white transition-colors">Find Tutors</Link></li>
                <li><Link href="/subjects" className="hover:text-white transition-colors">Browse Subjects</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Tutors</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tutor/signup" className="hover:text-white transition-colors">Join as Tutor</Link></li>
                <li><Link href="/tutor/dashboard" className="hover:text-white transition-colors">Tutor Dashboard</Link></li>
                <li><Link href="/tutor/verification" className="hover:text-white transition-colors">Get Verified</Link></li>
                <li><Link href="/tutor/earnings" className="hover:text-white transition-colors">Earnings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 TutorConnect. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}