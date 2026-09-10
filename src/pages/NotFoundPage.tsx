import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <section aria-label="Halaman Tidak Ditemukan" className="min-h-[60vh] flex items-center justify-center py-20 px-5 bg-bg">
      <div className="max-w-md mx-auto text-center border-2 border-text bg-[#FAF6EE] p-8 md:p-12 rounded-xl shadow-sm">
        <div className="w-16 h-16 rounded-full border-4 border-tomato bg-butter flex items-center justify-center mx-auto mb-6">
          <span className="font-display font-extrabold text-2xl text-text">404</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text mb-3">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-sm font-body text-text-muted mb-8 leading-relaxed">
          Tautan yang Anda tuju tidak tersedia atau proyek mungkin telah dipindahkan.
        </p>

        <Link
          to="/"
          className="min-h-[44px] px-6 py-3 bg-cobalt text-white border-2 border-text rounded-lg font-display font-bold text-sm inline-flex items-center gap-2 hover:bg-cobalt/90 focus:outline-none focus:ring-2 focus:ring-text transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </section>
  );
};
