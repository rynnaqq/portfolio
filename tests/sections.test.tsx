import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WorkSection } from '../src/components/work/WorkSection';
import { AboutSection } from '../src/components/about/AboutSection';
import { ContactSection } from '../src/components/contact/ContactSection';
import { portfolioContent } from '../src/content/portfolio';

describe('Work, About, and Contact Sections (PRD FR-03, FR-05, FR-06, Bagian 15)', () => {
  it('renders WorkSection with featured projects and detail links', () => {
    render(
      <MemoryRouter>
        <WorkSection />
      </MemoryRouter>
    );

    portfolioContent.featuredProjectIds.forEach((id) => {
      const proj = portfolioContent.projects.find((p) => p.id === id);
      if (proj) {
        expect(screen.getAllByText(proj.title).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(proj.problem)).toBeInTheDocument();
        expect(screen.getByText(proj.role)).toBeInTheDocument();
        expect(
          screen.getByRole('link', { name: new RegExp(`lihat detail ${proj.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') })
        ).toHaveAttribute('href', `/work/${proj.slug}`);
      }
    });
  });

  it('renders AboutSection with bio and skill groups without percentage bars', () => {
    const { container } = render(<AboutSection />);

    expect(screen.getByText(/Praktisi desain produk digital/i)).toBeInTheDocument();
    portfolioContent.owner.skillGroups.forEach((group) => {
      expect(screen.getByText(group.title)).toBeInTheDocument();
      group.items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    // Verify anti-slop: NO percentage bars (e.g. 98%, 95%) in about section
    expect(container.textContent).not.toMatch(/\d+%/);
  });

  it('renders ContactSection with email and social links', () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    const contactHeading = screen.getByRole('heading', { name: /kontak/i });
    expect(contactHeading).toBeInTheDocument();

    portfolioContent.owner.socialLinks.forEach((link) => {
      const socialLink = screen.getByRole('link', { name: link.label });
      expect(socialLink).toHaveAttribute('href', link.url);
    });
  });
});
