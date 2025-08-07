# Vercel Deployment Guide for Court Jesters

This guide explains how to deploy the Court Jesters website to Vercel.

## Prerequisites

1. Install Vercel CLI: `npm i -g vercel`
2. Sign up for a Vercel account at https://vercel.com
3. (Optional) Set up a PostgreSQL database (recommended: Neon DB)

## Environment Variables

Copy `env.example` to `.env.local` and fill in your values:

```bash
# Database Configuration (optional for now - uses in-memory storage)
DATABASE_URL=postgresql://username:password@hostname:5432/database_name

# Optional: For development only
NODE_ENV=development
```

## Database Setup (Optional)

The project currently uses in-memory storage for contact form submissions. For production, you can:

1. Sign up for Neon DB (https://neon.tech) - free tier available
2. Create a new database
3. Copy the connection string to your environment variables
4. Update the API function to use the actual database instead of in-memory storage

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Navigate to project directory and deploy:
   ```bash
   cd /path/to/CourtJesters
   vercel
   ```

3. Follow the prompts:
   - Link to existing project? **N** (for first deployment)
   - Project name: **court-jesters** (or your preferred name)
   - Directory: **./** (current directory)

4. Set environment variables (if using database):
   ```bash
   vercel env add DATABASE_URL
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com/dashboard
3. Click "Import Project"
4. Select your GitHub repository
5. Configure:
   - Framework Preset: **Other**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/public`
6. Add environment variables in the Vercel dashboard

## What Changed from Replit

1. **Removed Replit dependencies**: Cleaned up `package.json` and `vite.config.ts`
2. **Added Vercel API functions**: Converted Express routes to `/api/contact.ts`
3. **Updated build process**: New build script copies assets properly
4. **Added Vercel configuration**: `vercel.json` handles routing and builds
5. **Static asset handling**: Assets are now served statically by Vercel

## Project Structure

```
CourtJesters/
├── api/                    # Vercel API functions
│   └── contact.ts         # Contact form API
├── client/                # React frontend
├── attached_assets/       # Static assets (images, files)
├── dist/public/          # Build output
├── vercel.json           # Vercel configuration
└── package.json          # Updated scripts
```

## Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test production build:
   ```bash
   npm run vercel-build
   vercel dev
   ```

## Notes

- The contact form data is currently stored in memory and will reset on each deployment
- For persistent data, connect a proper database using the DATABASE_URL environment variable
- All attached assets are served statically and will be cached by Vercel's CDN
- The site supports client-side routing with fallback to index.html