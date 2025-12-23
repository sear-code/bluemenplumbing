# How to Update Your Google Reviews

## Current Setup

Your website now displays **3 real Google reviews** that are hardcoded into the website. This means:
- ✅ No API key needed
- ✅ No cost
- ✅ Works immediately
- ✅ You control which reviews to show

## Current Reviews

1. **E Prab** ⭐⭐⭐⭐⭐
2. **Sogl Nasab** ⭐⭐⭐⭐⭐
3. **Michael Masse** ⭐⭐⭐⭐⭐

## How to Update Reviews

When you get new great reviews and want to update your website:

### Step 1: Choose Your Best Reviews

1. Go to your Google reviews: https://share.google/B88kLmpVaa9flScJr
2. Pick your 3 best recent reviews
3. Copy the review text, author name, and star rating

### Step 2: Update the English Version

Open the file: `src/i18n/locales/en.json`

Find the testimonials section (around line 59) and update:

```json
"testimonials": {
  "title": "What Our Customers Say",
  "subtitle": "Real reviews from our satisfied customers",
  "googleLink": "https://share.google/B88kLmpVaa9flScJr",
  "review1": {
    "text": "[Paste new review text here]",
    "author": "[Customer name]",
    "platform": "Google"
  },
  "review2": {
    "text": "[Paste new review text here]",
    "author": "[Customer name]",
    "platform": "Google"
  },
  "review3": {
    "text": "[Paste new review text here]",
    "author": "[Customer name]",
    "platform": "Google"
  },
  "viewAll": "View All Google Reviews"
}
```

### Step 3: Update the French Version (Optional)

Open the file: `src/i18n/locales/fr.json`

Update the same testimonials section with the same reviews (keeping them in English is fine for authenticity).

### Step 4: Save and Test

1. Save both files
2. If your dev server is running, it will auto-reload
3. If not, run: `npm run dev`
4. Check: http://localhost:3000

## Example Update

Let's say you got a new 5-star review from "Jane Smith" that says:
*"Best plumbing service in Toronto! Fixed my water heater in under an hour."*

**To add it, replace review1:**

```json
"review1": {
  "text": "Best plumbing service in Toronto! Fixed my water heater in under an hour.",
  "author": "Jane Smith",
  "platform": "Google"
}
```

## Tips

### Which Reviews to Show?

Show reviews that:
- ✅ Have 5 stars
- ✅ Include specific details about your service
- ✅ Mention Ali or the team by name
- ✅ Are recent (within last 6 months)
- ✅ Highlight different services (repairs, installations, emergencies)

### Formatting Tips

- Keep reviews concise (under 200 characters works best)
- If a review is too long, you can shorten it with "..." at the end
- Keep the author's real name (builds trust)
- Always keep `"platform": "Google"` unchanged

### How Often to Update?

- **Monthly**: Check for new great reviews
- **When you hit 10 reviews**: Update to show your best
- **After exceptional service**: Wait for that customer's review

## Need Help?

If you want to change which 3 reviews to display, just send me the new review text and author names, and I'll update the files for you!

---

**Current Status:** ✅ Your website shows 3 real Google reviews with no API needed!

