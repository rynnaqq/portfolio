import React from 'react';
import { ExternalLink as ExtLinkIcon } from 'lucide-react';
import { portfolioContent } from '../../content/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { CopyEmailButton } from './CopyEmailButton';

export const ContactSection: React.FC = () => {
  const { owner, labels } = portfolioContent;

  return (
    <section id="contact" aria-label="Kontak Pemilik" className="py-16 md:py-24 border-b-2 border-text bg-bg">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <SectionHeader
          title={labels.navContact}
          subtitle="Hubungi langsung untuk peluang kolaborasi, rekrutmen profesional, atau konsultasi desain sistem dan frontend."
          number="03"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
          {/* Main Email Block */}
          <div className="md:col-span-7 bg-[#FAF6EE] border-2 border-text p-8 rounded-xl shadow-sm">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-cobalt block mb-2">
              Kanal Komunikasi Utama
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-4">
              Kirim Pesan Langsung
            </h3>
            <p className="text-sm font-body text-text-muted mb-6 leading-relaxed">
              Email merupakan metode tercepat untuk mendiskusikan kebutuhan proyek atau jadwal wawancara teknis.
            </p>

            {owner.email ? (
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${owner.email}`}
                  className="text-lg sm:text-xl md:text-2xl font-display font-bold text-cobalt hover:text-tomato underline break-all focus:outline-none focus:ring-2 focus:ring-cobalt rounded py-1 transition-colors"
                >
                  {owner.email}
                </a>
                <CopyEmailButton email={owner.email} />
              </div>
            ) : (
              <CopyEmailButton email="" />
            )}
          </div>

          {/* Social Links Block */}
          <div className="md:col-span-5 bg-bg border-2 border-text p-8 rounded-xl shadow-sm">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-text-muted block mb-2">
              Jejaring Profesional
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-4">
              Tautan Terverifikasi
            </h3>
            <p className="text-sm font-body text-text-muted mb-6">
              Kunjungi repositori kode atau profil jejaring kerja pemilik di platform berikut.
            </p>

            <ul className="flex flex-col gap-3">
              {owner.socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-4 py-2 border border-text/40 bg-[#F2EDE2] hover:bg-butter hover:border-text rounded-md flex items-center justify-between font-display font-semibold text-text focus:outline-none focus:ring-2 focus:ring-cobalt transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExtLinkIcon className="w-4 h-4 text-text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
