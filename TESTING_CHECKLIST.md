# Testing Checklist - Quotes Database Integration

This checklist will help you verify that the quotes database integration is working correctly.

## Prerequisites

Before testing, ensure:

- [ ] Supabase project is created
- [ ] `supabase-schema.sql` or `add-quotes-table.sql` has been run
- [ ] `.env.local` file has Supabase credentials:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Test 1: Database Schema Verification

### Steps:

1. Log into Supabase Dashboard
2. Go to **Table Editor**
3. Verify the `quotes` table exists
4. Check the following columns are present:
   - `id` (UUID, primary key)
   - `quote_id` (TEXT, unique)
   - `first_name`, `last_name`, `email`, `phone`
   - `property_type`, address fields
   - `selected_services`, `selected_categories` (JSONB)
   - `custom_service`, `problem_description`
   - `estimated_price`, `estimated_duration`
   - `status`
   - `created_at`, `updated_at`

### Expected Result:
✅ All fields are present with correct data types

---

## Test 2: Development Server Start

### Steps:

1. Open terminal in project root
2. Run: `npm run dev`
3. Wait for compilation

### Expected Result:
✅ Server starts successfully at http://localhost:3000
✅ No compilation errors
✅ No TypeScript errors

---

## Test 3: Quote Form Display

### Steps:

1. Navigate to http://localhost:3000
2. Scroll to or navigate to the quote form section

### Expected Result:
✅ Quote form displays correctly
✅ All form fields are visible
✅ No console errors (press F12 to check)

---

## Test 4: Standard Quote Submission

### Steps:

1. **Step 1 - Select Services:**
   - Select at least one service
   - Click "Next"

2. **Step 2 - Property Info:**
   - Select property type
   - Enter at least the city
   - Click "Next"

3. **Step 3 - Problem Description:**
   - Enter a description (at least 10 characters)
   - Click "Next"

4. **Step 4 - Review Quote:**
   - Review the estimated price
   - Click "Proceed"

5. **Step 5 - Contact Information:**
   - Enter first name
   - Enter last name
   - Enter email address
   - Enter phone number
   - Complete full address (street, city, state, zip)
   - Click "Submit Quote Request"

6. **Step 6 - Confirmation:**
   - Wait for submission

### Expected Result:
✅ No errors during submission
✅ Confirmation page displays
✅ Quote ID is shown (format: BMP-1234567890)
✅ Success message appears

---

## Test 5: Database Record Verification

### Steps:

1. Go to Supabase Dashboard → **Table Editor** → `quotes` table
2. Look for the most recent entry
3. Verify the data matches what you submitted:
   - Customer name
   - Email
   - Phone
   - Selected services (JSONB array)
   - Address details
   - Status should be "submitted"

### Expected Result:
✅ Record exists in database
✅ All data is correctly saved
✅ `created_at` timestamp is current
✅ `quote_id` matches the one shown in confirmation

---

## Test 6: Custom Service Request

### Steps:

1. Start a new quote
2. **Step 1 - Select Services:**
   - Don't select any predefined services
   - Enter a custom service description in the text field
   - Click "Next"
3. Should skip directly to **Step 5 - Contact Info**
4. Fill in contact information (address is optional for custom services)
5. Submit

### Expected Result:
✅ Form skips property info and problem description steps
✅ Quote submits successfully
✅ Database record shows `custom_service` field populated
✅ `selected_services` is empty array

---

## Test 7: API Endpoint Testing

### Steps:

1. Open a new browser tab
2. Navigate to: http://localhost:3000/api/quotes
3. Check the JSON response

### Expected Result:
✅ JSON response with success: true
✅ Array of quote records
✅ Count field showing number of quotes
✅ No error messages

---

## Test 8: Form Validation

### Steps:

Test each validation rule:

1. **Step 1:** Try to proceed without selecting services
2. **Step 2:** Try to proceed without entering city
3. **Step 3:** Try to proceed with less than 10 characters
4. **Step 5:** 
   - Try to proceed with missing name fields
   - Try invalid email format
   - Try without completing address (for standard quotes)

### Expected Result:
✅ Error messages appear for each validation failure
✅ Cannot proceed past invalid steps
✅ Error messages are clear and helpful

---

## Test 9: Browser Console Check

### Steps:

1. Open browser console (F12 → Console tab)
2. Submit a quote
3. Watch for any errors or warnings

### Expected Result:
✅ No JavaScript errors
✅ No failed network requests
✅ API call to /api/quotes returns 200 status

---

## Test 10: Network Tab Verification

### Steps:

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Submit a quote
4. Find the request to `/api/quotes`
5. Click on it and view:
   - **Headers** tab (should be POST request)
   - **Payload** tab (should contain your form data)
   - **Response** tab (should show success)

### Expected Result:
✅ POST request to /api/quotes
✅ Status: 200 OK
✅ Response contains success: true
✅ Quote ID is returned

---

## Test 11: Multiple Quotes

### Steps:

1. Submit 3-5 different quotes with varying data
2. Check Supabase table for all records

### Expected Result:
✅ All quotes are saved
✅ Each has unique `quote_id`
✅ Timestamps are sequential
✅ No duplicate or missing data

---

## Test 12: Photo Upload Simulation

### Steps:

1. In the problem description step
2. Try to upload photos (if photo upload UI exists)

### Expected Result:
⚠️ Note: Photo upload currently returns mock URLs
✅ Photo field accepts files
✅ No errors occur
📝 Real photo upload needs Supabase Storage implementation

---

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"

**Solution:**
1. Check `.env.local` exists
2. Verify variable names are exact:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart dev server after adding variables

### Issue: "Database error: permission denied"

**Solution:**
1. Check RLS policies are set up (run `add-quotes-table.sql`)
2. Verify `"Allow public insert quotes"` policy exists
3. Check Supabase logs for detailed error

### Issue: Quote submits but no database record

**Solution:**
1. Check browser console for errors
2. Verify Supabase URL is correct
3. Test Supabase connection directly:
   ```javascript
   // In browser console
   fetch(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

### Issue: Form displays but submission fails

**Solution:**
1. Check Network tab for failed requests
2. Look at API response error message
3. Verify all required fields are filled
4. Check server logs (terminal running npm run dev)

---

## Production Testing (After Deployment)

Once deployed to production:

- [ ] Test quote submission on live site
- [ ] Verify records appear in production Supabase
- [ ] Test from multiple devices (mobile, tablet, desktop)
- [ ] Verify email addresses are collected correctly
- [ ] Check quote IDs are unique across all submissions

---

## Performance Testing

Optional performance checks:

- [ ] Form loads in under 2 seconds
- [ ] Quote submission completes in under 3 seconds
- [ ] No memory leaks (DevTools → Memory)
- [ ] Mobile responsive design works correctly

---

## Security Verification

- [ ] `.env.local` is in `.gitignore` (not committed to git)
- [ ] RLS policies prevent unauthorized data access
- [ ] API keys are not exposed in client-side code
- [ ] Form has CSRF protection (Next.js handles this)

---

## Success Criteria

Your integration is successful when:

✅ All 11 main tests pass
✅ Quotes are consistently saved to database
✅ No errors in console or logs
✅ Form validation works correctly
✅ Data integrity is maintained

---

## Next Steps After Testing

Once all tests pass:

1. **Set up email notifications** (optional)
2. **Add Telegram notifications** (see previous guide)
3. **Create admin dashboard** to view quotes
4. **Implement photo upload** to Supabase Storage
5. **Add quote status tracking**

---

**Testing completed on:** _____________

**Tested by:** _____________

**Result:** ✅ Pass / ❌ Fail

**Notes:**
