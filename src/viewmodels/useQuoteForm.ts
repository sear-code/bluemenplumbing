'use client'

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
    urgency: 'standard',
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
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      // Calculate estimate after problem description step (step 3)
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
        // Step 1: Service Selection
        if (formData.selectedServices.length === 0) {
          setError('Please select at least one service');
          return false;
        }
        return true;
      case 2:
        // Step 2: Property Info (only city required)
        if (!formData.address.city || formData.address.city.trim().length === 0) {
          setError('Please enter your city');
          return false;
        }
        return true;
      case 3:
        // Step 3: Problem Description
        if (formData.problemDescription.trim().length < 10) {
          setError('Please provide a detailed description (at least 10 characters)');
          return false;
        }
        return true;
      case 4:
        // Step 4: Quote Estimate (no validation needed, just viewing)
        return true;
      case 5:
        // Step 5: Contact Info with full address
        const { firstName, lastName, email, phone } = formData.customerInfo;
        if (!firstName || !lastName || !email || !phone) {
          setError('Please fill in all required personal information fields');
          return false;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address');
          return false;
        }
        // Validate full address
        if (!formData.address.street || !formData.address.city || 
            !formData.address.state || !formData.address.zipCode) {
          setError('Please fill in all required address fields');
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
      
      setCurrentStep(6); // Show confirmation
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
      urgency: 'standard',
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





