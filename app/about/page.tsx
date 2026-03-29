import { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';

export const metadata: Metadata = {
  title: `About Us - ${COMPANY.name}`,
  description: `Learn about ${COMPANY.name}. ${COMPANY.experience} years of professional plumbing experience serving the Greater Toronto Area.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <About />
      </main>
      <Footer />
    </div>
  );
}
