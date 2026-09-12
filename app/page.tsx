import Link from 'next/link'
import { Calendar, Users, Shield, Heart, MessageSquare, Star } from 'lucide-react'
import GeometricShapes from '@/components/GeometricShapes'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-surface-canvas-white py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-600 mb-4">
              Abhivyakti
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-2">
              A safe space for expression and confidence
            </p>
            <div className="inline-flex items-center space-x-2 bg-secondary-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-secondary-600" />
              <span className="text-sm font-medium text-secondary-700">3 Years of Continuous Cultural Expression</span>
            </div>
          </div>

          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join our community where children and people of all ages share their cultural talents through 
            recorded performances. Reduce stage fear, build confidence, and celebrate creativity in a 
            safe, supportive environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <WhatsAppButton />
            <Link href="/submit" className="btn-secondary">
              Submit Performance
            </Link>
          </div>

          {/* Weekly Event Banner */}
          <div className="card max-w-md mx-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-6 h-6" />
              <span className="font-semibold">Next Event</span>
            </div>
            <p className="text-primary-100 mb-3">Every Sunday at 7:00 PM</p>
            <Link href="/schedule" className="inline-block bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              View Schedule
            </Link>
          </div>
        </div>

        {/* Geometric Background Elements */}
        <GeometricShapes />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-surface-soft-paper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
              Why Choose Abhivyakti?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A thoughtfully designed platform that puts safety, creativity, and community first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Child-Safe Environment"
              description="Strict moderation, parental consent, and privacy controls ensure a secure space for young performers."
              color="bg-primary-100 text-primary-600"
            />
            <FeatureCard
              icon={Heart}
              title="Confidence Building"
              description="Reduce stage fear through supportive feedback and a non-judgmental community atmosphere."
              color="bg-secondary-100 text-secondary-600"
            />
            <FeatureCard
              icon={Users}
              title="Cultural Preservation"
              description="Celebrate and preserve diverse cultural talents across music, poetry, storytelling, and more."
              color="bg-accent-creative-purple/10 text-accent-creative-purple"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Constructive Feedback"
              description="Receive encouraging, growth-focused feedback from community members and mentors."
              color="bg-secondary-100 text-secondary-600"
            />
            <FeatureCard
              icon={Calendar}
              title="Regular Events"
              description="Weekly Sunday gatherings create consistent opportunities for expression and growth."
              color="bg-accent-joyful-yellow/10 text-accent-joyful-yellow"
            />
            <FeatureCard
              icon={Star}
              title="All Ages Welcome"
              description="A multi-generational community where everyone can learn from and inspire each other."
              color="bg-accent-cultural-pink/10 text-accent-cultural-pink"
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-surface-quiet-mist">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-8">
            Our Mission
          </h2>
          <div className="card bg-surface-soft-paper backdrop-blur-sm">
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Abhivyakti exists to create a nurturing digital space where cultural expression flourishes 
              without fear. We believe every voice deserves to be heard, every talent deserves recognition, 
              and every performer deserves a supportive community to grow within.
            </p>
            <p className="text-neutral-600">
              Through weekly gatherings and continuous encouragement, we're building confidence, 
              preserving culture, and fostering creativity across generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  )
}