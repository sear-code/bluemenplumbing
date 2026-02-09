import { QuoteRequest, QuoteResponse } from '@/models/Quote';

export const quoteService = {
  submitQuote: async (quoteData: QuoteRequest): Promise<QuoteResponse> => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit quote');
      }
      
      return result.data;
    } catch (error) {
      console.error('Quote submission error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to submit quote. Please try again.');
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





