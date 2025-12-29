import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import familyDining from '@/assets/family-dining.jpg';

const ForCustomers = () => {
  const benefits = [
    'Skip cooking, still enjoy home-style meals',
    'Fresh, healthy, and hygienically prepared food',
    'Choose from multiple local home cooks',
    'Transparent pricing with no hidden charges',
    'Direct contact with meal makers',
    'Delivery tracked in real-time via the app',
    'Flexible subscription plans available',
  ];

  return (
    <section id="customers" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-3 uppercase tracking-wide">
              For Customers
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              A better way to enjoy homemade food
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Craving something healthy? Something that reminds you of home? 
              HomelyHaath connects you with amazing home cooks in your city who prepare fresh, 
              delicious meals just the way you like it.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <a href="#waitlist">I'm a Customer</a>
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={familyDining}
                alt="Family enjoying homemade meal"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="bg-card rounded-xl px-6 py-3 shadow-card border border-border">
                <p className="font-display font-bold text-xl text-primary">500+</p>
                <p className="text-xs text-muted-foreground">Home Cooks</p>
              </div>
              <div className="bg-card rounded-xl px-6 py-3 shadow-card border border-border">
                <p className="font-display font-bold text-xl text-primary">100+</p>
                <p className="text-xs text-muted-foreground">Dishes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCustomers;
