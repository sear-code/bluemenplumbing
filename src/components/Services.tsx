'use client'

import { useTranslation } from 'react-i18next';
import { Wrench, Settings, Droplets, Bath } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Wrench,
      title: t('services.emergency.title'),
      description: t('services.emergency.description'),
      image: '/assets/services/emergency.jpg',
      alt: 'Emergency plumbing repair - burst pipe being fixed by a professional plumber',
      href: '/services/repairs-troubleshooting',
    },
    {
      icon: Droplets,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      image: '/assets/services/drain-cleaning.jpg',
      alt: 'Drain cleaning service - professional maintenance of residential plumbing',
      href: '/services/bathroom-finishing',
    },
    {
      icon: Settings,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      image: '/assets/services/pipes.jpg',
      alt: 'Plumbing installation - new pipe and fixture installation in a home',
      href: '/services/bathroom-rough-in',
    },
    {
      icon: Bath,
      title: t('services.bathroom.title'),
      description: t('services.bathroom.description'),
      image: '/assets/services/bathroom-renovations.jpg',
      alt: 'Bathroom renovation - modern bathroom with newly installed plumbing fixtures',
      href: '/services/kitchen-plumbing',
    },
  ];

  const ServiceCard = ({ service, index, className }: { service: typeof services[number]; index: number; className?: string }) => (
    <Link
      href={service.href}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl h-80 animate-fade-in hover:scale-105 transition-all duration-500 shadow-elegant hover:shadow-glow block ${className || ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Image
        src={service.image}
        alt={service.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 1024px) 288px, 25vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center mb-3">
          <div className="p-2 rounded-full bg-primary backdrop-blur-sm mr-3">
            <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-foreground transition-colors">
          {service.title}
        </h3>
        <p className="text-white/90 text-sm line-clamp-2">
          {service.description}
        </p>
      </div>
    </Link>
  );

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
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide pb-4">
          <div className="flex space-x-4 w-max px-4">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} className="w-72 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
