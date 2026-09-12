# Abhivyakti Backend - Supabase Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Docker** (for local Supabase development)
3. **Supabase CLI** (installed via npm in this project)

## Initial Setup

### 1. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Create a new Supabase project at [supabase.com](https://supabase.com)

3. Update `.env.local` with your Supabase project credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (keep secret)

### 2. Local Development Setup

1. Initialize Supabase locally:
   ```bash
   npm run supabase:start
   ```

2. Apply database migrations:
   ```bash
   npm run supabase:migrate
   ```

3. Generate TypeScript types:
   ```bash
   npm run supabase:generate-types
   ```

### 3. Development Server

1. Start the Next.js development server:
   ```bash
   npm run dev
   ```

2. Test the health endpoint:
   ```bash
   npm run test:health
   ```

## Database Schema

The database includes the following tables:

- **users**: User profiles with age-based account types
- **performances**: Audio/video submissions with moderation status
- **interactions**: Likes, views, and comments
- **moderation_log**: Audit trail for moderation actions

## Storage Buckets

The following storage buckets will be created:

- **performances**: Audio and video files
- **avatars**: User profile images
- **thumbnails**: Generated thumbnails for videos

## Row Level Security (RLS)

All tables have RLS enabled with policies for:

- Users can only access their own data
- Only approved performances are publicly visible
- Moderation logs are restricted to moderators

## API Endpoints

### Health Check
- `GET /api/health` - System health status

### Authentication (Supabase Auth)
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout

## Development Commands

```bash
# Start local Supabase
npm run supabase:start

# Stop local Supabase
npm run supabase:stop

# Reset database (WARNING: Deletes all data)
npm run supabase:reset

# Apply migrations
npm run supabase:migrate

# Generate TypeScript types
npm run supabase:generate-types

# Test health endpoint
npm run test:health
```

## Production Deployment

1. Create a production Supabase project
2. Update environment variables in your hosting platform
3. Run database migrations on production
4. Configure storage buckets and RLS policies
5. Set up email templates and authentication providers

## Security Considerations

- Never commit `.env.local` to version control
- Use service role key only on the server side
- Implement proper input validation
- Regular security audits of RLS policies
- Monitor authentication attempts and rate limiting

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check if Supabase is running: `docker ps`
   - Verify environment variables
   - Check network connectivity

2. **Migration errors**
   - Reset database: `npm run supabase:reset`
   - Check SQL syntax in migration files

3. **Authentication issues**
   - Verify Supabase URL and keys
   - Check CORS settings
   - Ensure middleware is properly configured

### Getting Help

- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review logs: `supabase logs`
- Check database status: `supabase status`