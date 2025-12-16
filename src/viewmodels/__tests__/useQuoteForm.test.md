# Manual Testing Guide for Quote Form

## Test Cases

### 1. Service Selection (Step 1)
- [ ] Can select single service
- [ ] Can select multiple services
- [ ] Can deselect services
- [ ] Selected services show visual feedback (blue border, checkmark)
- [ ] Can change urgency level
- [ ] Emergency urgency shows orange styling
- [ ] Cannot proceed without selecting at least one service
- [ ] Error message displays when trying to proceed without selection

### 2. Problem Details (Step 2)
- [ ] Can type in description textarea
- [ ] Character count updates in real-time
- [ ] Cannot proceed with less than 10 characters
- [ ] Error message shows for short descriptions
- [ ] Can upload photos (click or drag)
- [ ] Photo previews display correctly
- [ ] Can remove uploaded photos
- [ ] Multiple photos can be uploaded
- [ ] Can proceed without photos (optional)

### 3. Property Information (Step 3)
- [ ] Can select property type (House/Apartment/Commercial)
- [ ] Selected property type shows visual feedback
- [ ] All address fields are required
- [ ] Cannot proceed with empty required fields
- [ ] Access notes are optional
- [ ] Form validates before proceeding

### 4. Contact Information (Step 4)
- [ ] First name is required
- [ ] Last name is optional
- [ ] Email validation works
- [ ] Invalid email shows error
- [ ] Phone number is required
- [ ] Date picker opens on click
- [ ] Can select future dates only
- [ ] Past dates are disabled
- [ ] Preferred date is optional
- [ ] Cannot proceed with invalid data

### 5. Confirmation (Step 5)
- [ ] Shows success message
- [ ] Displays selected services
- [ ] Shows complete address
- [ ] Shows contact information
- [ ] Shows preferred date if selected
- [ ] Displays estimated price
- [ ] Shows next steps information
- [ ] Emergency call button works

### 6. Navigation
- [ ] "Previous" button disabled on step 1
- [ ] "Previous" button works on steps 2-4
- [ ] "Next" button advances to next step
- [ ] "Submit" button shows on step 4
- [ ] Progress bar updates correctly
- [ ] Step counter displays correctly
- [ ] Cannot skip steps

### 7. Pricing Calculation
- [ ] Base price calculated correctly
- [ ] Emergency urgency adds 50%
- [ ] Urgent urgency adds 25%
- [ ] Commercial property adds 30%
- [ ] Multiple services sum correctly
- [ ] Estimate displays on confirmation

### 8. Error Handling
- [ ] Error messages are clear
- [ ] Errors clear when corrected
- [ ] Form submission error shows message
- [ ] Network errors handled gracefully

### 9. Responsive Design
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Touch interactions work on mobile
- [ ] Buttons are easily tappable
- [ ] Text is readable on all sizes

### 10. Accessibility
- [ ] Can navigate with keyboard only
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Radio buttons work with arrow keys
- [ ] Form labels are associated correctly
- [ ] Error messages are announced

### 11. Internationalization
- [ ] English translations display correctly
- [ ] French translations display correctly
- [ ] Language switch works mid-form
- [ ] Form data persists on language change

### 12. Dialog/Modal
- [ ] Opens when "Request Free Quote" clicked
- [ ] Can close with X button
- [ ] Can close with Escape key
- [ ] Scrolls correctly on small screens
- [ ] Backdrop click closes modal
- [ ] Form resets on close (optional behavior)

## Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance
- [ ] Form loads quickly
- [ ] No lag when typing
- [ ] Photo upload is responsive
- [ ] Smooth transitions between steps
- [ ] No console errors
- [ ] No console warnings

## Expected Behavior

### Pricing Examples
1. **Single Service (Drain Cleaning, Normal, House)**
   - Base: $150
   - Expected: $150

2. **Emergency Service (Leak Repair, Emergency, House)**
   - Base: $200
   - Emergency multiplier: +50%
   - Expected: $300

3. **Commercial Property (Water Heater, Normal, Commercial)**
   - Base: $350
   - Commercial multiplier: +30%
   - Expected: $455

4. **Multiple Services (Drain + Leak, Urgent, House)**
   - Base: $150 + $200 = $350
   - Urgent multiplier: +25%
   - Expected: $438

## Known Issues / Notes
- Photo upload is currently mocked (no actual upload)
- Quote submission is simulated (no backend)
- Email notifications not implemented
- Admin panel integration pending





