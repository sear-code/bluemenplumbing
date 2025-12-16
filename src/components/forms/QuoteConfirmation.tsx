'use client'

import { QuoteRequest } from '@/models/Quote';
import { CheckCircle2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { pricingService } from '@/services/pricingService';

interface QuoteConfirmationProps {
  quoteData: QuoteRequest;
}

const QuoteConfirmation = ({ quoteData }: QuoteConfirmationProps) => {
  const selectedServiceDetails = quoteData.selectedServices.map(
    (id) => pricingService.getServiceById(id)
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Quote Request Submitted!
        </h2>
        <p className="text-lg text-gray-600">
          Thank you for choosing Blue Men Plumbing
        </p>
      </div>

      <Card className="p-6 bg-blue-50 border-[#4492AC]">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#4492AC] font-bold">1.</span>
                <span>Our team will review your quote request within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4492AC] font-bold">2.</span>
                <span>We'll contact you via phone or email with a detailed quote</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4492AC] font-bold">3.</span>
                <span>Once approved, we'll schedule your service at your convenience</span>
              </li>
            </ul>
          </div>

          {quoteData.estimatedPrice && (
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Estimated Price Range</p>
              <p className="text-2xl font-bold text-[#4492AC]">
                ${quoteData.estimatedPrice}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                *Final price may vary based on inspection
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Quote Summary
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Selected Services</p>
            <ul className="space-y-1">
              {selectedServiceDetails.map((service) => (
                <li key={service?.id} className="text-gray-900">
                  • {service?.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-600">Service Address</p>
              <p className="text-gray-900">
                {quoteData.address.street}, {quoteData.address.city},{' '}
                {quoteData.address.state} {quoteData.address.zipCode}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{quoteData.customerInfo.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-gray-900">{quoteData.customerInfo.phone}</p>
            </div>
          </div>

          {quoteData.preferredDateTime && (
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Preferred Date</p>
                <p className="text-gray-900">
                  {new Date(quoteData.preferredDateTime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center pt-4">
        <p className="text-gray-600 mb-4">
          Need immediate assistance?
        </p>
        <Button
          size="lg"
          className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-white"
          onClick={() => window.location.href = 'tel:+16475007989'}
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Emergency Line
        </Button>
      </div>
    </div>
  );
};

export default QuoteConfirmation;

