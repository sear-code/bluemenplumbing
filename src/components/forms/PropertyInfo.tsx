'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  onUpdate: (updates: any) => void;
}

const PropertyInfo = ({
  propertyType,
  address,
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
          Tell us about your property type and location
        </p>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Property Type *</Label>
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

          <div>
            <Label htmlFor="city" className="text-base font-medium">
              City *
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Which city do you need service in?
            </p>
            <Input
              id="city"
              type="text"
              value={address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="Enter your city"
              className="mt-2"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;



