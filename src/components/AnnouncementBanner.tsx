import { useState, useEffect } from 'react';
import { Rocket, X } from 'lucide-react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('announcementDismissed', 'true');
    setIsVisible(false);
  };

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-primary to-orange-600 text-white py-3 px-4 animate-fade-in relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Rocket className="w-5 h-5 animate-bounce" />
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30 animate-pulse" />
          </div>
          <span className="font-display font-bold text-sm sm:text-base">
            App in Development!
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-white/90 text-center sm:text-left">
          Launching soon —{' '}
          <button
            onClick={scrollToWaitlist}
            className="underline underline-offset-2 font-medium hover:text-cream transition-colors"
          >
            Join the waitlist
          </button>
          {' '}to be notified!
        </p>
        
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 sm:relative sm:right-auto sm:top-auto sm:translate-y-0 sm:ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
