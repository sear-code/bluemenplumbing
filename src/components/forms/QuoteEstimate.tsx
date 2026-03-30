'use client'

import { QuoteRequest } from '@/models/Quote';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getServiceItemById, calculateTotalDuration, calculateTotalPrice } from '@/services/serviceData';
import { Clock, DollarSign, AlertCircle, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { applyPriceMarkup } from '@/lib/utils';
import { EMERGENCY_FEE } from '@/lib/constants';

interface QuoteEstimateProps {
  quoteData: QuoteRequest;
  onUpdate?: (updates: Partial<QuoteRequest>) => void;
  onGoToStep?: (step: number) => void;
}

const formatItemPrice = (item: { unitPrice: number; priceMin?: number; priceMax?: number }): string => {
  if (item.priceMin != null && item.priceMax != null) {
    const min = applyPriceMarkup(item.priceMin);
    const max = applyPriceMarkup(item.priceMax);
    if (min === max) return `$${min}`;
    return `$${min} - $${max}`;
  }
  return `$${applyPriceMarkup(item.unitPrice)}`;
};

const QuoteEstimate = ({ quoteData, onUpdate, onGoToStep }: QuoteEstimateProps) => {
  const selectedServiceDetails = quoteData.selectedServices
    .map((id) => getServiceItemById(id))
    .filter(Boolean);

  const totalDuration = calculateTotalDuration(quoteData.selectedServices);

  const livePrice = calculateTotalPrice(
    quoteData.selectedServices,
    quoteData.urgency,
    quoteData.propertyType
  );

  const isEmergency = quoteData.urgency === 'emergency';
  const emergencyMin = applyPriceMarkup(EMERGENCY_FEE);

  // Calculate base total (without emergency) to determine if emergency fee applies
  const baseTotal = calculateTotalPrice(
    quoteData.selectedServices,
    'standard',
    quoteData.propertyType
  );

  const emergencyFeeApplied = isEmergency && baseTotal < emergencyMin;

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return { text: 'Emergency', color: 'bg-[#FF8C00] text-white' };
      default:
        return { text: 'Standard', color: 'bg-[#2C5F7F] text-white' };
    }
  };

  const urgencyLabel = getUrgencyLabel(quoteData.urgency);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Estimated Quote
        </h2>
        <p className="text-gray-600 mb-6">
          Based on the information provided, here's your estimated cost
        </p>
      </div>

      {/* Price Display */}
      <Card className="p-8 bg-gradient-to-br from-[#4492AC] to-[#357a91] text-white">
        <div className="text-center">
          <p className="text-lg opacity-90 mb-2">Estimated Total</p>
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="w-8 h-8" />
            <span className="text-5xl font-bold">
              {livePrice || 0}
            </span>
          </div>
          <p className="text-sm opacity-75 mt-3">
            *Final price may vary based on inspection
          </p>
        </div>
      </Card>

      {/* Quote Details */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Quote Details
        </h3>

        <div className="space-y-4">
          {/* Services */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Selected Services
            </p>
            <div className="space-y-2">
              {selectedServiceDetails.map((serviceData) => {
                if (!serviceData) return null;
                const { category, item } = serviceData;
                return (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">
                          {category.name}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {item.name}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <span className="text-gray-900 font-semibold">
                            {formatItemPrice(item)}
                          </span>
                          {item.partsExtra && (
                            <p className="text-xs text-orange-600 mt-1">
                              + parts
                            </p>
                          )}
                        </div>
                        {onUpdate && (
                          <button
                            type="button"
                            onClick={() => {
                              const remaining = quoteData.selectedServices.filter(id => id !== item.id);
                              const newPrice = calculateTotalPrice(remaining, quoteData.urgency, quoteData.propertyType);
                              onUpdate({ selectedServices: remaining, estimatedPrice: newPrice });
                            }}
                            className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Emergency Fee Line Item */}
              {isEmergency && emergencyFeeApplied && (
                <div className="p-3 bg-orange-50 rounded-lg border border-[#FF8C00]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#FF8C00] font-medium mb-1">Emergency Service</p>
                      <p className="text-gray-900 font-medium">Emergency Service Fee</p>
                      <p className="text-xs text-gray-600 mt-1">Includes all selected services</p>
                    </div>
                    <span className="text-gray-900 font-semibold">${emergencyMin}</span>
                  </div>
                </div>
              )}
              {isEmergency && !emergencyFeeApplied && (
                <div className="p-3 bg-orange-50 rounded-lg border border-[#FF8C00]">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#FF8C00] text-white text-xs">Emergency</Badge>
                    <span className="text-sm text-gray-700">Emergency priority — no additional charge</span>
                  </div>
                </div>
              )}

              {/* Custom Service */}
              {quoteData.customService && quoteData.customService.trim().length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-[#4492AC]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-[#4492AC] font-medium mb-1">
                        Custom Service Request
                      </p>
                      <p className="text-gray-900 font-medium text-sm">
                        {quoteData.customService}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-600">
                        Quote Required
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {onGoToStep && (
              <Button
                variant="link"
                className="text-[#4492AC] p-0 h-auto mt-2"
                onClick={() => onGoToStep(1)}
              >
                <Pencil className="w-3 h-3 mr-1" />
                Edit Services
              </Button>
            )}
          </div>

          {/* Property & Location */}
          <div className="flex items-center justify-between py-3 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">
              Property Type
            </span>
            <span className="text-gray-900 capitalize">
              {quoteData.propertyType}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">
              Location
            </span>
            <span className="text-gray-900">
              {quoteData.address.city}
            </span>
          </div>

          {/* Urgency */}
          <div className="flex items-center justify-between py-3 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">
              Service Level
            </span>
            <Badge className={urgencyLabel.color}>
              {urgencyLabel.text}
            </Badge>
          </div>

          {/* Estimated Duration */}
          <div className="flex items-center justify-between py-3 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">
              Estimated Duration
            </span>
            <div className="flex items-center gap-1 text-gray-900">
              <Clock className="w-4 h-4" />
              <span>~{Math.round(totalDuration / 60)} hours</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Information Notice */}
      <Card className="p-4 bg-blue-50 border-[#4492AC]">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#4492AC] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              <strong>Next Step:</strong> To proceed with this quote and book your service,
              we'll need your contact information and full service address. Click "Proceed"
              below to continue.
            </p>
          </div>
        </div>
      </Card>

      {/* What's Included */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-3">
          What's Included
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#4492AC] font-bold">&#10003;</span>
            <span>Professional licensed plumbers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4492AC] font-bold">&#10003;</span>
            <span>All necessary tools and equipment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4492AC] font-bold">&#10003;</span>
            <span>Cleanup after service completion</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#4492AC] font-bold">&#10003;</span>
            <span>Satisfaction guarantee</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default QuoteEstimate;
