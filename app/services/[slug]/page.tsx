import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceCategories, getCategoryById } from '@/services/serviceData';
import { COMPANY } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getServiceCategories();
  return categories.map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug);
  if (!category) return {};

  return {
    title: `${category.name} - ${COMPANY.name}`,
    description: `${category.description} Professional ${category.name.toLowerCase()} services in the GTA. Prices from $${category.priceRangeMin}.`,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${category.name} - ${COMPANY.name}`,
      description: category.description || `Professional ${category.name.toLowerCase()} services.`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.name,
    description: category.description,
    provider: {
      '@type': 'Plumber',
      name: COMPANY.name,
      telephone: COMPANY.phone,
    },
    areaServed: 'Greater Toronto Area',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: category.priceRangeMin,
      highPrice: category.priceRangeMax,
      priceCurrency: 'CAD',
    },
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-accent">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground mb-2">{category.description}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Estimated duration: ~{Math.round(category.estimatedDuration / 60)} hours |
            Price range: ${category.priceRangeMin} - ${category.priceRangeMax}
          </p>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-muted px-6 py-3 border-b border-border">
              <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                <span className="col-span-6">Service</span>
                <span className="col-span-3 text-right">Price</span>
                <span className="col-span-3 text-right">Duration</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {category.items.map((item) => (
                <div key={item.id} className="px-6 py-4 grid grid-cols-12 items-center">
                  <div className="col-span-6">
                    <p className="font-medium">{item.name}</p>
                    {item.partsExtra && (
                      <span className="text-xs text-muted-foreground">Parts extra</span>
                    )}
                  </div>
                  <p className="col-span-3 text-right font-medium text-accent">
                    {item.priceMin != null && item.priceMax != null && item.priceMin !== item.priceMax
                      ? `$${item.priceMin} - $${item.priceMax}`
                      : `$${item.unitPrice}`}
                  </p>
                  <p className="col-span-3 text-right text-sm text-muted-foreground">
                    ~{item.estimatedDuration} min
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Prices shown are estimates. Final pricing depends on the scope of work.
            </p>
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
