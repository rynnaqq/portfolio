import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../src/pages/HomePage';
import { ProjectDetailPage } from '../src/pages/ProjectDetailPage';
import { NotFoundPage } from '../src/pages/NotFoundPage';
import { AppShell } from '../src/components/layout/AppShell';
import { portfolioContent } from '../src/content/portfolio';

function renderWithRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </MemoryRouter>
  );
}

describe('Routing, Direct URL Loading & 404 (PRD Bagian 5, FR-04, Bagian 14)', () => {
  it('renders HomePage at route "/" with Hero, Work, About, Contact sections', () => {
    renderWithRouter('/');
    expect(screen.getByRole('heading', { level: 1, name: portfolioContent.owner.name })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: portfolioContent.labels.navWork })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: portfolioContent.labels.navAbout })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: portfolioContent.labels.navContact })).toBeInTheDocument();
  });

  it('renders ProjectDetailPage at route "/work/:slug" with structured case study', () => {
    const project = portfolioContent.projects[0];
    renderWithRouter(`/work/${project.slug}`);

    // H1 is the project title
    const titleHeading = screen.getByRole('heading', { level: 1, name: project.title });
    expect(titleHeading).toBeInTheDocument();

    // Back to Work link
    const backLink = screen.getByRole('link', { name: /kembali ke proyek/i });
    expect(backLink).toHaveAttribute('href', '/#work');

    // Case study sections
    expect(screen.getByRole('heading', { name: /konteks proyek/i })).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.context)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /kontribusi langsung/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /proses & metodologi/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /keputusan penting & kompromi/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /deliverable yang dapat diperiksa/i })).toBeInTheDocument();
  });

  it('renders NotFoundPage when visiting non-existent case study slug', () => {
    renderWithRouter('/work/non-existent-project-slug');
    expect(screen.getByRole('heading', { name: /halaman tidak ditemukan/i })).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /kembali ke beranda/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders NotFoundPage on generic unknown route', () => {
    renderWithRouter('/some-arbitrary-unrecognized-url');
    expect(screen.getByRole('heading', { name: /halaman tidak ditemukan/i })).toBeInTheDocument();
  });
});
