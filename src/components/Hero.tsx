import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={scrollToContact}
                className="animate-slide-up"
              >
                <MessageCircle className="h-5 w-5" />
                {t('hero.cta')}
              </Button>
              
              <Button 
                variant="cta" 
                size="lg"
                asChild
                className="animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                <a href="tel:+16475007989">
                  <Phone className="h-5 w-5" />
                  {t('hero.call')}
                </a>
              </Button>
            </div>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <div className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold shadow-card-hover animate-float">
                24/7 Service
              </div>
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-card-hover animate-float" style={{ animationDelay: '1s' }}>
                Licensed & Insured
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;