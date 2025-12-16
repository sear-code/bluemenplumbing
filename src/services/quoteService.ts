import { QuoteRequest, QuoteResponse } from '@/models/Quote';

export const quoteService = {
  submitQuote: async (quoteData: QuoteRequest): Promise<QuoteResponse> => {
    try {
      // Simulate API call - in production, replace with actual API endpoint
      // const response = await fetch('/api/quotes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(quoteData),
      // });
      
      // For now, simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const quoteId = `BMP-${Date.now()}`;
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 30);
      
      return {
        quoteId,
        estimatedPrice: quoteData.estimatedPrice || 0,
        estimatedDuration: 120,
        validUntil,
        message: 'Your quote request has been received. We will contact you within 24 hours.',
      };
    } catch (error) {
      console.error('Quote submission error:', error);
      throw new Error('Failed to submit quote. Please try again.');
    }
  },

  uploadPhotos: async (files: File[]): Promise<string[]> => {
    try {
      // Simulate photo upload - in production, replace with actual upload endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Return mock URLs
      return files.map((file, index) => `https://example.com/uploads/${Date.now()}-${index}`);
    } catch (error) {
      console.error('Photo upload error:', error);
      throw new Error('Failed to upload photos. Please try again.');
    }
  },
};





