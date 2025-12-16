'use client'

import { pricingService } from '@/services/pricingService';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

interface ServiceSelectorProps {
  selectedServices: string[];
  urgency: string;
  onUpdate: (updates: any) => void;
}

const ServiceSelector = ({
  selectedServices,
  urgency,
  onUpdate,
}: ServiceSelectorProps) => {
  const services = pricingService.getServices();

  const handleToggleService = (serviceId: string) => {
    const updated = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];
    onUpdate({ selectedServices: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Services</h2>
        <p className="text-gray-600 mb-6">
          Choose the plumbing services you need (you can select multiple)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <Card
                key={service.id}
                className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#4492AC] border-2 bg-blue-50'
                    : 'border-gray-200 hover:border-[#4492AC]'
                }`}
                onClick={() => handleToggleService(service.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {service.name}
                      </h3>
                      {service.isEmergency && (
                        <Badge className="bg-[#FF8C00] text-white hover:bg-[#FF8C00]/90">
                          Emergency
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-gray-100">
                        From ${service.basePrice}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        ~{service.estimatedDuration} min
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-[#4492AC]" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

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
            <RadioGroupItem value="flexible" id="flexible" />
            <Label htmlFor="flexible" className="cursor-pointer flex-1">
              <span className="font-medium">Flexible</span>
              <span className="text-sm text-gray-500 ml-2">(within 1-2 weeks)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#4492AC] transition-colors">
            <RadioGroupItem value="normal" id="normal" />
            <Label htmlFor="normal" className="cursor-pointer flex-1">
              <span className="font-medium">Normal</span>
              <span className="text-sm text-gray-500 ml-2">(within 3-5 days)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#4492AC] transition-colors">
            <RadioGroupItem value="urgent" id="urgent" />
            <Label htmlFor="urgent" className="cursor-pointer flex-1">
              <span className="font-medium">Urgent</span>
              <span className="text-sm text-gray-500 ml-2">(within 24-48 hours)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-[#FF8C00] bg-orange-50 hover:border-[#FF8C00] transition-colors">
            <RadioGroupItem value="emergency" id="emergency" />
            <Label htmlFor="emergency" className="cursor-pointer flex-1">
              <span className="font-medium text-[#FF8C00]">Emergency</span>
              <span className="text-sm text-gray-600 ml-2">(immediate response)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ServiceSelector;



