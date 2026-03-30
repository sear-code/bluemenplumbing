'use client'

import Image from 'next/image';

const photos = [
  { src: '/assets/photos/JPEG image-42E9-90DF-04-0.jpeg', alt: 'Plumbing project - professional installation' },
  { src: '/assets/photos/JPEG image-42E9-90DF-04-3.jpeg', alt: 'Plumbing project - fixture work' },
  { src: '/assets/photos/JPEG image-42E9-90DF-04-4.jpeg', alt: 'Plumbing project - pipe installation' },
  { src: '/assets/photos/JPEG image-42E9-90DF-04-5.jpeg', alt: 'Plumbing project - bathroom work' },
  { src: '/assets/photos/JPEG image-42E9-90DF-04-6.jpeg', alt: 'Plumbing project - renovation' },
  { src: '/assets/photos/JPEG image-42E9-90DF-04-8.jpeg', alt: 'Plumbing project - completed work' },
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
