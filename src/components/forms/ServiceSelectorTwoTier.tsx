'use client'

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Droplets,
  Wrench,
  CookingPot,
  Bath,
  ArrowDownCircle,
  Filter,
  Zap,
} from 'lucide-react';
import { ServiceCategory } from '@/models/Quote';
import { applyPriceMarkup } from '@/lib/utils';

interface ServiceSelectorTwoTierProps {
  selectedServices: string[];
  urgency: string;
  customService?: string;
  onUpdate: (updates: any) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  repair: Droplets,
  installation: Wrench,
  kitchen: CookingPot,
  bathroom: Bath,
  unclog: ArrowDownCircle,
  filter: Filter,
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const ServiceSelectorTwoTier = ({
  selectedServices,
  urgency,
  customService: initialCustomService = '',
  onUpdate,
}: ServiceSelectorTwoTierProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customService, setCustomService] = useState<string>(initialCustomService);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/services');
      const result = await response.json();

      if (result.success && result.data) {
        setServiceCategories(result.data);
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

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        // On mobile: single-expand (auto-close others)
        if (isMobile) {
          next.clear();
        }
        next.add(categoryId);
      }
      return next;
    });

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
    const markedUpMin = applyPriceMarkup(min);
    const markedUpMax = applyPriceMarkup(max);
    if (markedUpMin === markedUpMax) return `$${markedUpMin}`;
    return `$${markedUpMin} - $${markedUpMax}`;
  };

  const formatItemPrice = (item: { unitPrice: number; priceMin?: number; priceMax?: number }): string => {
    if (item.priceMin != null && item.priceMax != null) {
      const min = applyPriceMarkup(item.priceMin);
      const max = applyPriceMarkup(item.priceMax);
      if (min === max) return `$${min}`;
      return `$${min} - $${max}`;
    }
    return `$${applyPriceMarkup(item.unitPrice)}`;
  };

  const handleCustomServiceChange = (value: string) => {
    setCustomService(value);
    onUpdate({ customService: value });
  };

  const isEmergency = urgency === 'emergency';

  const handleEmergencyToggle = (checked: boolean) => {
    onUpdate({ urgency: checked ? 'emergency' : 'standard' });
  };

  const getRunningTotal = (): string => {
    if (selectedServices.length === 0) return '';
    let total = 0;
    for (const id of selectedServices) {
      for (const cat of serviceCategories) {
        const item = cat.items.find(i => i.id === id);
        if (item) {
          const price = item.priceMin ?? item.unitPrice;
          total += applyPriceMarkup(price);
          break;
        }
      }
    }
    if (isEmergency) {
      const emergencyMin = applyPriceMarkup(250);
      total = Math.max(emergencyMin, total);
    }
    return `~$${total}`;
  };

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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          onClick={() => fetchServices()}
          variant="outline"
          className="border-[#4492AC] text-[#4492AC] hover:bg-[#4492AC] hover:text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Emergency Toggle — compact on mobile */}
      <Card
        className={`p-3 md:p-5 transition-all duration-200 ${
          isEmergency
            ? 'border-[#FF8C00] border-2 bg-orange-50'
            : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-start gap-2 md:gap-3">
            <Zap className={`w-5 h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0 ${isEmergency ? 'text-[#FF8C00]' : 'text-gray-400'}`} />
            <div>
              <h3 className={`font-semibold text-sm md:text-lg ${isEmergency ? 'text-[#FF8C00]' : 'text-gray-900'}`}>
                Emergency service?
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                $300 flat fee — we come immediately
              </p>
            </div>
          </div>
          <Switch
            checked={isEmergency}
            onCheckedChange={handleEmergencyToggle}
            className="flex-shrink-0"
          />
        </div>
      </Card>

      {/* Service Selection */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">What do you need help with?</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Tap a category, then select services
        </p>

        <div className="space-y-3 md:space-y-4">
          {serviceCategories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const itemCount = getCategoryItemCount(category.id);
            const hasSelectedItems = itemCount > 0;
            const IconComponent = CATEGORY_ICONS[category.category];

            return (
              <div key={category.id} className="space-y-1.5 md:space-y-2">
                {/* Category Card — compact on mobile */}
                <Card
                  className={`p-3 md:p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    hasSelectedItems
                      ? 'border-[#4492AC] border-2 bg-blue-50'
                      : isExpanded
                      ? 'border-[#4492AC] shadow-md'
                      : 'border-gray-200 hover:border-[#4492AC]'
                  }`}
                  onClick={() => handleToggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between gap-2 md:gap-3">
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      {IconComponent && (
                        <IconComponent className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ${
                          hasSelectedItems ? 'text-[#4492AC]' : 'text-gray-400'
                        }`} />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm md:text-lg text-gray-900 truncate">
                            {category.name}
                          </h3>
                          {hasSelectedItems && (
                            <Badge className="bg-[#4492AC] text-white text-[10px] md:text-xs px-1.5 py-0 md:px-2">
                              {itemCount}
                            </Badge>
                          )}
                        </div>
                        {/* Description: hidden on mobile when collapsed */}
                        <p className={`text-sm text-gray-600 mt-1 ${isExpanded ? '' : 'hidden md:block'}`}>
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
                          <Badge variant="secondary" className="bg-gray-100 text-xs md:text-xs px-2.5 md:px-3 py-0.5">
                            {formatPriceRange(category.priceRangeMin, category.priceRangeMax)}
                          </Badge>
                          <span className="text-[10px] md:text-xs text-gray-500">
                            {category.items.length} service{category.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5 md:gap-2">
                      {hasSelectedItems && (
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#4492AC] hidden md:block" />
                      )}
                      <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Card>

                {/* Sub-items — less indentation on mobile */}
                {isExpanded && (
                  <div className="ml-3 pl-3 md:ml-8 md:pl-4 border-l-2 border-[#4492AC] space-y-2">
                    <p className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3 mt-1.5 md:mt-2">
                      Select the services you need:
                    </p>
                    {category.items.map((item) => {
                      const isSelected = selectedServices.includes(item.id);

                      return (
                        <Card
                          key={item.id}
                          className={`p-3 md:p-4 cursor-pointer transition-all duration-150 hover:shadow-md ${
                            isSelected
                              ? 'border-[#4492AC] bg-blue-50'
                              : 'border-gray-200 hover:border-[#4492AC]/50'
                          }`}
                          onClick={() => handleToggleServiceItem(item.id)}
                        >
                          <div className="flex items-center justify-between gap-2 md:gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                                <h4 className="font-medium text-sm md:text-base text-gray-900">
                                  {item.name}
                                </h4>
                                {item.partsExtra && (
                                  <Badge variant="outline" className="text-[10px] md:text-xs px-1 md:px-1.5">
                                    Parts Extra
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                                  {item.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                                <span className="text-[#4492AC] font-semibold text-xs md:text-base">
                                  {formatItemPrice(item)}
                                </span>
                                <span className="text-[10px] md:text-xs text-gray-500">
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
          <div className="space-y-1.5 md:space-y-2 mt-2 md:mt-4">
            <Card
              className={`p-3 md:p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                expandedCategories.has('other')
                  ? 'border-[#4492AC] shadow-md'
                  : customService.trim().length > 0
                  ? 'border-[#4492AC] border-2 bg-blue-50'
                  : 'border-gray-200 hover:border-[#4492AC]'
              }`}
              onClick={() => {
                setExpandedCategories(prev => {
                  const next = new Set(prev);
                  if (next.has('other')) {
                    next.delete('other');
                  } else {
                    if (isMobile) next.clear();
                    next.add('other');
                  }
                  return next;
                });
              }}
            >
              <div className="flex items-center justify-between gap-2 md:gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm md:text-lg text-gray-900">
                      Other Service
                    </h3>
                    {customService.trim().length > 0 && (
                      <Badge className="bg-[#4492AC] text-white text-[10px] md:text-xs px-1.5 md:px-2">
                        Added
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm text-gray-600 mt-1 ${expandedCategories.has('other') ? '' : 'hidden md:block'}`}>
                    Service not listed? Describe what you need
                  </p>
                  <div className="flex items-center gap-2 mt-1 md:mt-3">
                    <Badge variant="secondary" className="bg-gray-100 text-[10px] md:text-xs px-1.5 md:px-2">
                      Contact for Quote
                    </Badge>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 md:gap-2">
                  {customService.trim().length > 0 && (
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#4492AC] hidden md:block" />
                  )}
                  <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-200 ${expandedCategories.has('other') ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </Card>

            {/* Custom Service Input */}
            {expandedCategories.has('other') && (
              <div className="ml-3 pl-3 md:ml-8 md:pl-4 border-l-2 border-[#4492AC] space-y-3 md:space-y-4">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3 mt-1.5 md:mt-2">
                    Describe the service you need:
                  </p>
                  <Textarea
                    placeholder="Example: Need to relocate kitchen sink, install water softener system, etc."
                    value={customService}
                    onChange={(e) => handleCustomServiceChange(e.target.value)}
                    className="min-h-[100px] md:min-h-[120px] resize-none text-sm md:text-base"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <p className="text-[10px] md:text-xs text-gray-500">
                  You can add photos in the next step. Our team will contact you with a custom quote.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary with running total */}
      {(selectedServices.length > 0 || customService.trim().length > 0) && (
        <Card className="p-3 md:p-4 bg-blue-50 border-[#4492AC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-900">
                {selectedServices.length > 0 && (
                  <span>{selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected</span>
                )}
                {selectedServices.length > 0 && customService.trim().length > 0 && (
                  <span> + custom</span>
                )}
                {selectedServices.length === 0 && customService.trim().length > 0 && (
                  <span>Custom service added</span>
                )}
              </p>
              {selectedServices.length > 0 && (
                <p className="text-[10px] md:text-xs text-gray-600 mt-0.5 md:mt-1">
                  Estimated: {getRunningTotal()}
                  {isEmergency && ' (incl. emergency)'}
                </p>
              )}
            </div>
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#4492AC]" />
          </div>
        </Card>
      )}
    </div>
  );
};

export default ServiceSelectorTwoTier;
