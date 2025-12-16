'use client'

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface ProblemDetailsProps {
  description: string;
  photos?: File[];
  onUpdate: (updates: any) => void;
}

const ProblemDetails = ({
  description,
  photos = [],
  onUpdate,
}: ProblemDetailsProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Describe the Problem
        </h2>
        <p className="text-gray-600 mb-6">
          Please provide as much detail as possible about your plumbing issue
        </p>

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
          <p className="text-sm text-gray-500">
            {description.length} characters (minimum 10 required)
          </p>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">
          Upload Photos (Optional)
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Photos help us better understand your issue and provide a more accurate quote
        </p>

        <div className="space-y-4">
          {/* Upload Button */}
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

          {/* Photo Previews */}
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

export default ProblemDetails;





