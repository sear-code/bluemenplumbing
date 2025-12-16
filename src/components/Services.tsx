'use client'

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Wrench, Settings, Droplets, Bath } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Wrench,
      title: t('services.emergency.title'),
      description: t('services.emergency.description'),
      image: '/assets/services/emergency.jpg',
      color: 'text-red-500'
    },
    {
      icon: Droplets,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      image: '/assets/services/drain-cleaning.jpg',
      color: 'text-blue-500'
    },
    {
      icon: Settings,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      image: '/assets/services/pipes.jpg',
      color: 'text-primary'
    },
    {
      icon: Bath,
      title: t('services.bathroom.title'),
      description: t('services.bathroom.description'),
      image: '/assets/services/bathroom-renovations.jpg',
      color: 'text-primary-glow'
    }
  ];

  const handleServiceClick = (serviceTitle: string) => {
    // Scroll to contact section for now
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 animate-fade-in hover:scale-105 transition-all duration-500 shadow-elegant hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleServiceClick(service.title)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full bg-[#045372] backdrop-blur-sm mr-3">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#94E2FC] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  More info
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide pb-4">
          <div className="flex space-x-4 w-max px-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 w-72 flex-shrink-0 animate-fade-in hover:scale-105 transition-all duration-500 shadow-elegant"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleServiceClick(service.title)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-[#045372] backdrop-blur-sm mr-3">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#94E2FC] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    More info
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;