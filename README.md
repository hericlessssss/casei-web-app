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

## Admin Access

To access the admin panel:

1. Navigate to `/admin` route in your browser
2. The admin panel allows you to:
   - Add new gifts to the registry
   - Enable/disable RSVP functionality
   - View reserved gifts and RSVP confirmations
   - Manage gift details and availability

Note: Currently, the admin panel requires proper authentication setup in Supabase. To implement authentication:

1. Enable Email auth provider in Supabase Authentication settings
2. Create an admin user through Supabase Authentication
3. Update the admin route to require authentication
4. Set up proper row level security (RLS) policies in Supabase

## Netlify Deployment Configuration

### Build Settings

1. **Runtime**: Automatically detected based on your project
2. **Base directory**: Leave empty (project root)
3. **Build command**: `npm run build`
4. **Publish directory**: `dist`
5. **Functions directory**: `netlify/functions`

### Environment Variables

Add the following environment variables in Netlify's site settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Deploy Settings

1. **Deploy log visibility**: Choose between:
   - Public logs: Anyone with deploy URL can access logs
   - Private logs: Only site administrators can access logs

2. **Build status**:
   - Active builds: Automatic builds on Git push
   - Stopped builds: Manual deployment only

### Continuous Deployment

1. Connect your GitHub repository
2. Select the branch to deploy (usually `main` or `master`)
3. Configure build settings as mentioned above
4. Deploy the site

### Post-Deployment

1. Set up custom domain (if needed)
2. Configure SSL/TLS certificate
3. Test the deployed site thoroughly
4. Monitor build and deployment logs

### Troubleshooting

If builds fail:
1. Check build logs for errors
2. Verify environment variables
3. Ensure build command is correct
4. Confirm publish directory is set to `dist`
5. Check if dependencies are properly installed