# Blue Men Plumbing Website

Modern, professional website for Blue Men Plumbing with integrated quote system and Google reviews.

## Project info

**URL**: https://lovable.dev/projects/03a4d6a5-bbe6-42c9-8248-134bb50d004d

## 🚀 Key Features

### ✅ Quote Request System with Database Integration
- **Full-featured quote form** with multi-step wizard
- **Automatic database storage** - All customer data saved to Supabase
- **Service selection** with pricing estimates
- **Property information** collection
- **Photo upload** capability
- **Custom service requests** support
- 📖 Setup guide: `QUOTES_DATABASE_SETUP.md`

### ✅ Google Reviews Integration
- **Real-time Google reviews** display
- **Automatic caching** (24-hour refresh)
- **Customer photos** and ratings
- **Fallback system** for reliability
- 📖 Setup guide: `START_HERE.md` or `GOOGLE_REVIEWS_QUICKSTART.md`

### ✅ Services Management
- **Dynamic service catalog** with categories
- **Admin dashboard** for managing services
- **Supabase backend** with real-time updates
- **Two-tier service selection** (categories + items)
- 📖 Documentation: `README_SERVICES_MANAGEMENT.md`

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root with:

```bash
# Supabase Configuration (Required for quote system)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Places API (Required for reviews)
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_google_place_id
```

See `.env.local.example` for template.

### Database Setup

1. **Create Supabase Project**: https://supabase.com
2. **Run Schema**: Execute `supabase-schema.sql` in SQL Editor
3. **Populate Services**: Run `supabase-initial-data.sql` (optional)
4. **Configure Environment**: Add credentials to `.env.local`

📖 Detailed guide: `QUOTES_DATABASE_SETUP.md`

### Google Reviews Setup

1. **Get Place ID**: Find your business on Google Maps
2. **Create API Key**: Google Cloud Console → Places API
3. **Configure Environment**: Add to `.env.local`

📖 Quick guide: `START_HERE.md` (5-minute setup)

## 📚 Documentation Index

| Feature | Documentation Files |
|---------|-------------------|
| **Quote System** | `QUOTES_DATABASE_SETUP.md` |
| **Google Reviews** | `START_HERE.md`, `GOOGLE_REVIEWS_QUICKSTART.md` |
| **Services Management** | `README_SERVICES_MANAGEMENT.md` |
| **Supabase Setup** | `SUPABASE_QUICKSTART.md`, `SUPABASE_SETUP.md` |
| **Architecture** | `IMPLEMENTATION_SUMMARY.md`, `SUPABASE_ARCHITECTURE.md` |

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/03a4d6a5-bbe6-42c9-8248-134bb50d004d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/03a4d6a5-bbe6-42c9-8248-134bb50d004d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
