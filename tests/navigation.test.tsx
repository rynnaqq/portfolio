import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from '../src/components/layout/SiteHeader';
import { MobileNav } from '../src/components/layout/MobileNav';
import { SkipLink } from '../src/components/common/SkipLink';
import { Footer } from '../src/components/layout/Footer';
import { portfolioContent } from '../src/content/portfolio';

describe('Navigation, Mobile Disclosure & Accessible Layout (PRD FR-01, Bagian 13)', () => {
  it('renders SkipLink pointing to #main-content', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: /lewati ke konten/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders SiteHeader with wordmark and desktop navigation links', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    const wordmark = screen.getByRole('link', { name: portfolioContent.owner.name });
    expect(wordmark).toBeInTheDocument();
    expect(screen.getByRole('link', { name: portfolioContent.labels.navWork })).toHaveAttribute('href', '/#work');
    expect(screen.getByRole('link', { name: portfolioContent.labels.navAbout })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: portfolioContent.labels.navContact })).toHaveAttribute('href', '/#contact');
  });

  it('handles mobile menu disclosure: open, close, aria-expanded, and Escape key', () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole('button', { name: /buka menu/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /tutup menu/i })).toBeInTheDocument();

    // Verify nav links are visible
    const workLink = screen.getByRole('link', { name: portfolioContent.labels.navWork });
    expect(workLink).toBeInTheDocument();

    // Press Escape to close
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders Footer with owner name, dynamic current year, and quick links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(portfolioContent.owner.name)).length).toBeGreaterThanOrEqual(1);
  });
});
