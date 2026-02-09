'use client'

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, X, Loader2 } from 'lucide-react';
import { ServiceCategory } from '@/models/Quote';

interface ServiceSelectorTwoTierProps {
  selectedServices: string[];
  urgency: string;
  onUpdate: (updates: any) => void;
}

const ServiceSelectorTwoTier = ({
  selectedServices,
  urgency,
  onUpdate,
}: ServiceSelectorTwoTierProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customService, setCustomService] = useState<string>('');
  const [customPhotos, setCustomPhotos] = useState<File[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'database' | 'local' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch services from API on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/services');
        const result = await response.json();
        
        if (result.success && result.data) {
          setServiceCategories(result.data);
          setDataSource(result.source || 'local');
          
          // Log info for debugging
          if (result.source === 'local') {
            console.info('Using local service data - Set up Supabase for dynamic management');
          } else if (result.source === 'database') {
            console.info('Successfully loaded services from Supabase');
          }
        } else {
          setError('Failed to load services. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleToggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }

    // Track which categories are selected
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleToggleServiceItem = (itemId: string) => {
    const updated = selectedServices.includes(itemId)
      ? selectedServices.filter((id) => id !== itemId)
      : [...selectedServices, itemId];
    onUpdate({ selectedServices: updated });
  };

  const getCategoryItemCount = (categoryId: string): number => {
    const category = serviceCategories.find(c => c.id === categoryId);
    if (!category) return 0;
    return category.items.filter(item => selectedServices.includes(item.id)).length;
  };

  const formatPriceRange = (min: number, max: number): string => {
    if (min === max) return `$${min}`;
    return `$${min}-$${max}`;
  };

  const handleCustomServiceChange = (value: string) => {
    setCustomService(value);
    onUpdate({ customService: value });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      const updatedPhotos = [...customPhotos, ...newPhotos];
      setCustomPhotos(updatedPhotos);
      onUpdate({ photos: updatedPhotos });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = customPhotos.filter((_, i) => i !== index);
    setCustomPhotos(updatedPhotos);
    onUpdate({ photos: updatedPhotos });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4492AC] mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="border-[#4492AC] text-[#4492AC] hover:bg-[#4492AC] hover:text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Services</h2>
        <p className="text-gray-600 mb-6">
          Choose a service category, then select the specific items you need
        </p>

        <div className="space-y-4">
          {serviceCategories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const itemCount = getCategoryItemCount(category.id);
            const hasSelectedItems = itemCount > 0;

            return (
              <div key={category.id} className="space-y-2">
                {/* Category Card */}
                <Card
                  className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    hasSelectedItems
                      ? 'border-[#4492AC] border-2 bg-blue-50'
                      : isExpanded
                      ? 'border-[#4492AC] shadow-md'
                      : 'border-gray-200 hover:border-[#4492AC]'
                  }`}
                  onClick={() => handleToggleCategory(category.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="secondary" className="bg-gray-100">
                          {formatPriceRange(category.priceRangeMin, category.priceRangeMax)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {category.items.length} service{category.items.length !== 1 ? 's' : ''} available
                        </span>
                        {hasSelectedItems && (
                          <Badge className="bg-[#4492AC] text-white">
                            {itemCount} selected
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {hasSelectedItems && (
                        <CheckCircle2 className="w-6 h-6 text-[#4492AC]" />
                      )}
                      {isExpanded ? (
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </Card>

                {/* Sub-items (expandable) */}
                {isExpanded && (
                  <div className="ml-8 pl-4 border-l-2 border-[#4492AC] space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-3 mt-2">
                      Select the specific services you need:
                    </p>
                    {category.items.map((item) => {
                      const isSelected = selectedServices.includes(item.id);

                      return (
                        <Card
                          key={item.id}
                          className={`p-4 cursor-pointer transition-all duration-150 hover:shadow-md ${
                            isSelected
                              ? 'border-[#4492AC] bg-blue-50'
                              : 'border-gray-200 hover:border-[#4492AC]/50'
                          }`}
                          onClick={() => handleToggleServiceItem(item.id)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                {item.partsExtra && (
                                  <Badge variant="outline" className="text-xs">
                                    Parts Extra
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[#4492AC] font-semibold">
                                  ${item.unitPrice}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ~{item.estimatedDuration} min
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {isSelected ? (
                                <CheckCircle2 className="w-5 h-5 text-[#4492AC]" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Other/Custom Service Section */}
          <div className="space-y-2 mt-4">
            <Card
              className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                expandedCategory === 'other'
                  ? 'border-[#4492AC] shadow-md'
                  : customService.trim().length > 0
                  ? 'border-[#4492AC] border-2 bg-blue-50'
                  : 'border-gray-200 hover:border-[#4492AC]'
              }`}
              onClick={() => {
                if (expandedCategory === 'other') {
                  setExpandedCategory(null);
                } else {
                  setExpandedCategory('other');
                }
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Other Service
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Service not listed? Describe what you need and we'll provide a custom quote
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="secondary" className="bg-gray-100">
                      Contact for Quote
                    </Badge>
                    {customService.trim().length > 0 && (
                      <Badge className="bg-[#4492AC] text-white">
                        Custom service added
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  {customService.trim().length > 0 && (
                    <CheckCircle2 className="w-6 h-6 text-[#4492AC]" />
                  )}
                  {expandedCategory === 'other' ? (
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </Card>

            {/* Custom Service Input */}
            {expandedCategory === 'other' && (
              <div className="ml-8 pl-4 border-l-2 border-[#4492AC] space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3 mt-2">
                    Please describe the plumbing service you need:
                  </p>
                  <Textarea
                    placeholder="Example: Need to relocate kitchen sink, install water softener system, etc."
                    value={customService}
                    onChange={(e) => handleCustomServiceChange(e.target.value)}
                    className="min-h-[120px] resize-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Photo Upload Section */}
                <div onClick={(e) => e.stopPropagation()}>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Photos help us understand your needs better and provide a more accurate quote
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photos
                  </Button>

                  {/* Photo Preview */}
                  {customPhotos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium text-gray-700">
                        {customPhotos.length} photo{customPhotos.length !== 1 ? 's' : ''} uploaded
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {customPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative group border border-gray-200 rounded-lg p-2"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                <Upload className="w-4 h-4 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-700 truncate">
                                  {photo.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(photo.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(index)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <X className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Our team will review your request and contact you with a detailed custom quote.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Urgency Level
        </h3>
        <RadioGroup 
          value={urgency} 
          onValueChange={(val) => onUpdate({ urgency: val })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#4492AC] transition-colors">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="cursor-pointer flex-1">
              <span className="font-medium">Standard</span>
              <span className="text-sm text-gray-500 ml-2">(24-48 hours)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-[#FF8C00] bg-orange-50 hover:border-[#FF8C00] transition-colors">
            <RadioGroupItem value="emergency" id="emergency" />
            <Label htmlFor="emergency" className="cursor-pointer flex-1">
              <span className="font-medium text-[#FF8C00]">Emergency</span>
              <span className="text-sm text-gray-600 ml-2">(immediately)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Summary */}
      {(selectedServices.length > 0 || customService.trim().length > 0) && (
        <Card className="p-4 bg-blue-50 border-[#4492AC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {selectedServices.length > 0 && (
                  <span>{selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected</span>
                )}
                {selectedServices.length > 0 && customService.trim().length > 0 && (
                  <span> + custom service</span>
                )}
                {selectedServices.length === 0 && customService.trim().length > 0 && (
                  <span>Custom service added</span>
                )}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Review your selection and continue
              </p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-[#4492AC]" />
          </div>
        </Card>
      )}
    </div>
  );
};

export default ServiceSelectorTwoTier;

