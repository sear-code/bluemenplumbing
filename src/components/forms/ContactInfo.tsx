'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface ContactInfoProps {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  accessNotes?: string;
  preferredDateTime?: string;
  pipedaConsent?: boolean;
  onUpdate: (updates: any) => void;
  isCustomServiceOnly?: boolean;
  fieldErrors?: Record<string, string>;
  validateField?: (fieldName: string, value: string) => string | null;
  clearFieldError?: (fieldName: string) => void;
}

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatPostalCode = (value: string): string => {
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  if (clean.length <= 3) return clean;
  return `${clean.slice(0, 3)} ${clean.slice(3)}`;
};

const ContactInfo = ({
  customerInfo,
  address,
  accessNotes,
  preferredDateTime,
  pipedaConsent = false,
  onUpdate,
  isCustomServiceOnly = false,
  fieldErrors = {},
  validateField,
  clearFieldError,
}: ContactInfoProps) => {
  const [date, setDate] = useState<Date | undefined>(
    preferredDateTime ? new Date(preferredDateTime) : undefined
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleCustomerInfoChange = (field: string, value: string) => {
    clearFieldError?.(field);
    onUpdate({
      customerInfo: {
        ...customerInfo,
        [field]: value,
      },
    });
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    clearFieldError?.('phone');
    onUpdate({
      customerInfo: {
        ...customerInfo,
        phone: formatted,
      },
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    clearFieldError?.(field);
    onUpdate({
      address: {
        ...address,
        [field]: value,
      },
    });
  };

  const handlePostalCodeChange = (value: string) => {
    const formatted = formatPostalCode(value);
    clearFieldError?.('zipCode');
    onUpdate({
      address: {
        ...address,
        zipCode: formatted,
      },
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onUpdate({
      preferredDateTime: selectedDate ? selectedDate.toISOString() : undefined,
    });
  };

  const inputErrorClass = (field: string) =>
    fieldErrors[field] ? 'border-red-500 ring-1 ring-red-500' : '';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isCustomServiceOnly ? 'Contact Information' : 'Contact & Service Address'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isCustomServiceOnly
            ? 'Please provide your contact details so we can discuss your custom service request'
            : 'Please provide your contact details and complete service address'}
        </p>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-base font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={customerInfo.firstName}
                  onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                  onBlur={() => validateField?.('firstName', customerInfo.firstName)}
                  placeholder="John"
                  className={`mt-2 ${inputErrorClass('firstName')}`}
                  required
                  aria-invalid={!!fieldErrors.firstName}
                  aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
                />
                {fieldErrors.firstName && (
                  <p id="firstName-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.firstName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-base font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={customerInfo.lastName}
                  onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                  onBlur={() => validateField?.('lastName', customerInfo.lastName)}
                  placeholder="Doe"
                  className={`mt-2 ${inputErrorClass('lastName')}`}
                  required
                  aria-invalid={!!fieldErrors.lastName}
                  aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
                />
                {fieldErrors.lastName && (
                  <p id="lastName-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => validateField?.('phone', customerInfo.phone)}
                placeholder="(647) 500-7989"
                className={`mt-2 ${inputErrorClass('phone')}`}
                maxLength={14}
                required
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                onBlur={() => validateField?.('email', customerInfo.email)}
                placeholder="john.doe@example.com"
                className={`mt-2 ${inputErrorClass('email')}`}
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* Service Address */}
          {!isCustomServiceOnly && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Address</h3>
              <div>
                <Label htmlFor="street" className="text-base font-medium">
                  Street Address *
                </Label>
                <Input
                  id="street"
                  type="text"
                  value={address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  onBlur={() => validateField?.('street', address.street)}
                  placeholder="123 Main Street"
                  className={`mt-2 ${inputErrorClass('street')}`}
                  required
                  aria-invalid={!!fieldErrors.street}
                  aria-describedby={fieldErrors.street ? 'street-error' : undefined}
                />
                {fieldErrors.street && (
                  <p id="street-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-base font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={address.city}
                    readOnly
                    className="mt-2 bg-gray-50 text-gray-600 cursor-not-allowed"
                    tabIndex={-1}
                  />
                  <p className="text-xs text-gray-500 mt-1">Pre-filled from previous step</p>
                </div>

                <div>
                  <Label htmlFor="state" className="text-base font-medium">
                    Province *
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    value={address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    onBlur={() => validateField?.('state', address.state)}
                    placeholder="Ontario"
                    className={`mt-2 ${inputErrorClass('state')}`}
                    required
                    aria-invalid={!!fieldErrors.state}
                    aria-describedby={fieldErrors.state ? 'state-error' : undefined}
                  />
                  {fieldErrors.state && (
                    <p id="state-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.state}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-base font-medium">
                    Postal Code *
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    onBlur={() => validateField?.('zipCode', address.zipCode)}
                    placeholder="M1S 2V5"
                    className={`mt-2 ${inputErrorClass('zipCode')}`}
                    maxLength={7}
                    required
                    aria-invalid={!!fieldErrors.zipCode}
                    aria-describedby={fieldErrors.zipCode ? 'zipCode-error' : undefined}
                  />
                  {fieldErrors.zipCode && (
                    <p id="zipCode-error" role="alert" className="text-sm text-red-500 mt-1">{fieldErrors.zipCode}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="accessNotes" className="text-base font-medium">
                  Access Notes (Optional)
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  Any special instructions for accessing the property?
                </p>
                <Textarea
                  id="accessNotes"
                  value={accessNotes || ''}
                  onChange={(e) => onUpdate({ accessNotes: e.target.value })}
                  placeholder="Example: Gate code is 1234, park in the driveway, dog in backyard..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PIPEDA Privacy Consent */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="pipedaConsent"
            checked={pipedaConsent}
            onCheckedChange={(checked) => onUpdate({ pipedaConsent: checked === true })}
            className="mt-1"
          />
          <div className="flex-1">
            <Label
              htmlFor="pipedaConsent"
              className="text-sm font-medium leading-relaxed cursor-pointer"
            >
              I consent to the collection, use, and disclosure of my personal information *
            </Label>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              By checking this box, I consent to Blue Men Plumbing collecting, using, and disclosing my personal information
              (including name, contact details, address, and service request details) for the purposes of processing my quote
              request, providing plumbing services, and communicating with me about my service needs. You may withdraw your
              consent at any time by contacting us directly.
            </p>
          </div>
        </div>
      </div>

      {!isCustomServiceOnly && (
        <div className="pt-4 border-t border-gray-200">
          <Label className="text-base font-medium mb-2 block">
            Preferred Date & Time (Optional)
          </Label>
          <p className="text-sm text-gray-600 mb-4">
            When would you like us to perform the service?
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full md:w-[300px] justify-start text-left font-normal"
            onClick={() => setCalendarOpen(!calendarOpen)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
            {date && (
              <span
                role="button"
                className="ml-auto p-0.5 rounded-full hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDateSelect(undefined);
                  setCalendarOpen(false);
                }}
              >
                <X className="h-3 w-3 text-gray-500" />
              </span>
            )}
          </Button>

          {calendarOpen && (
            <div className="mt-2 border rounded-lg shadow-md bg-white w-full md:w-fit overflow-x-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  handleDateSelect(d);
                  setCalendarOpen(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </div>
          )}

          {date && (
            <p className="text-sm text-gray-600 mt-2">
              We'll do our best to accommodate your preferred date. Our team will contact you to confirm availability.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
