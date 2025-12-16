'use client'

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote, ExternalLink } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      text: t('testimonials.review1.text'),
      author: t('testimonials.review1.author'),
      platform: t('testimonials.review1.platform'),
      rating: 5
    },
    {
      text: t('testimonials.review2.text'),
      author: t('testimonials.review2.author'),
      platform: t('testimonials.review2.platform'),
      rating: 5
    },
    {
      text: t('testimonials.review3.text'),
      author: t('testimonials.review3.author'),
      platform: t('testimonials.review3.platform'),
      rating: 5
    }
  ];

  const handleViewAllReviews = () => {
    window.open(t('testimonials.googleLink'), '_blank');
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('testimonials.subtitle')}
          </p>
          <Button 
            variant="outline" 
            onClick={handleViewAllReviews}
            className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {t('testimonials.viewAll')}
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-[#4492AC] opacity-50" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#4492AC] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        via {testimonial.platform}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;