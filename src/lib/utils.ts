import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
  'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
  'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh',
  'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon',
  'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar',
  'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner',
  'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Kochi',
  'Udaipur', 'Bhavnagar', 'Dehradun', 'Asansol', 'Nanded-Waghala', 'Kolhapur',
  'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni',
  'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj',
  'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon',
  'Gaya', 'Jalgaon', 'Udupi', 'Maheshtala', 'Kurnool', 'Rajpur Sonarpur',
  'Bokaro', 'South Dumdum', 'Bellary', 'Patiala', 'Gopalpur', 'Agartala',
  'Bhagalpur', 'Muzaffarnagar', 'Panipat', 'Durgapur', 'Rohtak', 'Hisar',
  'Korba', 'Bhilwara', 'Brahmapur', 'Junagadh', 'Madhavaram', 'Satara',
  'Bhusawal', 'Kolar', 'Bidhan Nagar', 'Kulti', 'Rampur', 'Shillong',
  'Ambarnath', 'English Bazar', 'Hospet', 'Moga', 'Nadiad', 'Murliganj',
  'Nagda', 'Naihati', 'Palwal', 'Pilibhit', 'Rewa', 'Saharsa',
  'Samastipur', 'Sambalpur', 'Sasaram', 'Satna', 'Sawai Madhopur', 'Siddipet',
  'Silchar', 'Sirsa', 'Sitamarhi', 'Siwan', 'Sonepur', 'Srikakulam',
  'Sultanpur', 'Surendranagar Dudhrej', 'Tadepalligudem', 'Tadipatri', 'Tamar',
  'Tanda', 'Tapi', 'Tarn Taran', 'Tenkasi', 'Thanjavur', 'Theni',
  'Thiruvalla', 'Thiruvananthapuram', 'Thiruvarur', 'Thoothukudi', 'Tikamgarh',
  'Tinsukia', 'Tirupati', 'Tirupur', 'Tirur', 'Titagarh', 'Tumkur',
  'Udaipur', 'Udgir', 'Udupi', 'Ujjain', 'Uluberia', 'Unnao',
  'Vadodara', 'Valsad', 'Vaniyambadi', 'Vapi', 'Varanasi', 'Vellore',
  'Veraval', 'Vidisha', 'Vijayawada', 'Vikarabad', 'Viluppuram', 'Virudhunagar',
  'Visakhapatnam', 'Vizianagaram', 'Wadhwan', 'Warangal', 'Wardha', 'Warora',
  'Warud', 'Washim', 'Wokha', 'Yadgir', 'Yamunanagar', 'Yanam',
  'Yavatmal', 'Yellandu', 'Yemmiganur', 'Yerraguntla', 'Zahirabad', 'Zamania',
  'Zirakpur', 'Zunheboto',
]

export const CLASS_LEVELS = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
  'JEE Main', 'JEE Advanced', 'NEET', 'CUET',
  'Olympiad', 'NTSE', 'KVPY', 'Foundation',
  'Commerce (B.Com)', 'CA Foundation', 'CS Foundation', 'CMA Foundation',
  'Humanities', 'UPSC', 'State PSC', 'SSC', 'Banking', 'Railway',
  'Coding', 'Python', 'JavaScript', 'Web Development', 'App Development',
  'Languages', 'English', 'Hindi', 'Sanskrit', 'French', 'German', 'Spanish',
  'Music', 'Guitar', 'Piano', 'Violin', 'Vocals', 'Tabla',
  'Dance', 'Art & Craft', 'Sports', 'Yoga', 'Fitness',
]

export const SUBJECT_CATEGORIES = [
  { value: 'academic', label: 'Academic (School)' },
  { value: 'competitive', label: 'Competitive Exams' },
  { value: 'extracurricular', label: 'Extracurricular' },
  { value: 'language', label: 'Languages' },
]

export const TEACHING_MODES = [
  { value: 'online', label: 'Online Only' },
  { value: 'offline', label: 'Offline Only' },
  { value: 'hybrid', label: 'Hybrid (Both)' },
]

export const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
  'Urdu', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Odia',
  'Assamese', 'Maithili', 'Santali', 'Kashmiri', 'Nepali', 'Sanskrit',
  'French', 'German', 'Spanish', 'Japanese', 'Chinese', 'Korean',
]

export const VERIFICATION_STATUSES = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
]

export const BOOKING_STATUSES = [
  { value: 'requested', label: 'Requested' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'demo_requested', label: 'Demo Requested' },
  { value: 'demo_scheduled', label: 'Demo Scheduled' },
  { value: 'demo_completed', label: 'Demo Completed' },
]

export const REPORT_TYPES = [
  { value: 'fake_profile', label: 'Fake Profile' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'no_show', label: 'No Show' },
  { value: 'inappropriate', label: 'Inappropriate Behavior' },
  { value: 'other', label: 'Other' },
]