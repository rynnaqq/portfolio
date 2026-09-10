import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { portfolioContent } from '../../content/portfolio';

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { label: portfolioContent.labels.navWork, href: '/#work' },
    { label: portfolioContent.labels.navAbout, href: '/#about' },
    { label: portfolioContent.labels.navContact, href: '/#contact' },
  ];

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-text bg-bg text-text rounded-lg hover:bg-butter focus:outline-none focus:ring-2 focus:ring-cobalt active:scale-95 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          ref={navRef}
          aria-label="Navigasi Mobile"
          className="absolute top-full left-0 right-0 bg-bg border-b-2 border-text shadow-lg z-40 p-6 flex flex-col gap-4 animate-in fade-in duration-150"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              className="text-xl font-display font-bold text-text hover:text-cobalt py-3 border-b border-text/20 focus:outline-none focus:ring-2 focus:ring-cobalt rounded"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
