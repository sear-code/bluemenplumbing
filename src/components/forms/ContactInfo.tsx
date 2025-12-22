'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
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
  onUpdate: (updates: any) => void;
}

const ContactInfo = ({
  customerInfo,
  address,
  accessNotes,
  preferredDateTime,
  onUpdate,
}: ContactInfoProps) => {
  const [date, setDate] = useState<Date | undefined>(
    preferredDateTime ? new Date(preferredDateTime) : undefined
  );

  const handleCustomerInfoChange = (field: string, value: string) => {
    onUpdate({
      customerInfo: {
        ...customerInfo,
        [field]: value,
      },
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    onUpdate({
      address: {
        ...address,
        [field]: value,
      },
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onUpdate({
      preferredDateTime: selectedDate ? selectedDate.toISOString() : undefined,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contact & Service Address
        </h2>
        <p className="text-gray-600 mb-6">
          Please provide your contact details and complete service address
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
                  placeholder="John"
                  className="mt-2"
                  required
                />
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
                  placeholder="Doe"
                  className="mt-2"
                  required
                />
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
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="mt-2"
                required
              />
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
                placeholder="john.doe@example.com"
                className="mt-2"
                required
              />
            </div>
          </div>

          {/* Service Address */}
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
                placeholder="123 Main Street"
                className="mt-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-base font-medium">
                  City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="City"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="state" className="text-base font-medium">
                  State/Province *
                </Label>
                <Input
                  id="state"
                  type="text"
                  value={address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  placeholder="State"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-base font-medium">
                  ZIP/Postal Code *
                </Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={address.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  placeholder="12345"
                  className="mt-2"
                  required
                />
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
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Label className="text-base font-medium mb-2 block">
          Preferred Date & Time (Optional)
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          When would you like us to perform the service?
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {date && (
          <p className="text-sm text-gray-600 mt-2">
            We'll do our best to accommodate your preferred date. Our team will contact you to confirm availability.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;





