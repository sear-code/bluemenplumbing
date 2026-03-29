'use client'

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, X, Home, Building2, Store } from 'lucide-react';
import { useState } from 'react';

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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Job Details
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us about your property and the plumbing issue
        </p>

        {/* Property Type */}
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

          {/* City */}
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

      {/* Problem Description */}
      <div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
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
        <Label className="text-base font-medium mb-3 block">
          Upload Photos (Optional)
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Photos help us better understand your issue and provide a more accurate quote
        </p>

        <div className="space-y-4">
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
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
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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





