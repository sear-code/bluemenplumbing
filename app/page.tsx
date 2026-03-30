import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import QuoteGenerator from '@/components/QuoteGenerator'

// Below-the-fold sections — code-split to reduce initial JS bundle
const About = dynamic(() => import('@/components/About'))
const Services = dynamic(() => import('@/components/Services'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))
const StickyMobileCTA = dynamic(() => import('@/components/StickyMobileCTA'))

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




