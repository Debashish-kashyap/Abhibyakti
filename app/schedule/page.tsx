import { Calendar, Clock, Users, Mic, BookOpen, Music, Drama } from 'lucide-react'

export default function SchedulePage() {
  // Events will be loaded from your backend/CMS
  const upcomingEvents: any[] = []

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Event Schedule
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join us every Sunday at 7:00 PM for our weekly cultural expression events
          </p>
        </div>

        {/* Current Event Highlight */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-6 h-6" />
                <span className="text-lg font-semibold">This Sunday</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Weekly Community Event</h2>
              <div className="flex items-center space-x-4 text-primary-100">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>7:00 PM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Join us for performances</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-primary-100 mb-2">Submission Deadline</p>
              <p className="text-xl font-bold">Every Friday</p>
              <p className="text-sm text-primary-200">11:59 PM</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.date} event={event} isNext={index === 0} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card text-center mb-12">
            <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Events Coming Soon</h3>
            <p className="text-neutral-600">
              Weekly events will be scheduled here. Check back soon for upcoming themes and submission deadlines.
            </p>
          </div>
        )}

        {/* Guidelines */}
        <div className="card bg-neutral-50">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Event Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-neutral-700 mb-2">Submission Rules</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Submit by Friday 11:59 PM</li>
                <li>• Maximum 5 minutes duration</li>
                <li>• Audio or video format accepted</li>
                <li>• Parental consent required for children</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-neutral-700 mb-2">Event Format</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Sundays at 7:00 PM</li>
                <li>• Community viewing via WhatsApp</li>
                <li>• Positive feedback encouraged</li>
                <li>• All ages welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: {
    date: string
    theme: string
    icon: React.ElementType
    color: string
    submissions: number
    deadline: string
  }
  isNext: boolean
}

function EventCard({ event, isNext }: EventCardProps) {
  const Icon = event.icon
  const eventDate = new Date(event.date)
  const deadlineDate = new Date(event.deadline)
  
  return (
    <div className={`card ${isNext ? 'ring-2 ring-primary-200' : ''} hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${event.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {isNext && (
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
            Next Event
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{event.theme}</h3>
      
      <div className="space-y-2 text-sm text-neutral-600 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>7:00 PM</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{event.submissions} submissions</span>
        </div>
      </div>
      
      <div className="border-t border-neutral-100 pt-3">
        <p className="text-xs text-neutral-500 mb-1">Submission Deadline</p>
        <p className="text-sm font-medium text-neutral-700">
          {deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 11:59 PM
        </p>
      </div>
    </div>
  )
}