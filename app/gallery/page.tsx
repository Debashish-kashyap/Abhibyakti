import { Search, Filter, Calendar, Music, BookOpen, Mic, Drama, Play, Heart, Eye } from 'lucide-react'

export default function GalleryPage() {
  // Performances will be loaded from your backend/CMS
  const performances: any[] = []

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Poetry': return BookOpen
      case 'Storytelling': return Mic
      case 'Music': return Music
      case 'Acting': return Drama
      default: return Mic
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Poetry': return 'bg-accent-purple/10 text-accent-purple'
      case 'Storytelling': return 'bg-accent-green/10 text-accent-green'
      case 'Music': return 'bg-accent-pink/10 text-accent-pink'
      case 'Acting': return 'bg-accent-yellow/10 text-accent-yellow'
      default: return 'bg-neutral-100 text-neutral-600'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Performance Gallery
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Celebrate creativity and be inspired by our community's amazing performances
          </p>
        </div>

        {/* Inspiration Mode Banner */}
        <div className="card bg-gradient-to-r from-accent-green/10 to-accent-green/5 border-accent-green/20 mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <Heart className="w-6 h-6 text-accent-green" />
            <h2 className="text-lg font-semibold text-neutral-800">Inspiration Mode</h2>
          </div>
          <p className="text-neutral-600 mb-4">
            Browse safely curated performances to spark your creativity. All content is child-friendly and community-approved.
          </p>
          <button className="btn-secondary text-sm">
            Enable Safe Browsing
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search performances..."
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>All Categories</option>
              <option>Poetry</option>
              <option>Music</option>
              <option>Storytelling</option>
              <option>Acting</option>
            </select>
            
            <select className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Latest First</option>
              <option>Most Popular</option>
              <option>Most Liked</option>
            </select>
          </div>
        </div>

        {/* Featured Performances */}
        {performances.filter(p => p.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Featured Performances</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {performances.filter(p => p.featured).map((performance) => (
                <FeaturedPerformanceCard key={performance.id} performance={performance} getCategoryIcon={getCategoryIcon} getCategoryColor={getCategoryColor} />
              ))}
            </div>
          </div>
        )}

        {/* All Performances */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">
            {performances.length > 0 ? 'All Performances' : 'Performance Gallery'}
          </h2>
          {performances.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performances.map((performance) => (
                <PerformanceCard key={performance.id} performance={performance} getCategoryIcon={getCategoryIcon} getCategoryColor={getCategoryColor} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <Music className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">No Performances Yet</h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                The gallery is waiting for amazing performances from our community members. 
                Be the first to share your talent!
              </p>
              <a href="/submit" className="btn-primary">
                Submit First Performance
              </a>
            </div>
          )}
        </div>

        {/* Load More */}
        {performances.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Performances
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface Performance {
  id: number
  title: string
  performer: string
  category: string
  date: string
  duration: string
  likes: number
  views: number
  thumbnail: string
  featured: boolean
}

interface PerformanceCardProps {
  performance: Performance
  getCategoryIcon: (category: string) => React.ElementType
  getCategoryColor: (category: string) => string
}

function PerformanceCard({ performance, getCategoryIcon, getCategoryColor }: PerformanceCardProps) {
  const Icon = getCategoryIcon(performance.category)
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
      <div className="relative aspect-video bg-neutral-100 rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-neutral-400" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {performance.duration}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
            {performance.title}
          </h3>
          <p className="text-sm text-neutral-600">by {performance.performer}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(performance.category)}`}>
            {performance.category}
          </span>
          <span className="text-xs text-neutral-500">
            {new Date(performance.date).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{performance.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{performance.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedPerformanceCard({ performance, getCategoryIcon, getCategoryColor }: PerformanceCardProps) {
  const Icon = getCategoryIcon(performance.category)
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 group cursor-pointer bg-gradient-to-br from-primary-50 to-white border-primary-200">
      <div className="flex items-start space-x-2 mb-3">
        <span className="bg-accent-yellow text-accent-yellow bg-opacity-20 px-2 py-1 rounded-full text-xs font-medium">
          Featured
        </span>
      </div>
      
      <div className="relative aspect-video bg-neutral-100 rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-12 h-12 text-neutral-400" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
          {performance.duration}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
            {performance.title}
          </h3>
          <p className="text-neutral-600">by {performance.performer}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(performance.category)}`}>
            {performance.category}
          </span>
          <span className="text-sm text-neutral-500">
            {new Date(performance.date).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-neutral-600">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span className="font-medium">{performance.likes} likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span className="font-medium">{performance.views} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}