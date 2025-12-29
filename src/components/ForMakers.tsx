import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import makerCooking from '@/assets/maker-cooking.jpg';

const ForMakers = () => {
  const benefits = [
    { title: 'No cost to join', subtitle: 'Start your journey without any fees' },
    { title: 'Set your own prices and schedule', subtitle: 'Complete control over your business' },
    { title: 'Control delivery time and fees', subtitle: 'Manage logistics on your terms' },
    { title: 'Receive payments after each confirmed order', subtitle: 'Quick and reliable payment system' },
    { title: 'Manage orders easily from your dashboard', subtitle: 'Simple tools to run your business' },
  ];

  return (
    <section id="makers" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={makerCooking}
                alt="Home cook preparing food"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Earning Badge */}
            <div className="absolute -bottom-6 left-4 lg:left-8 bg-card rounded-xl px-6 py-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Monthly Earnings</p>
              <p className="font-display font-bold text-lg lg:text-xl text-primary">₹15,000 - ₹60,000</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-bold text-primary mb-3 uppercase tracking-wide bg-primary/10 px-3 py-1 rounded-full">
              For Makers
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Earn from your cooking talent
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you love cooking and want to share your culinary skills, HomelyHaath 
              is the perfect platform for you. Turn your passion into a thriving home business 
              and earn while doing what you love most.
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
                  Join as Maker
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Apply now and get notified when maker onboarding opens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForMakers;
