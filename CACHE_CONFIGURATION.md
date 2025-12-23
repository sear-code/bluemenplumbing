# Cache Configuration Guide

## Current Setting: 24-Hour Cache ⏰

Your Google reviews are cached for **24 hours**, which means:

### How It Works

```
First visitor of the day:
  Browser → Server → Google API → Get fresh reviews → Cache for 24hrs
  
All other visitors that day:
  Browser → Server → Cached reviews (instant!) → No API call
  
Next day (after 24 hours):
  First visitor → Fetches fresh reviews again → Cache resets
```

### Benefits of 24-Hour Caching

✅ **Extremely Low Cost**
   - Only 30 API calls per month
   - Cost: ~$0.51/month (FREE with $200 credit)

✅ **Better Performance**
   - Reviews load instantly from cache
   - No waiting for Google API

✅ **Still Fresh**
   - Reviews update daily
   - New reviews appear within 24 hours

✅ **Traffic Protection**
   - Even with massive traffic spikes, cost stays minimal
   - You'd need 390,000+ visitors/day to exceed free tier

### Cost Comparison by Cache Duration

| Cache Time | API Calls/Month | Cost/Month | When Reviews Update |
|------------|-----------------|------------|---------------------|
| **No cache** | ~900,000 | $15,300 ❌ | Every page load |
| **1 hour** | 720 | $12.24 | Every hour |
| **24 hours** ✨ | 30 | $0.51 | Once per day |
| **1 week** | 4 | $0.07 | Once per week |

### Is 24 Hours Right for You?

**Perfect if:**
- ✅ You get a few new reviews per week or less
- ✅ You want minimal API costs
- ✅ Daily updates are fresh enough
- ✅ You want traffic spike protection

**Consider shorter cache if:**
- ❌ You get many reviews daily and want them shown immediately
- ❌ You're running a time-sensitive promotion
- ❌ You have very high traffic already (still FREE though!)

### How to Change Cache Duration

Edit: `app/api/google-reviews/route.ts`

Find this line:
```typescript
next: { revalidate: 86400 } // 86400 seconds = 24 hours
```

Change to:
```typescript
// 1 hour
next: { revalidate: 3600 }

// 12 hours
next: { revalidate: 43200 }

// 24 hours (current)
next: { revalidate: 86400 }

// 1 week
next: { revalidate: 604800 }
```

Then restart your server:
```bash
npm run dev
```

### Monitoring Your Cache

The cache automatically handles:
- ✅ First request fetches from Google
- ✅ Subsequent requests use cache
- ✅ After 24 hours, cache expires
- ✅ Next request fetches fresh data

No manual cache clearing needed!

### Manual Cache Clearing (if needed)

If you need to force fresh reviews immediately:

**In Development:**
```bash
# Restart the dev server
npm run dev
```

**In Production:**
```bash
# Rebuild and redeploy
npm run build
npm start
```

Or delete the `.next` folder:
```bash
rm -rf .next
npm run build
```

### Recommended: Keep 24-Hour Cache

For most plumbing businesses:
- New Google reviews come in weekly/monthly
- Daily updates are perfectly fresh
- Cost is essentially zero
- Performance is excellent

**Current setting: 24 hours ✅ Perfect for your needs!**

