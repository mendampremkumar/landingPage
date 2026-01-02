import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import familyDining from '@/assets/family-dining.jpg';

const ForCustomers = () => {
  const benefits = [
    { title: 'Easy browsing by dish or maker', subtitle: 'Find exactly what you are craving' },
    { title: 'Clear menus and prices', subtitle: 'No hidden costs or surprises' },
    { title: 'Smooth and secure payments', subtitle: 'Multiple payment options available' },
    { title: 'Delivery or pickup managed by the maker', subtitle: 'Flexible options to suit your schedule' },
    { title: 'Order status notifications', subtitle: 'Stay updated at every step' },
  ];

  return (
    <section id="customers" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-bold text-primary mb-3 uppercase tracking-wide bg-primary/10 px-3 py-1 rounded-full">
              For Customers
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              A better way to enjoy homemade food
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Explore a curated list of homemakers in your neighbourhood. From everyday dishes to regional favourites, enjoy meals that feel like home.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{benefit.title}</span>
                    <p className="text-xs text-muted-foreground">{benefit.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <Button variant="hero" size="lg" asChild>
                <a href="#waitlist" className="flex items-center gap-2">
                  Join as Customer
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Reserve your early access and get notified at launch.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={familyDining}
                alt="Customer enjoying homemade meal"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="bg-card rounded-xl px-6 py-4 shadow-card border border-border">
                <p className="font-display font-bold text-2xl lg:text-3xl text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Home Cooks</p>
              </div>
              <div className="bg-card rounded-xl px-6 py-4 shadow-card border border-border">
                <p className="font-display font-bold text-2xl lg:text-3xl text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Dishes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCustomers;
