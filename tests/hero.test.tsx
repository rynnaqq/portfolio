import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HeroSection } from '../src/components/hero/HeroSection';
import { SceneControls } from '../src/components/hero/SceneControls';
import { SelectedProjectPanel } from '../src/components/hero/SelectedProjectPanel';
import { portfolioContent } from '../src/content/portfolio';

describe('Hero Section & HTML Alternative Controls (PRD FR-02, FR-08, FR-09)', () => {
  it('renders concrete identity H1, profession, and CTAs in HeroSection', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(portfolioContent.owner.name);
    expect(screen.getByText(portfolioContent.owner.profession)).toBeInTheDocument();

    const ctaWork = screen.getByRole('link', { name: portfolioContent.labels.ctaViewWork });
    expect(ctaWork).toHaveAttribute('href', '/#work');

    const ctaContact = screen.getByRole('link', { name: portfolioContent.labels.ctaContactMe });
    expect(ctaContact).toHaveAttribute('href', '/#contact');
  });

  it('renders radio group fieldset and switches active project in SelectedProjectPanel', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );

    // Verify radio group presence
    const fieldset = screen.getByRole('group', { name: /pilih proyek/i });
    expect(fieldset).toBeInTheDocument();

    // Default first project is selected
    const firstProject = portfolioContent.projects[0];
    const secondProject = portfolioContent.projects[1];
    expect(screen.getAllByText(firstProject.title).length).toBeGreaterThanOrEqual(1);

    // Select second project radio
    const secondRadio = screen.getByRole('radio', { name: secondProject.title });
    fireEvent.click(secondRadio);

    // Panel updates to second project
    expect(screen.getAllByText(secondProject.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(secondProject.role)).toBeInTheDocument();

    const detailLink = screen.getByRole('link', { name: new RegExp(`lihat detail`, 'i') });
    expect(detailLink).toHaveAttribute('href', `/work/${secondProject.slug}`);
  });

  it('triggers rotation and reset callbacks in SceneControls', () => {
    const handleSelect = vi.fn();
    const handleRotate = vi.fn();
    const handleReset = vi.fn();

    render(
      <SceneControls
        projects={portfolioContent.projects}
        selectedProjectId={portfolioContent.projects[0].id}
        onSelectProject={handleSelect}
        onRotate={handleRotate}
        onReset={handleReset}
        isSceneReady={true}
      />
    );

    const rotateLeft = screen.getByRole('button', { name: /putar kiri/i });
    fireEvent.click(rotateLeft);
    expect(handleRotate).toHaveBeenCalledWith('left');

    const rotateRight = screen.getByRole('button', { name: /putar kanan/i });
    fireEvent.click(rotateRight);
    expect(handleRotate).toHaveBeenCalledWith('right');

    const resetButton = screen.getByRole('button', { name: /reset posisi/i });
    fireEvent.click(resetButton);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
