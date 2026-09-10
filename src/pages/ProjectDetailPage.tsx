import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { portfolioContent } from '../content/portfolio';
import { NotFoundPage } from './NotFoundPage';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioContent.projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — ${portfolioContent.owner.name}`;
      window.scrollTo(0, 0);
    }
  }, [project]);

  if (!project) {
    return <NotFoundPage />;
  }

  const { caseStudy } = project;

  return (
    <article aria-labelledby="case-study-title" className="py-12 md:py-20 bg-bg min-h-screen">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border-2 border-text bg-[#FAF6EE] hover:bg-butter rounded-lg font-display font-bold text-sm text-text focus:outline-none focus:ring-2 focus:ring-cobalt transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Proyek</span>
          </Link>
        </div>

        {/* Hero / Header */}
        <header className="border-b-2 border-text pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-display font-bold uppercase tracking-wider text-cobalt">
            {project.year && (
              <span className="px-2.5 py-1 bg-butter text-text border border-text rounded">
                {project.year}
              </span>
            )}
            {project.projectType && (
              <span className="px-2.5 py-1 bg-[#FAF6EE] border border-text/40 rounded text-text">
                {project.projectType}
              </span>
            )}
          </div>

          <h1 id="case-study-title" className="text-3xl sm:text-5xl font-display font-extrabold text-text tracking-tight mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl font-body text-text-muted leading-relaxed max-w-3xl mb-8">
            {project.summary}
          </p>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-text/20">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-tomato block mb-1">
                Peran
              </span>
              <p className="text-sm font-body text-text font-semibold">
                {project.role}
              </p>
            </div>
            {project.period && (
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-wider text-text-muted block mb-1">
                  Periode
                </span>
                <p className="text-sm font-body text-text">
                  {project.period}
                </p>
              </div>
            )}
            {project.technologies && (
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-wider text-cobalt block mb-1">
                  Teknologi
                </span>
                <p className="text-sm font-body text-text">
                  {project.technologies.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* External Links */}
          {project.externalLinks && project.externalLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {project.externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2 bg-cobalt text-white border-2 border-text rounded-md font-display font-bold text-xs hover:bg-cobalt/90 focus:outline-none focus:ring-2 focus:ring-text inline-flex items-center gap-2 transition-colors"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Media Banner */}
        <div className="bg-[#EFE9DC] border-2 border-text rounded-xl p-8 mb-16 text-center shadow-sm">
          <div className="w-full min-h-[260px] flex flex-col items-center justify-center border border-dashed border-text/40 rounded-lg p-6 bg-bg/50">
            <span className="text-sm font-display font-bold text-text mb-2">
              Pratinjau Media Studi Kasus
            </span>
            <span className="text-xs font-body text-text-muted max-w-md">
              {project.cover.caption || 'Aset dokumentasi proyek aktual.'}
            </span>
          </div>
        </div>

        {/* Section 1: Konteks Proyek */}
        <section aria-labelledby="context-heading" className="mb-14">
          <h2 id="context-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
            Konteks Proyek
          </h2>
          <p className="text-base font-body text-text leading-relaxed">
            {caseStudy.context}
          </p>
        </section>

        {/* Section 2: Kontribusi Langsung */}
        <section aria-labelledby="contributions-heading" className="mb-14">
          <h2 id="contributions-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
            Kontribusi Langsung
          </h2>
          <ul className="space-y-3">
            {caseStudy.contributions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cobalt flex-shrink-0 mt-0.5" />
                <span className="text-base font-body text-text leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Proses & Metodologi */}
        <section aria-labelledby="process-heading" className="mb-14">
          <h2 id="process-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
            Proses &amp; Metodologi
          </h2>
          <ol className="list-decimal list-inside space-y-3">
            {caseStudy.process.map((step, idx) => (
              <li key={idx} className="text-base font-body text-text leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Section 4: Keputusan Penting & Kompromi */}
        <section aria-labelledby="decisions-heading" className="mb-14">
          <h2 id="decisions-heading" className="text-2xl font-display font-bold text-text mb-6 border-b border-text/20 pb-3">
            Keputusan Penting &amp; Kompromi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.decisions.map((dec, idx) => (
              <div key={idx} className="border-2 border-text bg-[#FAF6EE] p-6 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-display font-bold text-text mb-2">
                    {dec.decision}
                  </h3>
                  <p className="text-sm font-body text-text-muted mb-3 leading-relaxed">
                    <strong className="text-text">Alasan: </strong>
                    {dec.rationale}
                  </p>
                </div>
                {dec.tradeoff && (
                  <p className="text-xs font-body text-tomato mt-2 pt-2 border-t border-text/10">
                    <strong>Kompromi: </strong>
                    {dec.tradeoff}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Deliverable */}
        <section aria-labelledby="deliverables-heading" className="mb-14">
          <h2 id="deliverables-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
            Deliverable yang Dapat Diperiksa
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {caseStudy.deliverables.map((deliv, idx) => (
              <li key={idx} className="text-base font-body text-text leading-relaxed">
                {deliv}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: Outcomes / Hasil Terukur (Jika Ada) */}
        {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
          <section aria-labelledby="outcomes-heading" className="mb-14">
            <h2 id="outcomes-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
              Hasil Faktual &amp; Dampak
            </h2>
            <div className="space-y-4">
              {caseStudy.outcomes.map((out, idx) => (
                <div key={idx} className="border-l-4 border-cobalt pl-4 py-1">
                  <p className="text-base font-body text-text leading-relaxed">
                    {out.statement}
                  </p>
                  {out.evidenceReference && (
                    <span className="text-xs font-mono text-text-muted mt-1 block">
                      Sumber verifikasi: {out.evidenceReference}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Pembelajaran (Jika Ada) */}
        {caseStudy.lessons && caseStudy.lessons.length > 0 && (
          <section aria-labelledby="lessons-heading" className="mb-16">
            <h2 id="lessons-heading" className="text-2xl font-display font-bold text-text mb-4 border-b border-text/20 pb-3">
              Pembelajaran
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {caseStudy.lessons.map((lesson, idx) => (
                <li key={idx} className="text-base font-body text-text-muted leading-relaxed">
                  {lesson}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom Actions */}
        <div className="pt-10 border-t-2 border-text flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/#work"
            className="min-h-[44px] px-6 py-3 border-2 border-text bg-bg hover:bg-butter font-display font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-cobalt transition-colors"
          >
            Lihat Proyek Lainnya
          </Link>
          <Link
            to="/#contact"
            className="min-h-[44px] px-6 py-3 bg-cobalt text-white border-2 border-text font-display font-bold rounded-lg hover:bg-cobalt/90 focus:outline-none focus:ring-2 focus:ring-text transition-colors"
          >
            Hubungi Pemilik
          </Link>
        </div>
      </div>
    </article>
  );
};
