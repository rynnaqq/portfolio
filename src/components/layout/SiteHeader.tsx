import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioContent } from '../../content/portfolio';
import { MobileNav } from './MobileNav';

export const SiteHeader: React.FC = () => {
  const { owner, labels } = portfolioContent;

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b-2 border-text transition-colors">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between relative">
        <Link
          to="/"
          className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded px-1 py-0.5 transition-colors"
          aria-label={owner.name}
        >
          {owner.name}
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8">
          <Link
            to="/#work"
            className="min-h-[44px] flex items-center text-base font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded px-2 transition-colors"
          >
            {labels.navWork}
          </Link>
          <Link
            to="/#about"
            className="min-h-[44px] flex items-center text-base font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded px-2 transition-colors"
          >
            {labels.navAbout}
          </Link>
          <Link
            to="/#contact"
            className="min-h-[44px] flex items-center text-base font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded px-2 transition-colors"
          >
            {labels.navContact}
          </Link>
        </nav>

        {/* Mobile Disclosure Navigation */}
        <MobileNav />
      </div>
    </header>
  );
};
