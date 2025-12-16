import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('about.licensed'),
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: t('about.experience'),
      color: 'text-primary'
    },
    {
      icon: CheckCircle,
      title: t('about.guarantee'),
      color: 'text-accent'
    },
    {
      icon: Clock,
      title: t('about.available'),
      color: 'text-blue-500'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 rounded-full bg-[#4492AC] shadow-elegant group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-[#045372] transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide pb-4">
          <div className="flex space-x-4 w-max px-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="bg-background/80 backdrop-blur-sm border-border/50 hover:shadow-card-hover transition-all duration-300 group text-center animate-fade-in w-64 flex-shrink-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 rounded-full bg-[#4492AC] shadow-elegant group-hover:shadow-glow transition-all duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-[#045372] transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-[#4492AC] backdrop-blur-sm rounded-2xl p-8 shadow-elegant">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-50">Years of Experience</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-50">Happy Customers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-50">Emergency Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;