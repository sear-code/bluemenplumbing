import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  preferredDateTime?: string;
  onUpdate: (updates: any) => void;
}

const ContactInfo = ({
  customerInfo,
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
          Contact Information
        </h2>
        <p className="text-gray-600 mb-6">
          How can we reach you with your quote?
        </p>

        <div className="space-y-4">
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
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                placeholder="Doe"
                className="mt-2"
              />
            </div>
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
        </div>
      </div>

      <div>
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





