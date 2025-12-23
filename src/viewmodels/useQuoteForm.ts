'use client'

import { useState } from 'react';
import { QuoteRequest } from '@/models/Quote';
import { quoteService } from '@/services/quoteService';
import { calculateTotalPrice } from '@/services/serviceData';

export const useQuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<QuoteRequest>({
    selectedServices: [],
    selectedCategories: [],
    customService: '',
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
    const estimate = calculateTotalPrice(
      formData.selectedServices,
      formData.urgency,
      formData.propertyType
    );
    updateFormData({ estimatedPrice: estimate });
    return estimate;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      // Check if only custom service is selected (no predefined services)
      const hasOnlyCustomService = 
        formData.selectedServices.length === 0 && 
        formData.customService && 
        formData.customService.trim().length > 0;

      if (currentStep === 1 && hasOnlyCustomService) {
        // Skip property info, problem description, and quote estimate
        // Go straight to contact info (step 5)
        setCurrentStep(5);
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 6));
        // Calculate estimate after problem description step (step 3)
        if (currentStep === 3) {
          calculateEstimate();
        }
      }
    }
  };

  const handlePreviousStep = () => {
    // Check if only custom service is selected
    const hasOnlyCustomService = 
      formData.selectedServices.length === 0 && 
      formData.customService && 
      formData.customService.trim().length > 0;

    if (currentStep === 5 && hasOnlyCustomService) {
      // If on contact info and only custom service, go back to service selection (step 1)
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
    setError(null);
  };

  const validateCurrentStep = (): boolean => {
    setError(null);
    
    switch (currentStep) {
      case 1:
        // Step 1: Service Selection
        const hasSelectedServices = formData.selectedServices.length > 0;
        const hasCustomService = formData.customService && formData.customService.trim().length > 0;
        
        if (!hasSelectedServices && !hasCustomService) {
          setError('Please select at least one service or describe a custom service');
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
        
        // For custom service requests, address is optional (we'll get it during follow-up)
        const hasOnlyCustomService = 
          formData.selectedServices.length === 0 && 
          formData.customService && 
          formData.customService.trim().length > 0;
        
        // Validate full address only if NOT a custom-only service request
        if (!hasOnlyCustomService) {
          if (!formData.address.street || !formData.address.city || 
              !formData.address.state || !formData.address.zipCode) {
            setError('Please fill in all required address fields');
            return false;
          }
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
      
      // Check if this is a custom service request
      const hasOnlyCustomService = 
        formData.selectedServices.length === 0 && 
        formData.customService && 
        formData.customService.trim().length > 0;
      
      // Submit quote
      const response = await quoteService.submitQuote({
        ...formData,
        status: 'submitted',
        // Add flag to indicate custom service request
        isCustomServiceRequest: hasOnlyCustomService,
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
      selectedCategories: [],
      customService: '',
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





