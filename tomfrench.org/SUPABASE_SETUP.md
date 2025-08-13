# Supabase Setup for Kanban Task System

This kanban task system can work with either local storage (for demo/development) or Supabase (for production with user authentication and data persistence).

## Quick Start (Local Storage)

The system works out of the box with local storage - no setup required. Tasks are stored in your browser's localStorage.

## Supabase Setup (Recommended for Production)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Create a new project
4. Wait for the project to be set up

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. In your Supabase project dashboard, go to Settings > API
3. Copy your project URL and anon public key
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 3. Run Database Migrations

You have two options to set up the database schema:

#### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run the migration:
   ```bash
   supabase db push
   ```

#### Option B: Manual SQL Execution

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250813000001_create_kanban_tables.sql`
4. Paste and execute in the SQL Editor

### 4. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your preferred authentication providers
3. For email/password auth (default), no additional setup needed
4. For social providers (Google, GitHub, etc.), follow Supabase documentation

### 5. Test the Setup

1. Start your development server:
   ```bash
   bun run dev
   ```

2. Navigate to `/kanban`
3. Try signing up/in with the auth form
4. Create tasks and verify they persist across sessions

## Features

### Authentication
- Email/password authentication
- Automatic switching between local storage (unauthenticated) and Supabase (authenticated)
- User session management

### Database Schema
- **tasks**: Main task data with status, priority, due dates
- **tags**: Custom tags with colors
- **task_tags**: Many-to-many relationship between tasks and tags
- **columns**: Customizable kanban columns per user

### Security
- Row Level Security (RLS) enabled
- Users can only access their own data
- Secure API access through Supabase

### Data Migration
- When a user signs in, local tasks are preserved
- Seamless switching between storage adapters
- No data loss during authentication state changes

## Troubleshooting

### Common Issues

1. **"User not authenticated" errors**
   - Check your environment variables
   - Verify Supabase project is active
   - Clear browser cache and try again

2. **Database schema errors**
   - Ensure migrations ran successfully
   - Check Supabase logs in the dashboard
   - Verify RLS policies are properly configured

3. **Tasks not syncing**
   - Check browser network tab for API errors
   - Verify user is properly authenticated
   - Check Supabase project quota/limits

### Development Tips

- Use the Supabase dashboard to view/debug data
- Check the browser console for detailed error messages
- The system gracefully falls back to localStorage if Supabase is unavailable

## Database Schema Details

```sql
-- Main tables
tasks (id, title, description, status, priority, created_at, updated_at, due_date, user_id)
tags (id, name, color, user_id, created_at)
task_tags (task_id, tag_id) -- junction table
columns (id, title, status, color, order, user_id, created_at)

-- Enums
task_status: 'todo' | 'blocked' | 'in-progress' | 'done'
task_priority: 'low' | 'medium' | 'high' | 'urgent'
```

The schema automatically creates default columns for new users and maintains referential integrity with foreign key constraints.
