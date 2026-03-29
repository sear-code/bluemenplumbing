import { Metadata } from 'next';
import Link from 'next/link';
import { getServiceCategories } from '@/services/serviceData';
import { COMPANY } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: `Plumbing Services - ${COMPANY.name}`,
  description: 'Professional plumbing services in the GTA including bathroom renovations, kitchen plumbing, laundry connections, and emergency repairs.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const categories = getServiceCategories();

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Professional plumbing services for residential and commercial properties across the Greater Toronto Area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/services/${category.id}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-border hover:border-accent"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-accent font-medium">
                    ${category.priceRangeMin} - ${category.priceRangeMax}
                  </span>
                  <span className="text-muted-foreground">
                    ~{Math.round(category.estimatedDuration / 60)}h estimated
                  </span>
                </div>
                <div className="mt-4 text-sm font-medium text-accent group-hover:underline">
                  View details &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
