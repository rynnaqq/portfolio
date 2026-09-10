import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioContent } from '../../content/portfolio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { owner, labels } = portfolioContent;

  return (
    <footer className="border-t-2 border-text bg-bg mt-24 py-12">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-text/20">
          <div>
            <p className="text-2xl font-display font-extrabold text-text">
              {owner.name}
            </p>
            <p className="text-sm font-body text-text-muted mt-1">
              {owner.profession}
            </p>
          </div>

          <nav aria-label="Navigasi Footer" className="flex flex-wrap items-center gap-6">
            <Link
              to="/#work"
              className="text-sm font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded"
            >
              {labels.navWork}
            </Link>
            <Link
              to="/#about"
              className="text-sm font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded"
            >
              {labels.navAbout}
            </Link>
            <Link
              to="/#contact"
              className="text-sm font-display font-bold text-text hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded"
            >
              {labels.navContact}
            </Link>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-body text-text-muted">
          <p>
            © {currentYear} {owner.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-2">
            <span>Bauhaus</span>
            <span>×</span>
            <span>Memphis</span>
            <span>×</span>
            <span>Kawaii</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
