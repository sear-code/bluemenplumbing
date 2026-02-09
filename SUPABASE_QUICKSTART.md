# 🚀 Supabase Quick Start (5 Minutes)

**Quick setup guide for Blue Men Plumbing Supabase integration**

---

## 📋 What You Need
- [ ] A Supabase account (free)
- [ ] 5 minutes of time
- [ ] The files: `supabase-schema.sql` and `supabase-initial-data.sql`

---

## ⚡ Quick Steps

### 1️⃣ Create Supabase Project (2 min)
1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Name: `bluemenplumbing`
4. Password: (create and save it)
5. Region: (choose closest to you)
6. Click **"Create new project"**
7. ⏳ Wait 2-3 minutes

### 2️⃣ Run SQL Scripts (2 min)
1. Click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy/paste contents of `supabase-schema.sql`
4. Click **"Run"**
5. Click **"New Query"** again
6. Copy/paste contents of `supabase-initial-data.sql`
7. Click **"Run"**
8. ✅ Should see: "Service Categories: 5, Service Items: 30"

### 3️⃣ Get API Credentials (1 min)
1. Click **"Settings"** → **"API"** (left sidebar)
2. Copy **"Project URL"**
3. Copy **"anon/public key"** (in Project API keys section)

### 4️⃣ Update Environment Variables (1 min)
1. Open/create `.env.local` in your project root
2. Add:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```
3. Save file

### 5️⃣ Test It (1 min)
```bash
# Restart dev server
npm run dev
```
1. Open http://localhost:3000
2. Click "Request Free Quote"
3. ✅ Services should load!

---

## 🎉 Done!
Your services are now managed in Supabase!

**Manage Services:**
- Dashboard → Table Editor → Edit any service
- Changes appear instantly (after page refresh)

---

## 📚 Need More Details?
See `SUPABASE_SETUP_NEW.md` for complete guide with troubleshooting.

---

## 🔧 Quick Test Command
To verify connection is working:

```bash
# Check if env vars are set
grep SUPABASE .env.local

# You should see:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## ⚠️ Troubleshooting

**Services not loading?**
1. Check `.env.local` exists and has correct values
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Check browser console for errors (F12)

**Connection error?**
1. Verify credentials in Supabase Dashboard → Settings → API
2. Make sure project is active (not paused)

---

**That's it!** 🚀



