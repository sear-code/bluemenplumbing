# Google Reviews Integration Setup Guide

This guide will help you set up the Google Places API to display real Google reviews on your website.

## Prerequisites

- A Google Cloud Platform account
- Your business listed on Google Business Profile
- A credit card (for Google Cloud Platform billing, though the free tier should cover typical usage)

## Step 1: Get Your Google Place ID

Your Google Place ID uniquely identifies your business on Google Maps.

### Option 1: Using the Place ID Finder Tool

1. Visit the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "Blue Men Plumbing" or your business address
3. Click on the marker for your business
4. Copy the Place ID from the info window

### Option 2: Using Google Search

1. Search for your business on Google: "Blue Men Plumbing"
2. Look at the URL when you click on your business
3. The Place ID is in the URL after `ftid=` or as a parameter

### Option 3: Manual Search

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your business: "Blue Men Plumbing, 65 Canadian Rd, Scarborough, ON"
3. Right-click on your business location
4. The Place ID will be in the details panel

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Name it "Blue Men Plumbing Website" (or any name you prefer)
5. Click "Create"

## Step 3: Enable the Places API

1. In the [Google Cloud Console](https://console.cloud.google.com/), select your project
2. Go to "APIs & Services" > "Library"
3. Search for "Places API"
4. Click on "Places API"
5. Click "Enable"

## Step 4: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key that's generated
4. Click "Restrict Key" (recommended for security)

### Restrict the API Key (Recommended)

1. Under "Application restrictions":
   - For development: Choose "None"
   - For production: Choose "HTTP referrers (web sites)"
     - Add your website domain: `https://bluemenplumbing.com/*`
     - Add your development domain: `http://localhost:3000/*`

2. Under "API restrictions":
   - Choose "Restrict key"
   - Select only "Places API"

3. Click "Save"

## Step 5: Configure Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_actual_place_id_here
```

Example:
```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyDx1234567890abcdefghijklmnopqrst
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

## Step 6: Set Up Billing (Required)

Google requires a billing account, but they offer a generous free tier:

1. Go to "Billing" in Google Cloud Console
2. Link a billing account or create a new one
3. Add a credit card

**Free Tier for Places API:**
- $200 free credit per month
- Place Details API: $17 per 1,000 requests
- With caching (1 hour), you'll make very few requests

## Step 7: Test Your Integration

1. Restart your development server:
```bash
npm run dev
```

2. Visit your website's testimonials section
3. You should now see real Google reviews loading

## Troubleshooting

### Reviews Not Loading

1. **Check the Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab

2. **Verify API Key**
   - Make sure the API key is correct in `.env.local`
   - Ensure there are no extra spaces or quotes

3. **Verify Place ID**
   - Test your Place ID with the [Place Details API Playground](https://developers.google.com/maps/documentation/places/web-service/details)

4. **Check API Restrictions**
   - Go to Google Cloud Console > Credentials
   - Make sure your website domain is allowed
   - For local development, ensure `localhost` is allowed

5. **Enable Places API**
   - Verify that Places API is enabled in your project
   - Go to "APIs & Services" > "Library" and search for "Places API"

6. **Billing Issues**
   - Ensure billing is set up in Google Cloud Console
   - Check for any billing alerts

### Common Error Messages

- **"REQUEST_DENIED"**: API key is invalid or Places API is not enabled
- **"INVALID_REQUEST"**: Place ID is incorrect
- **"OVER_QUERY_LIMIT"**: You've exceeded the API quota (shouldn't happen with caching)
- **"ZERO_RESULTS"**: The Place ID doesn't have any reviews

## Security Best Practices

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Keep your API keys secret

2. **Use API Restrictions**
   - Always restrict your API key to specific domains
   - Restrict to only the APIs you need

3. **Monitor Usage**
   - Check your Google Cloud Console regularly
   - Set up billing alerts

4. **Server-Side API Route**
   - The reviews are fetched through `/api/google-reviews`
   - This adds a layer of security and allows caching

## Caching

The implementation includes 1-hour caching to minimize API requests:
- Reviews are cached on the server for 1 hour
- This reduces costs and improves performance
- You can adjust the cache duration in `app/api/google-reviews/route.ts`

## Customization

### Change Number of Reviews Displayed

In `src/components/Testimonials.tsx`, find this line:
```typescript
const topReviews = getTopReviews(data.reviews, 3, 4);
```

Change `3` to show more/fewer reviews, and `4` to change the minimum star rating.

### Adjust Cache Duration

In `app/api/google-reviews/route.ts`, find:
```typescript
next: { revalidate: 3600 } // 3600 seconds = 1 hour
```

Change `3600` to your preferred cache duration in seconds.

## Support

For Google Cloud Platform issues:
- [Google Cloud Support](https://cloud.google.com/support)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)

For website integration issues:
- Check the browser console for errors
- Review the API route: `/app/api/google-reviews/route.ts`
- Review the service: `/src/services/googleReviewsService.ts`

## Cost Estimation

With the implemented caching (1 hour):
- Average website with 1,000 visitors/day
- ~1,000 unique review loads per day = ~1,000 API requests
- Cost: ~$0.017/day or ~$0.51/month
- Well within the $200/month free credit

## Next Steps

1. ✅ Set up Google Cloud Project
2. ✅ Enable Places API
3. ✅ Create and restrict API key
4. ✅ Find your Place ID
5. ✅ Configure `.env.local`
6. ✅ Test the integration
7. ✅ Deploy to production

---

**Note:** Make sure to add `.env.local` to your `.gitignore` file to prevent accidentally committing your API keys to version control. The repository already includes `.env.local.example` as a template.

