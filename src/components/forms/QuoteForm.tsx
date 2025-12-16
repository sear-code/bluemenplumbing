import { useQuoteForm } from '@/viewmodels/useQuoteForm';
import ServiceSelector from './ServiceSelector';
import ProblemDetails from './ProblemDetails';
import PropertyInfo from './PropertyInfo';
import ContactInfo from './ContactInfo';
import QuoteConfirmation from './QuoteConfirmation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

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
  } = useQuoteForm();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Select Services',
    'Describe Problem',
    'Property Details',
    'Contact Info',
    'Confirmation',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelector
            selectedServices={formData.selectedServices}
            urgency={formData.urgency}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <ProblemDetails
            description={formData.problemDescription}
            photos={formData.photos}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <PropertyInfo
            propertyType={formData.propertyType}
            address={formData.address}
            accessNotes={formData.accessNotes}
            onUpdate={updateFormData}
          />
        );
      case 4:
        return (
          <ContactInfo
            customerInfo={formData.customerInfo}
            preferredDateTime={formData.preferredDateTime}
            onUpdate={updateFormData}
          />
        );
      case 5:
        return <QuoteConfirmation quoteData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      {currentStep < 5 && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Request a Free Quote
          </h1>
          <p className="text-gray-600 mb-4">
            Step {currentStep} of {totalSteps - 1}: {stepTitles[currentStep - 1]}
          </p>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 5 && (
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNextStep}
              className="px-6 bg-[#4492AC] hover:bg-[#4492AC]/90"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 bg-[#28A745] hover:bg-[#28A745]/90"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteForm;



