# Wedding Gift Registry Website

This is a wedding gift registry website built with React, Vite, and Supabase. The site allows guests to view and reserve wedding gifts, and confirm their attendance.

## Features

- Gift registry with reservation system
- RSVP functionality
- Admin panel for gift management
- Responsive design optimized for mobile
- Real-time updates using Supabase

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Supabase account and project at https://supabase.com
4. Create the following tables in your Supabase database:

```sql
-- Create gifts table
create table gifts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price decimal not null,
  image text not null,
  description text not null,
  suggested_stores jsonb not null,
  reserved boolean default false,
  reserved_by text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create settings table
create table settings (
  id serial primary key,
  rsvp_enabled boolean default false
);

-- Create rsvp table
create table rsvp (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  guests integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Insert initial settings
insert into settings (id, rsvp_enabled) values (1, false);
```

5. Copy your Supabase URL and anon key from the project settings
6. Create a `.env` file with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
7. Run the development server: `npm run dev`

## Deployment

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Add the environment variables in Netlify:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Deploy!