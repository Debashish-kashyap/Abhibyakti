'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp group link
    const whatsappLink = 'https://chat.whatsapp.com/your-group-link'
    window.open(whatsappLink, '_blank')
  }

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="btn-primary flex items-center space-x-2 bg-green-500 hover:bg-green-600"
    >
      <MessageCircle className="w-5 h-5" />
      <span>Join WhatsApp Group</span>
    </button>
  )
}