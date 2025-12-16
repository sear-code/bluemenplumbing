import { useState } from 'react';
import { QuoteRequest } from '@/models/Quote';
import { quoteService } from '@/services/quoteService';
import { pricingService } from '@/services/pricingService';

export const useQuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<QuoteRequest>({
    selectedServices: [],
    problemDescription: '',
    urgency: 'normal',
    propertyType: 'house',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    status: 'draft',
  });

  const updateFormData = (updates: Partial<QuoteRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const calculateEstimate = () => {
    const estimate = pricingService.calculateEstimate(
      formData.selectedServices,
      formData.urgency,
      formData.propertyType
    );
    updateFormData({ estimatedPrice: estimate });
    return estimate;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      if (currentStep === 3) {
        calculateEstimate();
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError(null);
  };

  const validateCurrentStep = (): boolean => {
    setError(null);
    
    switch (currentStep) {
      case 1:
        if (formData.selectedServices.length === 0) {
          setError('Please select at least one service');
          return false;
        }
        return true;
      case 2:
        if (formData.problemDescription.trim().length < 10) {
          setError('Please provide a detailed description (at least 10 characters)');
          return false;
        }
        return true;
      case 3:
        if (!formData.address.street || !formData.address.city || !formData.address.zipCode) {
          setError('Please fill in all required address fields');
          return false;
        }
        return true;
      case 4:
        const { firstName, email, phone } = formData.customerInfo;
        if (!firstName || !email || !phone) {
          setError('Please fill in all required contact fields');
          return false;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Upload photos if any
      if (formData.photos && formData.photos.length > 0) {
        await quoteService.uploadPhotos(formData.photos);
      }
      
      // Submit quote
      const response = await quoteService.submitQuote({
        ...formData,
        status: 'submitted',
      });
      
      setCurrentStep(5); // Show confirmation
      return response;
    } catch (err) {
      setError('Failed to submit quote. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      selectedServices: [],
      problemDescription: '',
      urgency: 'normal',
      propertyType: 'house',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      customerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      status: 'draft',
    });
    setCurrentStep(1);
    setError(null);
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    error,
    updateFormData,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    calculateEstimate,
    validateCurrentStep,
    resetForm,
  };
};





