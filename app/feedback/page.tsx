'use client'

import { useState } from 'react'
import { Star, Heart, MessageCircle, Play, Send, Mic, MicOff } from 'lucide-react'

export default function FeedbackPage() {
  const [selectedPerformance, setSelectedPerformance] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  // Assigned performances will be loaded from your backend
  const assignedPerformances: any[] = []

  const encouragingPrompts = [
    "What did you love most about this performance?",
    "How did this performance make you feel?",
    "What was the most creative part?",
    "What would you like to see more of?",
    "How did the performer show courage?",
    "What inspired you about their expression?"
  ]

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle feedback submission
    console.log('Feedback submitted:', feedback)
    setFeedback('')
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Review & Feedback
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Help our community grow by providing encouraging, constructive feedback to fellow performers
          </p>
        </div>

        {/* Feedback Guidelines */}
        <div className="card bg-gradient-to-r from-accent-green/10 to-accent-green/5 border-accent-green/20 mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <Heart className="w-6 h-6 text-accent-green" />
            <h2 className="text-lg font-semibold text-neutral-800">Feedback Guidelines</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-neutral-800 mb-1">Be Encouraging</h4>
              <p className="text-neutral-600">Focus on what you loved and what inspired you</p>
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 mb-1">Be Specific</h4>
              <p className="text-neutral-600">Mention particular moments or elements that stood out</p>
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 mb-1">Be Kind</h4>
              <p className="text-neutral-600">Remember that courage was shown in sharing their art</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Assigned Reviews</h2>
            {assignedPerformances.length > 0 ? (
              <div className="space-y-4">
                {assignedPerformances.map((performance, index) => (
                  <div
                    key={performance.id}
                    className={`card cursor-pointer transition-all duration-200 ${
                      selectedPerformance === index
                        ? 'ring-2 ring-primary-300 bg-primary-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPerformance(index)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-800">{performance.title}</h3>
                      <span className="text-xs text-neutral-500">{performance.duration}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">by {performance.performer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {performance.category}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(performance.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-8">
                <MessageCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-800 mb-2">No Reviews Assigned</h3>
                <p className="text-sm text-neutral-600">
                  You'll receive performance assignments for feedback when new submissions are available.
                </p>
              </div>
            )}
          </div>

          {/* Performance Review */}
          <div className="lg:col-span-2">
            {assignedPerformances.length > 0 ? (
              <div className="card">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                    {assignedPerformances[selectedPerformance].title}
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    by {assignedPerformances[selectedPerformance].performer}
                  </p>
                  <p className="text-neutral-700 mb-6">
                    {assignedPerformances[selectedPerformance].description}
                  </p>

                  {/* Performance Player */}
                  <div className="bg-neutral-100 rounded-xl p-8 text-center mb-6">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-neutral-600 mb-2">Click to play performance</p>
                    <p className="text-sm text-neutral-500">
                      Duration: {assignedPerformances[selectedPerformance].duration}
                    </p>
                  </div>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-neutral-800 mb-3">
                      Share Your Encouraging Feedback
                    </label>
                    
                    {/* Prompt Suggestions */}
                    <div className="mb-4">
                      <p className="text-sm text-neutral-600 mb-2">Need inspiration? Try these prompts:</p>
                      <div className="flex flex-wrap gap-2">
                        {encouragingPrompts.slice(0, 3).map((prompt, index) => (
                          <button
                            key={index}
                            type="button"
                            className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full transition-colors"
                            onClick={() => setFeedback(feedback + prompt + ' ')}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Share what you loved about this performance. Be specific about moments that inspired you, made you smile, or showed the performer's unique creativity..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                    />
                  </div>

                  {/* Audio Feedback Option */}
                  <div className="border-t border-neutral-100 pt-6">
                    <h3 className="font-semibold text-neutral-800 mb-3">Optional: Record Audio Feedback</h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      Sometimes a voice message can be even more encouraging! Record a short audio note.
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isRecording
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                      </button>
                      
                      {isRecording && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-sm">Recording...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <button type="button" className="btn-secondary">
                      Save Draft
                    </button>
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card text-center py-16">
                <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">Ready to Give Feedback</h3>
                <p className="text-neutral-600 max-w-md mx-auto">
                  When community members submit performances, you'll be able to provide encouraging 
                  feedback to help them grow and feel supported.
                </p>
              </div>
            )}

            {/* Feedback Tips */}
            {assignedPerformances.length > 0 && (
              <div className="card mt-6 bg-primary-50 border-primary-200">
                <h3 className="font-semibold text-primary-800 mb-3">💡 Great Feedback Ideas</h3>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• "I loved how you expressed emotion in your voice during..."</li>
                  <li>• "The way you used [specific technique] was really creative!"</li>
                  <li>• "Your performance made me feel..."</li>
                  <li>• "I could tell you put a lot of heart into..."</li>
                  <li>• "What inspired me most was..."</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}