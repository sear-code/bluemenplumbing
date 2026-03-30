'use client'

import Image from 'next/image';

const photos = [
  { src: '/assets/photos/professional-plumbing-installation.jpeg', alt: 'Professional plumbing installation' },
  { src: '/assets/photos/plumbing-fixture-repair.jpeg', alt: 'Plumbing fixture repair' },
  { src: '/assets/photos/residential-pipe-installation.jpeg', alt: 'Residential pipe installation' },
  { src: '/assets/photos/bathroom-plumbing-renovation.jpeg', alt: 'Bathroom plumbing renovation' },
  { src: '/assets/photos/completed-plumbing-project.jpeg', alt: 'Completed plumbing project' },
  { src: '/assets/photos/kitchen-plumbing-service.jpeg', alt: 'Kitchen plumbing service' },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects completed by our licensed team across the GTA
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
