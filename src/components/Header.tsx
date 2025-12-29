import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'For Makers', href: '#makers' },
    { label: 'For Customers', href: '#customers' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Locations', href: '#locations' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 flex justify-center">
        <div className="flex items-center gap-[35px] h-16 lg:h-20 w-auto">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="HomelyHaath" className="h-8 lg:h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[35px]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="default" asChild>
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 border-t border-border px-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="hero" size="default" className="mt-2" asChild>
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
