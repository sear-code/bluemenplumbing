import Header from '@/components/Header'
import QuoteGenerator from '@/components/QuoteGenerator'
import Services from '@/components/Services'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Value Proposition Banner */}
      <section className="bg-accent py-4 mt-16 md:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white [text-shadow:1px_1px_4px_rgba(68,146,172,0.6),-1px_-1px_2px_rgba(68,146,172,0.4)]">
            Why Pay More, When You Can Pay Less!
          </h2>
        </div>
      </section>

      <main id="main-content">
        <QuoteGenerator />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}




