import citiesIllustration from '@/assets/cities-illustration.png';

const LaunchingIn = () => {
  const cities = [
    { name: 'Hyderabad', subtitle: 'City of Nizams' },
    { name: 'Bangalore', subtitle: 'Garden City of India' },
    { name: 'Mumbai', subtitle: 'City of Dreams' },
  ];

  return (
    <section id="locations" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 lg:mb-16">
          Launching soon in
        </h2>

        {/* Cities */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-12">
          {cities.map((city, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-orange-light flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-primary">
                  {city.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {city.name}
              </h3>
              <p className="text-sm text-muted-foreground">{city.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div className="max-w-3xl mx-auto">
          <img
            src={citiesIllustration}
            alt="Indian cities illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default LaunchingIn;
