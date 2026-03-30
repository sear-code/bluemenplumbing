'use client'

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Home, Building2, Store, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { CORE_CITIES, EXTENDED_CITIES, getTravelFee } from '@/config/serviceAreas';
import { COMPANY } from '@/lib/constants';

interface JobDetailsProps {
  description: string;
  photos?: File[];
  propertyType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  onUpdate: (updates: any) => void;
}

const JobDetails = ({
  description,
  photos = [],
  propertyType,
  address,
  onUpdate,
}: JobDetailsProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleAddressChange = (field: string, value: string) => {
    onUpdate({
      address: {
        ...address,
        [field]: value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = [...photos, ...files];

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviews]);

    onUpdate({ photos: newPhotos });
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);

    // Revoke the URL to free memory
    URL.revokeObjectURL(previewUrls[index]);

    setPreviewUrls(newPreviews);
    onUpdate({ photos: newPhotos });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Job Details
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Tell us about your property and the plumbing issue
        </p>

        {/* Property Type */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <Label id="propertyType-label" className="text-sm md:text-base font-medium mb-3 block">Property Type *</Label>
            <RadioGroup
              value={propertyType}
              onValueChange={(val) => onUpdate({ propertyType: val })}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
              aria-labelledby="propertyType-label"
            >
              <div className="relative">
                <RadioGroupItem value="house" id="house" className="peer sr-only" />
                <Label
                  htmlFor="house"
                  className="flex flex-col items-center justify-center p-3 md:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
                >
                  <Home className="w-6 h-6 md:w-8 md:h-8 mb-1.5 md:mb-2 text-gray-600" />
                  <span className="font-medium">House</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="apartment" id="apartment" className="peer sr-only" />
                <Label
                  htmlFor="apartment"
                  className="flex flex-col items-center justify-center p-3 md:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
                >
                  <Building2 className="w-6 h-6 md:w-8 md:h-8 mb-1.5 md:mb-2 text-gray-600" />
                  <span className="font-medium">Apartment</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="commercial" id="commercial" className="peer sr-only" />
                <Label
                  htmlFor="commercial"
                  className="flex flex-col items-center justify-center p-3 md:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#4492AC] peer-data-[state=checked]:border-[#4492AC] peer-data-[state=checked]:bg-blue-50 transition-all"
                >
                  <Store className="w-6 h-6 md:w-8 md:h-8 mb-1.5 md:mb-2 text-gray-600" />
                  <span className="font-medium">Commercial</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="text-sm md:text-base font-medium">
              City *
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Which city do you need service in?
            </p>
            <Select
              value={address.city}
              onValueChange={(val) => handleAddressChange('city', val)}
            >
              <SelectTrigger id="city" className="mt-2">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="flex items-center gap-1.5 text-green-700">
                    <MapPin className="w-3.5 h-3.5" />
                    Core Service Area
                  </SelectLabel>
                  {CORE_CITIES.map(city => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="flex items-center gap-1.5 text-[#4492AC]">
                    <MapPin className="w-3.5 h-3.5" />
                    Extended Service Area
                  </SelectLabel>
                  {EXTENDED_CITIES.map(city => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="__not_listed__">
                    My city isn't listed
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* City feedback */}
            {address.city && address.city !== '__not_listed__' && (() => {
              const result = getTravelFee(address.city);
              if (result.type === 'core') {
                return (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    No travel charge for your area
                  </p>
                );
              }
              if (result.type === 'extended') {
                return (
                  <p className="text-sm text-[#4492AC] mt-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Travel fee: ${result.fee} ({result.distanceKm}km from {result.nearestCoreCity})
                  </p>
                );
              }
              return null;
            })()}

            {address.city === '__not_listed__' && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                <p className="text-sm text-amber-800">
                  Please call us to check availability in your area.
                </p>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phoneFormatted}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm md:text-base font-medium">
            Problem Description *
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onUpdate({ problemDescription: e.target.value })}
            placeholder="Example: The kitchen sink is draining slowly and making gurgling sounds. Water backs up when the dishwasher runs..."
            className="min-h-[150px] resize-none"
            required
          />
          <p className={`text-sm ${description.length > 0 && description.length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
            {description.length} characters{description.length > 0 && description.length < 10 ? ` (${10 - description.length} more needed)` : ' (minimum 10 required)'}
          </p>
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <Label htmlFor="photo-upload" className="text-sm md:text-base font-medium mb-3 block">
          Upload Photos (Optional)
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Photos help us better understand your issue and provide a more accurate quote
        </p>

        <div className="space-y-4">
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
