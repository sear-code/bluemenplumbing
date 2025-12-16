import Header from '@/components/Header';
import QuoteGenerator from '@/components/QuoteGenerator';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Value Proposition Banner */}
      <section className="bg-[#94E2FC] py-6 mt-16 md:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white" style={{ textShadow: '1px 1px 4px rgba(68, 146, 172, 0.6), -1px -1px 2px rgba(68, 146, 172, 0.4)' }}>
            Why Pay More, When You Can Pay Less!
          </h2>
        </div>
      </section>

      <QuoteGenerator />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
