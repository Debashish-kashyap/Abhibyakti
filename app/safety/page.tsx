import { Shield, Heart, Users, Eye, Lock, AlertTriangle, CheckCircle } from 'lucide-react'

export default function SafetyPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-accent-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Safety & Community Guidelines
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Creating a safe, supportive environment where everyone can express themselves with confidence
          </p>
        </div>

        {/* Child Protection */}
        <div className="card mb-8 bg-accent-green/5 border-accent-green/20">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-accent-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800 mb-3">Child Protection Priority</h2>
              <p className="text-neutral-700 mb-4">
                The safety and well-being of children is our highest priority. We have implemented 
                comprehensive measures to ensure a secure environment for young performers.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <SafetyFeature
                  icon={CheckCircle}
                  title="Mandatory Parental Consent"
                  description="All child submissions require explicit parental approval"
                />
                <SafetyFeature
                  icon={Eye}
                  title="Content Moderation"
                  description="Every submission is reviewed before community sharing"
                />
                <SafetyFeature
                  icon={Lock}
                  title="Privacy Controls"
                  description="Strict visibility settings protect young performers"
                />
                <SafetyFeature
                  icon={Users}
                  title="Trusted Community"
                  description="Verified members create a safe support network"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="space-y-8">
          <GuidelineSection
            icon={Heart}
            title="Positive Expression"
            color="bg-accent-pink/10 text-accent-pink"
            guidelines={[
              "Encourage creativity and self-expression in all forms",
              "Celebrate cultural diversity and different artistic styles",
              "Focus on effort and courage rather than technical perfection",
              "Share constructive, growth-oriented feedback only",
              "Respect different age groups and skill levels"
            ]}
          />

          <GuidelineSection
            icon={Users}
            title="Community Conduct"
            color="bg-primary-100 text-primary-600"
            guidelines={[
              "Treat all community members with kindness and respect",
              "Use appropriate language suitable for all ages",
              "No bullying, harassment, or negative criticism",
              "Respect privacy and consent preferences",
              "Report any concerning behavior to moderators"
            ]}
          />

          <GuidelineSection
            icon={Lock}
            title="Privacy & Content"
            color="bg-accent-purple/10 text-accent-purple"
            guidelines={[
              "Only share content you have permission to post",
              "Respect copyright and intellectual property rights",
              "No sharing of personal information in performances",
              "Use privacy settings appropriately for your comfort level",
              "Content must be appropriate for family viewing"
            ]}
          />

          <GuidelineSection
            icon={AlertTriangle}
            title="Prohibited Content"
            color="bg-red-100 text-red-600"
            guidelines={[
              "No inappropriate, offensive, or harmful content",
              "No content promoting violence, discrimination, or illegal activities",
              "No sharing of personal contact information",
              "No commercial or promotional content without permission",
              "No content that could identify specific locations or schools"
            ]}
          />
        </div>

        {/* Reporting & Support */}
        <div className="card mt-8 bg-neutral-50">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Reporting & Support</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-700 mb-2">How to Report Concerns</h3>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Contact moderators through WhatsApp group admins</li>
                <li>• Use the report feature on any concerning content</li>
                <li>• Email safety concerns to [email] (for serious issues)</li>
                <li>• All reports are handled confidentially and promptly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-700 mb-2">Community Support</h3>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Peer mentorship program for new members</li>
                <li>• Regular check-ins with young performers</li>
                <li>• Resources for building confidence and skills</li>
                <li>• Safe space for questions and concerns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Moderation Process */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Content Moderation Process</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800">Submission Review</h4>
                <p className="text-sm text-neutral-600">All content is reviewed by trained moderators before sharing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800">Safety Check</h4>
                <p className="text-sm text-neutral-600">Content is evaluated for appropriateness and safety guidelines</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-primary-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800">Community Sharing</h4>
                <p className="text-sm text-neutral-600">Approved content is shared with the community for celebration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card mt-8 bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary-800 mb-3">Need Help or Have Concerns?</h2>
            <p className="text-primary-700 mb-4">
              Our community moderators are here to help ensure everyone feels safe and supported.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary bg-primary-600 hover:bg-primary-700">
                Contact Moderators
              </button>
              <button className="btn-secondary">
                View Community Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SafetyFeatureProps {
  icon: React.ElementType
  title: string
  description: string
}

function SafetyFeature({ icon: Icon, title, description }: SafetyFeatureProps) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-neutral-800 text-sm">{title}</h4>
        <p className="text-xs text-neutral-600">{description}</p>
      </div>
    </div>
  )
}

interface GuidelineSectionProps {
  icon: React.ElementType
  title: string
  color: string
  guidelines: string[]
}

function GuidelineSection({ icon: Icon, title, color, guidelines }: GuidelineSectionProps) {
  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
      </div>
      <ul className="space-y-2">
        {guidelines.map((guideline, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
            <span className="text-neutral-700 text-sm">{guideline}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}