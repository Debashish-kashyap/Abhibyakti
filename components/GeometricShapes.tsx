export default function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Left Shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-accent-cultural-pink/20 rounded-2xl rotate-12 geometric-shape"></div>
      <div className="absolute top-32 left-32 w-8 h-8 bg-accent-joyful-yellow/30 rounded-full geometric-shape"></div>
      <div className="absolute top-16 left-64 w-12 h-12 bg-secondary-300/25 rounded-lg rotate-45 geometric-shape"></div>
      
      {/* Top Right Shapes */}
      <div className="absolute top-24 right-16 w-20 h-20 bg-accent-creative-purple/20 rounded-3xl -rotate-12 geometric-shape"></div>
      <div className="absolute top-40 right-40 w-6 h-6 bg-primary-300/40 rounded-full geometric-shape"></div>
      <div className="absolute top-12 right-72 w-14 h-14 bg-accent-cultural-pink/15 rounded-xl rotate-30 geometric-shape"></div>
      
      {/* Bottom Left Shapes */}
      <div className="absolute bottom-32 left-20 w-18 h-18 bg-secondary-300/20 rounded-2xl rotate-45 geometric-shape"></div>
      <div className="absolute bottom-16 left-48 w-10 h-10 bg-accent-joyful-yellow/25 rounded-lg -rotate-12 geometric-shape"></div>
      
      {/* Bottom Right Shapes */}
      <div className="absolute bottom-28 right-24 w-16 h-16 bg-primary-200/30 rounded-3xl rotate-12 geometric-shape"></div>
      <div className="absolute bottom-44 right-56 w-8 h-8 bg-accent-creative-purple/25 rounded-full geometric-shape"></div>
      
      {/* Center Floating Shapes */}
      <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-accent-cultural-pink/20 rounded-lg rotate-45 geometric-shape animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-secondary-300/15 rounded-2xl -rotate-12 geometric-shape animate-pulse"></div>
    </div>
  )
}