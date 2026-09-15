import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Magnetic from './Magnetic';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 sm:pt-12 pb-24 sm:pb-12 px-4 sm:px-8 border-t border-white/10 bg-oled font-mono text-[11px] sm:text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        {/* Monogram & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="text-white font-bold tracking-wider">
            {portfolioData.monogram} // ARCHIVE
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span>© {currentYear} {portfolioData.name}. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Global Coordinates & Tech Specs */}
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-zinc-400">
          <span>{portfolioData.coordinates}</span>
          <span className="text-zinc-700">|</span>
          <span className="text-neon-lime">SYS: V2.4 ONLINE</span>
        </div>

        {/* Back to Top Magnetic Button */}
        <Magnetic strength={0.3} className="w-full sm:w-auto flex justify-center">
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-white/10 hover:border-neon-lime text-zinc-400 hover:text-white transition-all duration-300 shadow-sm hover:shadow-neon-lime"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-neon-lime transition-transform group-hover:-translate-y-1" />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
