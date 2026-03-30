'use client'

import { useState, useEffect } from 'react';
import { Phone, FileText } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-3">
      <div className="flex gap-3">
        <a
          href={`tel:${COMPANY.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#FF8C00] text-white font-semibold py-3 rounded-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <button
          type="button"
          onClick={scrollToQuote}
          className="flex-1 flex items-center justify-center gap-2 bg-[#4492AC] text-white font-semibold py-3 rounded-lg active:scale-95 transition-transform"
        >
          <FileText className="w-5 h-5" />
          Free Quote
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
