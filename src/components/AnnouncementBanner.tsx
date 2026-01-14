import { useState } from 'react';
import { Rocket, X } from 'lucide-react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-primary via-primary to-orange-600 text-white py-3 px-5 rounded-full shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-16 h-16 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-white rounded-full blur-xl" />
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative flex-shrink-0">
            <Rocket className="w-5 h-5 animate-bounce" />
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30 animate-pulse" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-display font-bold text-sm whitespace-nowrap">
              App in Development!
            </span>
            <span className="hidden sm:inline text-white/60">•</span>
            <p className="text-xs sm:text-sm text-white/90">
              <button
                onClick={scrollToWaitlist}
                className="underline underline-offset-2 font-medium hover:text-cream transition-colors"
              >
                Join the waitlist
              </button>
              {' '}to be notified
            </p>
          </div>
          
          <button
            onClick={handleDismiss}
            className="ml-2 p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
