#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Initializing Abhivyakti Backend with Supabase...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from template...')
  const templatePath = path.join(process.cwd(), '.env.local.example')
  if (fs.existsSync(templatePath)) {
    fs.copyFileSync(templatePath, envPath)
    console.log('✅ .env.local created. Please update it with your Supabase credentials.\n')
  } else {
    console.log('❌ .env.local.example not found. Please create .env.local manually.\n')
  }
} else {
  console.log('✅ .env.local already exists.\n')
}

// Check if Supabase CLI is available
try {
  execSync('npx supabase --version', { stdio: 'ignore' })
  console.log('✅ Supabase CLI is available.\n')
} catch (error) {
  console.log('❌ Supabase CLI not found. Installing...')
  try {
    execSync('npm install -D supabase', { stdio: 'inherit' })
    console.log('✅ Supabase CLI installed.\n')
  } catch (installError) {
    console.log('❌ Failed to install Supabase CLI. Please install manually.\n')
    process.exit(1)
  }
}

// Check Docker
try {
  execSync('docker --version', { stdio: 'ignore' })
  console.log('✅ Docker is available.\n')
} catch (error) {
  console.log('⚠️  Docker not found. You\'ll need Docker to run Supabase locally.')
  console.log('   Please install Docker from https://docker.com\n')
}

console.log('🎯 Next steps:')
console.log('1. Update .env.local with your Supabase project credentials')
console.log('2. Run: npm run supabase:start (requires Docker)')
console.log('3. Run: npm run supabase:migrate')
console.log('4. Run: npm run dev')
console.log('5. Test: npm run test:health\n')

console.log('📚 For detailed setup instructions, see SUPABASE_SETUP.md')
console.log('🎉 Initialization complete!')