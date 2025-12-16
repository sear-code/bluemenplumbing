# Quote Generator Feature

## Overview
The Quote Generator is a comprehensive, multi-step form that allows customers to request plumbing service quotes. It follows the MVVM (Model-View-ViewModel) architecture pattern for maintainability and scalability.

## Architecture

### MVVM Structure
```
src/
├── models/
│   └── Quote.ts                    # Data models and TypeScript interfaces
├── services/
│   ├── quoteService.ts            # API calls for quote submission
│   └── pricingService.ts          # Pricing calculation logic
├── viewmodels/
│   └── useQuoteForm.ts            # Form state management hook
├── components/
│   ├── QuoteGenerator.tsx         # Main landing section on homepage
│   └── forms/
│       ├── QuoteForm.tsx          # Main form container with stepper
│       ├── ServiceSelector.tsx    # Step 1: Service selection
│       ├── ProblemDetails.tsx     # Step 2: Problem description & photos
│       ├── PropertyInfo.tsx       # Step 3: Property details & address
│       ├── ContactInfo.tsx        # Step 4: Contact information
│       └── QuoteConfirmation.tsx  # Step 5: Success confirmation
```

## Features

### 1. Multi-Step Form Flow
- **Step 1: Service Selection**
  - Multiple service selection
  - Urgency level (Flexible, Normal, Urgent, Emergency)
  - Visual service cards with pricing

- **Step 2: Problem Details**
  - Rich text description
  - Photo upload capability
  - Character count validation

- **Step 3: Property Information**
  - Property type selection (House, Apartment, Commercial)
  - Complete address form
  - Access notes for technicians

- **Step 4: Contact Information**
  - Customer name, email, phone
  - Preferred date/time picker
  - Email validation

- **Step 5: Confirmation**
  - Quote summary
  - Estimated price display
  - Next steps information

### 2. Pricing Engine
The pricing service calculates estimates based on:
- Base service prices
- Urgency multipliers (Emergency: +50%, Urgent: +25%)
- Property type multipliers (Commercial: +30%)

### 3. Design Features
- Follows Blue Men Plumbing brand colors:
  - Primary Blue: `#004D77`
  - Accent Blue: `#007ACC`
  - Emergency Orange: `#FF8C00`
- Fully responsive (mobile, tablet, desktop)
- Accessible with keyboard navigation
- Progress indicator
- Form validation with error messages
- Loading states

### 4. Internationalization
- English (en) and French (fr) translations
- Uses react-i18next for language switching
- All text content is translatable

## Usage

### On Homepage
The `QuoteGenerator` component is displayed between the Hero and Services sections:

```tsx
import QuoteGenerator from '@/components/QuoteGenerator';

<QuoteGenerator />
```

### Standalone Form
The form can also be used independently:

```tsx
import QuoteForm from '@/components/forms/QuoteForm';

<QuoteForm />
```

## Configuration

### Services Data
Edit `src/services/pricingService.ts` to modify:
- Available services
- Base pricing
- Service categories
- Estimated durations

### API Integration
Currently uses mock API calls. To integrate with a real backend:

1. Update `src/services/quoteService.ts`:
```typescript
export const quoteService = {
  submitQuote: async (quoteData: QuoteRequest): Promise<QuoteResponse> => {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    });
    return await response.json();
  },
  // ... other methods
};
```

2. Set up your backend endpoint to handle POST requests to `/api/quotes`

## Customization

### Colors
Update the Tailwind classes in components to match your brand:
- Primary buttons: `bg-[#004D77]`
- Secondary buttons: `bg-[#007ACC]`
- Emergency buttons: `bg-[#FF8C00]`

### Form Steps
To add/remove steps:
1. Update `totalSteps` in `QuoteForm.tsx`
2. Add new step component in `src/components/forms/`
3. Add case in `renderStep()` switch statement
4. Update validation in `useQuoteForm.ts`

### Services
Add new services in `src/services/pricingService.ts`:
```typescript
{
  id: 'new-service',
  name: 'New Service Name',
  description: 'Service description',
  basePrice: 200,
  estimatedDuration: 90,
  category: 'repair',
  isEmergency: false,
}
```

## Best Practices

### State Management
- All form state is managed in the `useQuoteForm` hook
- Follows single source of truth principle
- Uses React hooks for reactivity

### Validation
- Client-side validation on each step
- Real-time error feedback
- Prevents progression with invalid data

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly

### Performance
- Lazy loading of components
- Optimized re-renders
- Image optimization for uploads

## Testing Checklist

- [ ] All form steps navigate correctly
- [ ] Service selection works (single and multiple)
- [ ] Urgency level changes pricing
- [ ] Photo upload and removal works
- [ ] Address form validates properly
- [ ] Email validation works
- [ ] Date picker functions correctly
- [ ] Form submission shows confirmation
- [ ] Responsive on mobile, tablet, desktop
- [ ] Translations work in both languages
- [ ] Error messages display correctly
- [ ] Progress bar updates accurately

## Future Enhancements

1. **Backend Integration**
   - Real API endpoints
   - Database storage
   - Email notifications
   - Admin dashboard

2. **Advanced Features**
   - Save draft quotes
   - Quote history for returning customers
   - Real-time chat support
   - Video upload capability
   - Google Maps integration for address

3. **Analytics**
   - Track form abandonment
   - Popular services
   - Conversion rates
   - Average quote values

## Support

For issues or questions about the quote generator:
1. Check this documentation
2. Review component comments
3. Test with dev tools console open
4. Verify all dependencies are installed

## Dependencies

Required packages:
- `react` & `react-dom`
- `react-i18next` (translations)
- `date-fns` (date formatting)
- `lucide-react` (icons)
- `@radix-ui/*` (UI components)
- `tailwindcss` (styling)

All dependencies are listed in `package.json`.





