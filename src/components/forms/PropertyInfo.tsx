'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, Home, Store } from 'lucide-react';

interface PropertyInfoProps {
  propertyType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  accessNotes?: string;
  onUpdate: (updates: any) => void;
}

const PropertyInfo = ({
  propertyType,
  address,
  accessNotes,
  onUpdate,
}: PropertyInfoProps) => {
  const handleAddressChange = (field: string, value: string) => {
    onUpdate({
      address: {
        ...address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Property Information
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us about your property location and type
        </p>

        <div className="space-y-2 mb-6">
          <Label className="text-base font-medium">Property Type *</Label>
          <RadioGroup
            value={propertyType}
            onValueChange={(val) => onUpdate({ propertyType: val })}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="relative">
              <RadioGroupItem value="house" id="house" className="peer sr-only" />
              <Label
                htmlFor="house"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
              >
                <Home className="w-8 h-8 mb-2 text-gray-600" />
                <span className="font-medium">House</span>
              </Label>
            </div>
            <div className="relative">
              <RadioGroupItem value="apartment" id="apartment" className="peer sr-only" />
              <Label
                htmlFor="apartment"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
              >
                <Building2 className="w-8 h-8 mb-2 text-gray-600" />
                <span className="font-medium">Apartment</span>
              </Label>
            </div>
            <div className="relative">
              <RadioGroupItem value="commercial" id="commercial" className="peer sr-only" />
              <Label
                htmlFor="commercial"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
              >
                <Store className="w-8 h-8 mb-2 text-gray-600" />
                <span className="font-medium">Commercial</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
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
          className="min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
};

export default PropertyInfo;



