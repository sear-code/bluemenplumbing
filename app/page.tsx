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




