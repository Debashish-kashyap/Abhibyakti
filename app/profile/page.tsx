import { User, Calendar, Award, Music, BookOpen, Mic, Drama, Eye, EyeOff } from 'lucide-react'

export default function ProfilePage() {
  // User profile will be loaded from authentication/backend
  const userProfile = {
    name: '',
    nickname: '',
    ageGroup: '',
    joinDate: '',
    totalSubmissions: 0,
    categories: [],
    achievements: []
  }

  // User submissions will be loaded from backend
  const submissions: any[] = []

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
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="card mb-8">
          {userProfile.name ? (
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2">
                  <h1 className="text-2xl font-bold text-neutral-800">{userProfile.name}</h1>
                  {userProfile.ageGroup && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                      {userProfile.ageGroup}
                    </span>
                  )}
                </div>
                
                {userProfile.nickname && (
                  <p className="text-lg text-neutral-600 mb-3">"{userProfile.nickname}"</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                  {userProfile.joinDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(userProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{userProfile.totalSubmissions} performances</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-2">Welcome to Abhivyakti!</h2>
              <p className="text-neutral-600">Please sign in to view your profile and submissions.</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Submissions */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">My Performances</h2>
              {submissions.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {submissions.map((submission) => {
                    const Icon = getCategoryIcon(submission.category)
                    return (
                      <div key={submission.id} className="card hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-video bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-neutral-400" />
                        </div>
                        
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-neutral-800 flex-1">{submission.title}</h3>
                          <div className="flex items-center space-x-1 text-neutral-500">
                            {submission.visibility === 'public' ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className={`px-2 py-1 rounded-full ${getCategoryColor(submission.category)}`}>
                            {submission.category}
                          </span>
                          <span className="text-neutral-500">
                            {new Date(submission.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-neutral-100">
                          <p className="text-sm text-neutral-600">
                            {submission.feedback} encouraging feedback received
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <Mic className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">No Performances Yet</h3>
                  <p className="text-neutral-600 mb-4">
                    Ready to share your talent? Submit your first performance and join our community!
                  </p>
                  <a href="/submit" className="btn-primary">
                    Submit Performance
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Talent Categories */}
            {userProfile.categories && userProfile.categories.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">My Talents</h3>
                <div className="space-y-3">
                  {userProfile.categories.map((category) => {
                    const Icon = getCategoryIcon(category)
                    return (
                      <div key={category} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg ${getCategoryColor(category)} flex items-center justify-center`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-neutral-700">{category}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Achievements */}
            {userProfile.achievements && userProfile.achievements.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Achievements</h3>
                <div className="space-y-3">
                  {userProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-accent-yellow" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            {userProfile.name && (
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Total Performances</span>
                    <span className="font-semibold text-neutral-800">{userProfile.totalSubmissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Community Feedback</span>
                    <span className="font-semibold text-neutral-800">-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Events Participated</span>
                    <span className="font-semibold text-neutral-800">-</span>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="card bg-primary-50 border-primary-200">
              <div className="flex items-start space-x-3">
                <EyeOff className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary-800 mb-1">Privacy Protected</h4>
                  <p className="text-sm text-primary-700">
                    Your profile and performances are only visible to community members. 
                    You control what gets shared publicly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}