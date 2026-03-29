import { describe, it, expect } from 'vitest';
import { quoteSubmissionSchema } from '../quote';

const validQuote = {
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(647) 500-7989',
  },
  propertyType: 'house' as const,
  address: {
    street: '123 Main St',
    city: 'Scarborough',
    state: 'Ontario',
    zipCode: 'M1R 5G2',
  },
  selectedServices: ['bathroom-rough-in-toilet'],
  selectedCategories: ['bathroom-rough-in'],
  urgency: 'standard' as const,
  estimatedPrice: 250,
  estimatedDuration: 120,
  problemDescription: 'My toilet is leaking and needs repair.',
};

describe('quoteSubmissionSchema', () => {
  it('accepts a valid quote', () => {
    const result = quoteSubmissionSchema.safeParse(validQuote);
    expect(result.success).toBe(true);
  });

  it('rejects missing first name', () => {
    const data = {
      ...validQuote,
      customerInfo: { ...validQuote.customerInfo, firstName: '' },
    };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const data = {
      ...validQuote,
      customerInfo: { ...validQuote.customerInfo, email: 'not-an-email' },
    };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone format', () => {
    const data = {
      ...validQuote,
      customerInfo: { ...validQuote.customerInfo, phone: 'abc' },
    };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects invalid urgency value', () => {
    const data = { ...validQuote, urgency: 'super-urgent' };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects negative price', () => {
    const data = { ...validQuote, estimatedPrice: -100 };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('strips HTML from text fields', () => {
    const data = {
      ...validQuote,
      customerInfo: {
        ...validQuote.customerInfo,
        firstName: '<script>alert("xss")</script>John',
      },
    };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customerInfo.firstName).toBe('alert("xss")John');
    }
  });

  it('trims whitespace from names', () => {
    const data = {
      ...validQuote,
      customerInfo: {
        ...validQuote.customerInfo,
        firstName: '  John  ',
        lastName: '  Doe  ',
      },
    };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customerInfo.firstName).toBe('John');
      expect(result.data.customerInfo.lastName).toBe('Doe');
    }
  });

  it('defaults urgency to standard', () => {
    const { urgency, ...withoutUrgency } = validQuote;
    const result = quoteSubmissionSchema.safeParse(withoutUrgency);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.urgency).toBe('standard');
    }
  });

  it('accepts minimal required fields', () => {
    const minimal = {
      customerInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        phone: '4165551234',
      },
    };
    const result = quoteSubmissionSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('rejects description shorter than 10 chars', () => {
    const data = { ...validQuote, problemDescription: 'short' };
    const result = quoteSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
