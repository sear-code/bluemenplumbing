import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: t('contact.phone'),
      href: 'tel:+16475007989',
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      content: t('contact.email'),
      href: 'mailto:info@bluemenplumbing.com',
      color: 'text-primary'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: t('contact.address'),
      href: '#',
      color: 'text-red-500'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: t('contact.hours'),
      href: '#',
      color: 'text-accent'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card 
                key={index}
                className="bg-background/90 backdrop-blur-sm border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 rounded-full bg-[#4492AC] shadow-elegant group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-[#045372] transition-colors">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {info.href.startsWith('#') ? (
                    <p className="text-muted-foreground">
                      {info.content}
                    </p>
                  ) : (
                    <a 
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-block"
                    >
                      {info.content}
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;