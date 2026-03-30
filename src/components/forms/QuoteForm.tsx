'use client'

import { useQuoteForm } from '@/viewmodels/useQuoteForm';
import ServiceSelectorTwoTier from './ServiceSelectorTwoTier';
import JobDetails from './ProblemDetails';
import ContactInfo from './ContactInfo';
import QuoteEstimate from './QuoteEstimate';
import QuoteConfirmation from './QuoteConfirmation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const QuoteForm = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    error,
    updateFormData,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    goToStep,
    isCustomOnly,
    fieldErrors,
    validateField,
    clearFieldError,
    hasDraft,
    resumeDraft,
    dismissDraft,
  } = useQuoteForm();

  const totalSteps = 5;
  const userSteps = totalSteps - 1;
  const progress = Math.min((currentStep / userSteps) * 100, 100);

  const allStepTitles = [
    'Select Services',
    'Job Details',
    'Your Quote',
    'Contact Details',
    'Confirmation',
  ];

  const shortStepLabels = ['Services', 'Details', 'Quote', 'Contact', 'Done'];

  const customOnly = isCustomOnly();
  const applicableSteps = customOnly ? [1, 4] : [1, 2, 3, 4];
  const currentApplicableIndex = applicableSteps.indexOf(currentStep) + 1;
  const applicableTotal = applicableSteps.length;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectorTwoTier
            selectedServices={formData.selectedServices}
            urgency={formData.urgency}
            customService={formData.customService}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <JobDetails
            description={formData.problemDescription}
            photos={formData.photos}
            propertyType={formData.propertyType}
            address={formData.address}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <QuoteEstimate
            quoteData={formData}
            onUpdate={updateFormData}
            onGoToStep={goToStep}
          />
        );
      case 4:
        return (
          <ContactInfo
            customerInfo={formData.customerInfo}
            address={formData.address}
            accessNotes={formData.accessNotes}
            preferredDateTime={formData.preferredDateTime}
            pipedaConsent={formData.pipedaConsent}
            onUpdate={updateFormData}
            isCustomServiceOnly={customOnly}
            fieldErrors={fieldErrors}
            validateField={validateField}
            clearFieldError={clearFieldError}
          />
        );
      case 5:
        return <QuoteConfirmation quoteData={formData} />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 3) return 'Proceed';
    if (currentStep === 4) return 'Submit Quote Request';
    return 'Next';
  };

  const getButtonIcon = () => {
    if (currentStep === 3) return <CheckCircle className="w-4 h-4 ml-2" />;
    if (currentStep === 4) return null;
    return <ArrowRight className="w-4 h-4 ml-2" />;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 max-w-4xl mx-auto w-full">
      {/* Sticky Header */}
      {currentStep < 5 && (
        <div className="sticky top-0 z-10 bg-white px-4 md:px-6 pt-5 md:pt-6 pb-3 md:pb-4 border-b border-gray-100">
          {/* Title: hidden on mobile to save space */}
          <h1 className="hidden md:block text-3xl font-bold text-gray-900 mb-2">
            Request a Free Quote
          </h1>

          {/* Step Indicator — labeled chips on mobile, full labels on desktop */}
          <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
            {applicableSteps.map((step, idx) => {
              const isCompleted = currentApplicableIndex > idx + 1;
              const isCurrent = currentApplicableIndex === idx + 1;
              return (
                <div key={step} className="flex items-center gap-1.5 md:gap-2">
                  <button
                    type="button"
                    onClick={() => isCompleted ? goToStep(step) : undefined}
                    disabled={!isCompleted}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={`flex items-center gap-1 md:gap-1.5 text-xs font-medium transition-colors ${
                      isCurrent
                        ? 'text-accent'
                        : isCompleted
                        ? 'text-accent cursor-pointer hover:underline'
                        : 'text-gray-400'
                    }`}
                  >
                    <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold border-2 transition-colors flex-shrink-0 ${
                      isCurrent
                        ? 'border-[#4492AC] bg-[#4492AC] text-white'
                        : isCompleted
                        ? 'border-[#4492AC] bg-[#4492AC]/10 text-[#4492AC]'
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? '✓' : idx + 1}
                    </span>
                    {/* Short labels on mobile, full labels on desktop */}
                    <span className="md:hidden text-[11px]">{shortStepLabels[step - 1]}</span>
                    <span className="hidden md:inline">{allStepTitles[step - 1]}</span>
                  </button>
                  {idx < applicableSteps.length - 1 && (
                    <div className={`w-4 md:w-10 h-0.5 flex-shrink-0 ${isCompleted ? 'bg-[#4492AC]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          <Progress value={(currentApplicableIndex / applicableTotal) * 100} className="h-1.5 md:h-1.5" />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4">
        {/* Draft Resume Banner — compact on mobile */}
        {hasDraft && currentStep === 1 && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 border border-[#4492AC] rounded-lg flex items-center justify-between gap-2 md:gap-3">
            <p className="text-xs md:text-sm text-gray-700 flex-1">Continue your unfinished quote?</p>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" onClick={resumeDraft} className="bg-[#4492AC] hover:bg-[#4492AC]/90 text-xs h-8">
                Resume
              </Button>
              <Button size="sm" variant="ghost" onClick={dismissDraft} className="text-xs h-8 px-2">
                ✕
              </Button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4 md:mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md md:shadow-lg p-4 md:p-8">
          {renderStep()}
        </div>
      </div>

      {/* Sticky Footer Navigation */}
      {currentStep < 5 && (
        <div className="sticky bottom-0 z-10 bg-white px-4 md:px-6 py-3 md:py-4 border-t border-gray-100">
          {/* Mobile: text link for back + full-width primary button */}
          <div className="md:hidden space-y-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
                Previous step
              </button>
            )}
            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                className="min-h-[48px] w-full bg-[#4492AC] hover:bg-[#4492AC]/90 text-base"
              >
                {getButtonText()}
                {getButtonIcon()}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-h-[48px] w-full bg-[#4492AC] hover:bg-[#4492AC]/90 text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </Button>
            )}
          </div>

          {/* Desktop: side-by-side buttons */}
          <div className="hidden md:flex justify-between items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="min-h-[48px] px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                className="min-h-[48px] px-6 bg-[#4492AC] hover:bg-[#4492AC]/90"
              >
                {getButtonText()}
                {getButtonIcon()}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-h-[48px] px-6 bg-[#4492AC] hover:bg-[#4492AC]/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
