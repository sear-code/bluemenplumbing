'use client'

import { useTranslation } from 'react-i18next';
import { Wrench, Settings, Droplets, Bath, ArrowRight } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Wrench,
      title: t('services.emergency.title'),
      stat: t('services.emergency.stat'),
      insight: t('services.emergency.insight'),
    },
    {
      icon: Droplets,
      title: t('services.maintenance.title'),
      stat: t('services.maintenance.stat'),
      insight: t('services.maintenance.insight'),
    },
    {
      icon: Settings,
      title: t('services.installation.title'),
      stat: t('services.installation.stat'),
      insight: t('services.installation.insight'),
    },
    {
      icon: Bath,
      title: t('services.bathroom.title'),
      stat: t('services.bathroom.stat'),
      insight: t('services.bathroom.insight'),
    },
  ];

  const handleServiceClick = () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ServiceCard = ({ service, index, className }: { service: typeof services[number]; index: number; className?: string }) => (
    <button
      type="button"
      onClick={handleServiceClick}
      className={`group relative bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-left w-full
        animate-fade-in transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:border-primary/30
        ${className || ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="p-2 lg:p-3 rounded-full bg-primary/10 w-fit mb-3 lg:mb-5">
        <service.icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" aria-hidden="true" />
      </div>

      {/* Stat */}
      <div className="text-2xl lg:text-4xl font-bold text-primary mb-2 lg:mb-3">
        {service.stat}
      </div>

      {/* Insight */}
      <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
        {service.insight}
      </p>

      {/* Service Name + Arrow */}
      <div className="flex items-center gap-1.5 lg:gap-2 text-foreground font-semibold text-xs lg:text-sm">
        {service.title}
        <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );

  return (
    <section id="services" className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 lg:mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
