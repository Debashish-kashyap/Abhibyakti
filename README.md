# Abhivyakti - Community Cultural Platform

A child-safe cultural platform where children and people of all ages submit recorded audio/video performances for weekly Sunday community events. Built to reduce stage fear, encourage expression, and preserve cultural talent.

## 🎭 Features

- **Child-Safe Environment**: Strict moderation, parental consent, and privacy controls
- **Weekly Events**: Regular Sunday gatherings for community performances
- **Multiple Categories**: Music, Poetry, Storytelling, Acting & Drama
- **Encouraging Feedback**: Positive, growth-focused community responses
- **Privacy Controls**: Group-only or public visibility options
- **Mobile-First Design**: Responsive, accessible interface for all devices

## 🎨 Design Philosophy

- Clean, minimal, friendly card-based design
- Soft backgrounds with rounded corners
- Simple geometric illustrations and calm colors
- Child-friendly, non-intimidating interface
- Emotion: calm, encouraging, expressive

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abhivyakti-community
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages Overview

### 1. Home Page (`/`)
- Hero section with mission statement
- "3 Years of Continuous Cultural Expression" highlight
- Weekly Sunday event banner
- WhatsApp group join button
- Feature highlights and community mission

### 2. Event Schedule (`/schedule`)
- Weekly Sunday calendar view
- Submission deadline indicators
- Theme cards (Poetry, Music, Storytelling, etc.)
- Event guidelines and format information

### 3. Performance Submission (`/submit`)
- Upload audio/video or paste cloud links
- Talent category selector
- Mandatory parental consent for children
- Visibility options (Group-only / Public)
- Encouraging, friendly microcopy

### 4. Participant Profile (`/profile`)
- Profile card with name/nickname and age group
- Talent categories and achievements
- Grid of past submissions with privacy labels
- Performance statistics and community feedback

### 5. Review & Feedback (`/feedback`)
- Reviewer view of assigned submissions
- Feedback form with encouraging prompts
- Optional audio feedback recording
- Positive, growth-focused guidance

### 6. Archive & Gallery (`/gallery`)
- Card-based gallery of performances
- Filter by date and talent type
- "Inspiration Mode" for safe browsing
- Featured performances section

### 7. Safety & Guidelines (`/safety`)
- Child protection guidelines
- Privacy rules and content moderation
- Community conduct principles
- Reporting and support information

## 🛡️ Safety Features

- **Parental Consent**: Required for all child participants
- **Content Moderation**: All submissions reviewed before sharing
- **Privacy Controls**: Strict visibility settings
- **Safe Browsing**: Child-friendly gallery mode
- **Community Guidelines**: Clear conduct expectations

## 🎯 Technical Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Design**: Mobile-first responsive design
- **Components**: Reusable, accessible React components

## 🎨 Color Palette

- **Primary**: Blue tones (#0ea5e9, #0284c7)
- **Accents**: 
  - Pink: #ec4899
  - Yellow: #fbbf24
  - Green: #10b981
  - Purple: #8b5cf6
- **Neutrals**: Gray scale for text and backgrounds

## 📋 Development Guidelines

### Component Structure
- Use TypeScript for all components
- Follow mobile-first responsive design
- Implement proper accessibility features
- Use Tailwind utility classes consistently

### Safety Considerations
- All user-generated content requires moderation
- Implement proper privacy controls
- Ensure child-safe browsing experiences
- Follow data protection guidelines

## 🤝 Community Guidelines

### For Participants
- Encourage creativity and self-expression
- Provide constructive, positive feedback
- Respect privacy and consent preferences
- Maintain family-friendly content standards

### For Moderators
- Review all content before community sharing
- Ensure child safety and appropriate content
- Foster encouraging, supportive environment
- Handle reports promptly and confidentially

## 📞 Communication

- **Primary**: WhatsApp group for community communication
- **No Bots**: Human-moderated communication only
- **Privacy**: No public exposure without explicit consent
- **Support**: Community moderators available for assistance

## 🔧 Configuration

### WhatsApp Integration
Update the WhatsApp group link in `components/WhatsAppButton.tsx`:
```typescript
const whatsappLink = 'https://chat.whatsapp.com/your-actual-group-link'
```

### Environment Variables
Create a `.env.local` file for any required environment variables:
```
NEXT_PUBLIC_WHATSAPP_GROUP_LINK=your-whatsapp-link
```

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is designed for community use with focus on child safety and cultural preservation.

## 🎭 Mission Statement

Abhivyakti exists to create a nurturing digital space where cultural expression flourishes without fear. We believe every voice deserves to be heard, every talent deserves recognition, and every performer deserves a supportive community to grow within.

Through weekly gatherings and continuous encouragement, we're building confidence, preserving culture, and fostering creativity across generations.

---

**Built with ❤️ for the Abhivyakti community**