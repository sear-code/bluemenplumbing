'use client'

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuoteForm from '@/components/forms/QuoteForm';
import { FileText, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const QuoteGenerator = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch('/assets/lotties/bluemen_lottie.json')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

  return (
    <section id="quote" className="pt-8 pb-16 md:pt-0 md:pb-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-screen">
          {/* Left Side - Logo Wallpaper (Hidden on Mobile) */}
          <div 
            className="hidden md:flex flex-col items-center justify-center relative overflow-hidden p-12"
            aria-hidden="true"
          >
            <div className="relative z-10 w-full max-w-2xl mx-auto">
              {lottieData && (
                <Lottie 
                  animationData={lottieData}
                  loop={true}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>

          {/* Right Side - Quote Content */}
          <div className="flex items-center justify-center md:py-12">
            <div className="w-full max-w-2xl mx-auto">
              {/* CTA Section */}
              <div className="bg-[#4492AC] rounded-2xl p-8 md:p-12 text-center shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Get Your Free Quote in Minutes
                </h3>
                <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
                  {t('quote.cta.description', 'Fill out our quick form and our team will provide you with a comprehensive quote tailored to your needs')}
                </p>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-white text-[#4492AC] hover:bg-gray-100 text-lg px-8 py-6 h-auto font-semibold shadow-lg"
                    >
                      {t('quote.cta.button', 'Request Free Quote')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] !flex !flex-col overflow-hidden p-0 gap-0">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Request a Free Quote</DialogTitle>
                    </DialogHeader>
                    <QuoteForm />
                  </DialogContent>
                </Dialog>

                <p className="text-blue-50 text-sm mt-6">
                  {t('quote.cta.note', 'Or call us directly at')}{' '}
                  <a
                    href="tel:+16475007989"
                    className="text-white font-semibold hover:underline"
                  >
                    647-500-7989
                  </a>
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4492AC] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t('quote.feature1.title', 'Fast Response')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Finalize the quote in less than 24 hours
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4492AC] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t('quote.feature2.title', 'Detailed Estimates')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('quote.feature2.description', 'Transparent pricing with no hidden fees')}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4492AC] rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t('quote.feature3.title', 'No Obligation')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('quote.feature3.description', 'Free quotes with no commitment required')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 text-center">
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">24/7 Emergency Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;

