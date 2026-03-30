'use client'

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuoteForm from '@/components/forms/QuoteForm';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const LottiePlaceholder = () => (
  <div className="absolute inset-0 bg-blue-50/60 rounded-lg overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

const QuoteGenerator = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [lottieData, setLottieData] = useState(null);
  const [lottieState, setLottieState] = useState<'loading' | 'ready' | 'error'>('loading');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLottieState('error');
      return;
    }

    const conn = (navigator as any).connection;
    if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
      setLottieState('error');
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('/assets/lotties/bluemen_lottie.json', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setLottieData(data);
        setLottieState('ready');
      })
      .catch(() => setLottieState('error'));

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const lottieContainer = (mobile?: boolean) => (
    <div
      className="relative w-full"
      style={{ aspectRatio: '2623 / 2498', ...(mobile ? { transform: 'translateX(-2.5%)' } : {}) }}
    >
      {/* Placeholder — fades out when ready */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${lottieState === 'ready' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {lottieState === 'loading' && <LottiePlaceholder />}
      </div>

      {/* Lottie — fades in when ready */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${lottieState === 'ready' ? 'opacity-100' : 'opacity-0'}`}>
        {lottieData && (
          <Lottie
            animationData={lottieData}
            loop={true}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );

  return (
    <section id="quote" className="pt-8 pb-16 md:pt-0 md:pb-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-screen">
          {/* Left Side - Lottie (Hidden on Mobile) */}
          <div
            className="hidden md:flex flex-col items-center justify-center relative overflow-hidden p-12"
            aria-hidden="true"
          >
            <div className="relative z-10 w-full max-w-2xl mx-auto">
              {lottieContainer()}
            </div>
          </div>

          {/* Right Side - Quote Content */}
          <div className="flex items-center justify-center md:py-12">
            <div className="w-full max-w-2xl mx-auto">
              {/* Mobile Lottie */}
              <div className="md:hidden mb-4">
                {lottieContainer(true)}
              </div>
              {/* CTA Section */}
              <div className="bg-[#4492AC] rounded-2xl p-5 md:p-12 text-center shadow-xl">
                <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  Get Your Free Quote in Minutes
                </h3>
                <p className="hidden md:block text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
                  {t('quote.cta.description', 'Fill out our quick form and our team will provide you with a comprehensive quote tailored to your needs')}
                </p>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-white text-[#4492AC] hover:bg-gray-100 text-base px-6 py-4 md:text-lg md:px-8 md:py-6 h-auto font-semibold shadow-lg"
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

                <p className="text-blue-50 text-sm mt-4 md:mt-6">
                  {t('quote.cta.note', 'Or call us directly at')}{' '}
                  <a
                    href="tel:+16475007989"
                    className="text-white font-semibold hover:underline"
                  >
                    647-500-7989
                  </a>
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  15+ Years Experience · Licensed & Insured · No Obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
