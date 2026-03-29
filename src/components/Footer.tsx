'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/ui/logo';
import { COMPANY } from '@/lib/constants';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-accent text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo
                variant="full"
                size="lg"
                className="max-w-[200px] brightness-0 invert"
              />
            </div>
            <p className="text-white/80 mb-4">
              Your trusted local plumbing experts with over {COMPANY.experience} years of professional service.
            </p>
            <p className="text-white/80">
              Licensed, insured, and available {COMPANY.hours} for all your plumbing needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t('nav.testimonials')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Emergency Service</h4>
            <p className="text-white/80 mb-2">Available {COMPANY.hours}</p>
            <a
              href={`tel:${COMPANY.phone}`}
              className="text-xl font-bold text-destructive-foreground hover:opacity-80 transition-opacity"
              style={{ color: '#FF8C00' }}
            >
              {COMPANY.phoneFormatted}
            </a>
            <p className="text-white/80 mt-4">
              Fast response times for all emergency plumbing situations.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} {COMPANY.name}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;