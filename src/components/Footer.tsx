import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/ui/logo';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#4492AC] text-white py-8">
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
              Your trusted local plumbing experts with over 15 years of professional service.
            </p>
            <p className="text-white/80">
              Licensed, insured, and available 24/7 for all your plumbing needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t('nav.about')}
                </button>
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
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Emergency Service</h4>
            <p className="text-white/80 mb-2">Available 24/7</p>
            <a 
              href="tel:+16475007989"
              className="text-xl font-bold text-[#FF8C00] hover:text-[#FF8C00]/80 transition-colors"
            >
              647-500-7989
            </a>
            <p className="text-white/80 mt-4">
              Fast response times for all emergency plumbing situations.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            © 2024 Blue Men Plumbing. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;