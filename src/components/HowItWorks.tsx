import { Search, ShoppingCart, Utensils } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse local makers',
      description: 'Find home cooks in your area who prepare authentic homemade food.',
    },
    {
      icon: ShoppingCart,
      title: 'Place your order',
      description: 'Select your favorite dishes and schedule delivery at your convenience.',
    },
    {
      icon: Utensils,
      title: 'Enjoy authentic food',
      description: 'Receive fresh, homemade meals delivered right to your doorstep.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 lg:mb-16">
          How Homely Haath works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-card border border-border flex items-center justify-center shadow-soft group-hover:shadow-card group-hover:border-primary/30 transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
