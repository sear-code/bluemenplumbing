'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { QuoteRequest } from '@/models/Quote';
import { quoteService } from '@/services/quoteService';
import { calculateTotalPrice } from '@/services/serviceData';

const STORAGE_KEY = 'bluemen-quote-draft';
const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

const initialFormData: QuoteRequest = {
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
  pipedaConsent: false,
  status: 'draft',
};

const loadDraft = (): { formData: QuoteRequest; currentStep: number } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > DRAFT_MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return { formData: parsed.formData, currentStep: parsed.currentStep };
  } catch {
    return null;
  }
};

export const useQuoteForm = () => {
  const draft = useRef(loadDraft());
  const [hasDraft, setHasDraft] = useState(!!draft.current);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<QuoteRequest>({ ...initialFormData });

  const resumeDraft = useCallback(() => {
    if (draft.current) {
      setFormData(draft.current.formData);
      setCurrentStep(draft.current.currentStep);
    }
    setHasDraft(false);
  }, []);

  const dismissDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    draft.current = null;
    setHasDraft(false);
  }, []);

  // Save to localStorage on changes (debounced)
  useEffect(() => {
    // Don't persist if on confirmation step or if form was just submitted
    if (currentStep >= 5) return;

    const timer = setTimeout(() => {
      try {
        // Exclude File objects (not serializable)
        const { photos, ...serializableData } = formData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          formData: serializableData,
          currentStep,
          savedAt: Date.now(),
        }));
      } catch {
        // localStorage full or unavailable — ignore
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const updateFormData = (updates: Partial<QuoteRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateField = (fieldName: string, value: string): string | null => {
    let err: string | null = null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const postalCodeRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;

    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) err = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) err = 'Last name is required';
        break;
      case 'email':
        if (!value.trim()) err = 'Email is required';
        else if (!emailRegex.test(value)) err = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) err = 'Phone number is required';
        else if (value.replace(/\D/g, '').length !== 10) err = 'Please enter a valid 10-digit phone number';
        break;
      case 'street':
        if (!value.trim()) err = 'Street address is required';
        break;
      case 'city':
        if (!value.trim()) err = 'City is required';
        break;
      case 'state':
        if (!value.trim()) err = 'Province is required';
        break;
      case 'zipCode':
        if (!value.trim()) err = 'Postal code is required';
        else if (!postalCodeRegex.test(value.trim())) err = 'Please enter a valid postal code (e.g. M1S 2V5)';
        break;
      case 'problemDescription':
        if (value.trim().length < 10) err = 'Please provide at least 10 characters';
        break;
    }

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (err) next[fieldName] = err;
      else delete next[fieldName];
      return next;
    });
    return err;
  };

  const clearFieldError = (fieldName: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
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

  const isCustomOnly = (): boolean => {
    return formData.selectedServices.length === 0 &&
      !!formData.customService &&
      formData.customService.trim().length > 0;
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setError(null);
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 1 && isCustomOnly()) {
        // Skip job details and estimate — go straight to contact (step 4)
        setCurrentStep(4);
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 5));
        // Calculate estimate after job details step (step 2)
        if (currentStep === 2) {
          calculateEstimate();
        }
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 4 && isCustomOnly()) {
      // If on contact and only custom service, go back to service selection (step 1)
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
        // Step 2: Job Details (property type, city, problem description, photos)
        if (!formData.address.city || formData.address.city.trim().length === 0) {
          setError('Please enter your city');
          return false;
        }
        if (formData.problemDescription.trim().length < 10) {
          setError('Please provide a detailed description (at least 10 characters)');
          return false;
        }
        return true;
      case 3:
        // Step 3: Quote Estimate (no validation needed, just viewing)
        return true;
      case 4:
        // Step 4: Contact Info with full address
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

        // PIPEDA consent validation
        if (!formData.pipedaConsent) {
          setError('You must consent to the collection and use of your personal information to submit a quote request');
          return false;
        }

        // Validate full address only if NOT a custom-only service request
        if (!isCustomOnly()) {
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
        !!formData.customService &&
        formData.customService.trim().length > 0;
      
      // Submit quote
      const response = await quoteService.submitQuote({
        ...formData,
        status: 'submitted',
        // Add flag to indicate custom service request
        isCustomServiceRequest: hasOnlyCustomService,
      });

      setCurrentStep(5); // Show confirmation
      localStorage.removeItem(STORAGE_KEY);
      return response;
    } catch (err) {
      setError('Failed to submit quote. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setCurrentStep(1);
    setError(null);
    setFieldErrors({});
    localStorage.removeItem(STORAGE_KEY);
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
    goToStep,
    isCustomOnly,
    fieldErrors,
    validateField,
    clearFieldError,
    hasDraft,
    resumeDraft,
    dismissDraft,
  };
};





