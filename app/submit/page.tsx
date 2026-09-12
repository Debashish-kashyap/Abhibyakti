'use client'

import { useState } from 'react'
import { Upload, Link as LinkIcon, Music, BookOpen, Mic, Drama, Users, Lock, Globe, Heart } from 'lucide-react'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    performerName: '',
    ageGroup: '',
    category: '',
    title: '',
    description: '',
    submissionType: 'upload',
    cloudLink: '',
    visibility: 'group',
    parentalConsent: false,
    communityGuidelines: false
  })

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: 'music', label: 'Music & Instruments', icon: Music, color: 'bg-accent-cultural-pink/10 text-accent-cultural-pink' },
    { id: 'poetry', label: 'Poetry & Literature', icon: BookOpen, color: 'bg-accent-creative-purple/10 text-accent-creative-purple' },
    { id: 'storytelling', label: 'Storytelling', icon: Mic, color: 'bg-secondary-100 text-secondary-600' },
    { id: 'acting', label: 'Acting & Drama', icon: Drama, color: 'bg-accent-joyful-yellow/10 text-accent-joyful-yellow' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    
    // Basic validation
    const errors: {[key: string]: string} = {}
    if (!formData.performerName.trim()) errors.performerName = 'Name is required'
    if (!formData.ageGroup) errors.ageGroup = 'Age group is required'
    if (!formData.category) errors.category = 'Performance category is required'
    if (!formData.title.trim()) errors.title = 'Performance title is required'
    if (formData.submissionType === 'link' && !formData.cloudLink.trim()) {
      errors.cloudLink = 'Cloud storage link is required'
    }
    if (formData.ageGroup === 'child' && !formData.parentalConsent) {
      errors.parentalConsent = 'Parental consent is required for children'
    }
    if (!formData.communityGuidelines) {
      errors.communityGuidelines = 'You must agree to community guidelines'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            Submit Your Performance
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Share your talent with our supportive community. Every voice matters, every performance is celebrated.
          </p>
        </div>

        {/* Success State - Using Growth Green */}
        {isSubmitted && (
          <div className="card bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-200 mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-6 h-6 text-secondary-600" />
              <h2 className="text-lg font-semibold text-secondary-800">Submission Successful!</h2>
            </div>
            <p className="text-secondary-700 mb-4">
              Thank you for sharing your talent! Your performance has been submitted and will be reviewed before the next Sunday event.
            </p>
            <div className="bg-secondary-100 rounded-lg p-3">
              <p className="text-sm text-secondary-800 font-medium">
                🎉 What happens next?
              </p>
              <ul className="text-sm text-secondary-700 mt-2 space-y-1">
                <li>• Your submission will be reviewed within 24 hours</li>
                <li>• You'll receive a confirmation message in the WhatsApp group</li>
                <li>• Get ready to shine at the next Sunday event!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Encouragement Banner - Using Growth Green */}
        {!isSubmitted && (
          <div className="card bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-200 mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-6 h-6 text-secondary-600" />
              <h2 className="text-lg font-semibold text-secondary-800">You've Got This!</h2>
            </div>
            <p className="text-secondary-700">
              Remember, this is a safe space for expression. Focus on sharing your passion, not perfection. 
              Our community is here to support and encourage your creative journey.
            </p>
          </div>
        )}

        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Performer Information */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Performer Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Name / Nickname *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                    formErrors.performerName 
                      ? 'border-semantic-error focus:ring-semantic-error/20' 
                      : 'border-neutral-200 focus:ring-primary-500'
                  }`}
                  placeholder="How would you like to be introduced?"
                  value={formData.performerName}
                  onChange={(e) => setFormData({...formData, performerName: e.target.value})}
                />
                {formErrors.performerName && (
                  <p className="text-sm text-semantic-error mt-1">{formErrors.performerName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Age Group *
                </label>
                <select
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                    formErrors.ageGroup 
                      ? 'border-semantic-error focus:ring-semantic-error/20' 
                      : 'border-neutral-200 focus:ring-primary-500'
                  }`}
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                >
                  <option value="">Select age group</option>
                  <option value="child">Child (Under 18)</option>
                  <option value="adult">Adult (18+)</option>
                </select>
                {formErrors.ageGroup && (
                  <p className="text-sm text-semantic-error mt-1">{formErrors.ageGroup}</p>
                )}
              </div>
            </div>
          </div>

          {/* Performance Category */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Performance Category</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <label
                    key={category.id}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.category === category.id
                        ? 'border-primary-300 bg-primary-50'
                        : formErrors.category
                        ? 'border-semantic-error hover:border-semantic-error'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      className="sr-only"
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-neutral-800">{category.label}</span>
                    </div>
                  </label>
                )
              })}
            </div>
            {formErrors.category && (
              <p className="text-sm text-semantic-error mt-2">{formErrors.category}</p>
            )}
          </div>

          {/* Performance Details */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Performance Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Performance Title *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                    formErrors.title 
                      ? 'border-semantic-error focus:ring-semantic-error/20' 
                      : 'border-neutral-200 focus:ring-primary-500'
                  }`}
                  placeholder="Give your performance a title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                {formErrors.title && (
                  <p className="text-sm text-semantic-error mt-1">{formErrors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your performance, inspiration, or anything you'd like to share..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Upload Your Performance</h3>
            
            <div className="space-y-6">
              {/* Upload Method Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.submissionType === 'upload'
                    ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="submissionType"
                    value="upload"
                    className="sr-only"
                    onChange={(e) => setFormData({...formData, submissionType: e.target.value})}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Upload className="w-6 h-6 text-primary-600" />
                      {formData.submissionType === 'upload' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${formData.submissionType === 'upload' ? 'text-primary-800' : 'text-neutral-800'}`}>
                        Upload File
                      </div>
                      <div className="text-sm text-neutral-600">Upload from your device</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      formData.submissionType === 'upload'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-neutral-300'
                    }`}>
                      {formData.submissionType === 'upload' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
                
                <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.submissionType === 'link'
                    ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="submissionType"
                    value="link"
                    className="sr-only"
                    onChange={(e) => setFormData({...formData, submissionType: e.target.value})}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <LinkIcon className="w-6 h-6 text-primary-600" />
                      {formData.submissionType === 'link' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${formData.submissionType === 'link' ? 'text-primary-800' : 'text-neutral-800'}`}>
                        Cloud Link
                      </div>
                      <div className="text-sm text-neutral-600">Google Drive, Dropbox, etc.</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      formData.submissionType === 'link'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-neutral-300'
                    }`}>
                      {formData.submissionType === 'link' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              {/* Upload Area */}
              {formData.submissionType === 'upload' ? (
                <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-sm text-neutral-500">Supports MP3, MP4, MOV, WAV (Max 100MB)</p>
                  <input type="file" className="hidden" accept="audio/*,video/*" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Cloud Storage Link
                  </label>
                  <input
                    type="url"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                      formErrors.cloudLink 
                        ? 'border-semantic-error focus:ring-semantic-error/20' 
                        : 'border-neutral-200 focus:ring-primary-500'
                    }`}
                    placeholder="https://drive.google.com/..."
                    value={formData.cloudLink}
                    onChange={(e) => setFormData({...formData, cloudLink: e.target.value})}
                  />
                  {formErrors.cloudLink && (
                    <p className="text-sm text-semantic-error mt-1">{formErrors.cloudLink}</p>
                  )}
                  <p className="text-sm text-neutral-500 mt-2">
                    Make sure your link is publicly accessible or shared with the community
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Privacy & Visibility</h3>
            
            <div className="space-y-4">
              <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.visibility === 'group'
                  ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}>
                <input
                  type="radio"
                  name="visibility"
                  value="group"
                  className="sr-only"
                  onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                />
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Users className="w-6 h-6 text-primary-600" />
                    {formData.visibility === 'group' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${formData.visibility === 'group' ? 'text-primary-800' : 'text-neutral-800'}`}>
                      Group Only (Recommended)
                    </div>
                    <div className="text-sm text-neutral-600">Visible only to WhatsApp group members</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    formData.visibility === 'group'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-300'
                  }`}>
                    {formData.visibility === 'group' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
              
              <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.visibility === 'public'
                  ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  className="sr-only"
                  onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                />
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Globe className="w-6 h-6 text-primary-600" />
                    {formData.visibility === 'public' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${formData.visibility === 'public' ? 'text-primary-800' : 'text-neutral-800'}`}>
                      Public Gallery
                    </div>
                    <div className="text-sm text-neutral-600">Can be featured in public gallery</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    formData.visibility === 'public'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-300'
                  }`}>
                    {formData.visibility === 'public' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Consent & Guidelines */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary-700 mb-6">Consent & Guidelines</h3>
            
            <div className="space-y-4">
              {formData.ageGroup === 'child' && (
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className={`mt-1 w-5 h-5 border rounded focus:ring-primary-500 transition-colors ${
                        formErrors.parentalConsent 
                          ? 'text-semantic-error border-semantic-error' 
                          : 'text-primary-600 border-neutral-300'
                      }`}
                      checked={formData.parentalConsent}
                      onChange={(e) => setFormData({...formData, parentalConsent: e.target.checked})}
                    />
                    <div>
                      <div className="font-medium text-neutral-800">Parental Consent *</div>
                      <div className="text-sm text-neutral-600">
                        I confirm that I am the parent/guardian and give consent for this child's participation
                      </div>
                    </div>
                  </label>
                  {formErrors.parentalConsent && (
                    <p className="text-sm text-semantic-error mt-1">{formErrors.parentalConsent}</p>
                  )}
                </div>
              )}
              
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className={`mt-1 w-5 h-5 border rounded focus:ring-primary-500 transition-colors ${
                      formErrors.communityGuidelines 
                        ? 'text-semantic-error border-semantic-error' 
                        : 'text-primary-600 border-neutral-300'
                    }`}
                    checked={formData.communityGuidelines}
                    onChange={(e) => setFormData({...formData, communityGuidelines: e.target.checked})}
                  />
                  <div>
                    <div className="font-medium text-neutral-800">Community Guidelines *</div>
                    <div className="text-sm text-neutral-600">
                      I agree to the community guidelines and understand that all content is moderated
                    </div>
                  </div>
                </label>
                {formErrors.communityGuidelines && (
                  <p className="text-sm text-semantic-error mt-1">{formErrors.communityGuidelines}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button - Using Expression Blue */}
          {!isSubmitted && (
            <div className="text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn-primary text-lg px-8 py-4 transition-all duration-200 ${
                  isSubmitting 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-primary-600 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Submit Performance'
                )}
              </button>
              <p className="text-sm text-neutral-500 mt-3">
                Your submission will be reviewed before the next Sunday event
              </p>
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  )
}