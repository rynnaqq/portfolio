import { describe, it, expect } from 'vitest';
import { portfolioContent } from '../src/content/portfolio';
import { validatePortfolio } from '../src/content/validator';
import type { Portfolio } from '../src/types/portfolio';

describe('Content Model & Validator (PRD Bagian 3, 10, 15)', () => {
  it('validates default portfolio content successfully in preview mode', () => {
    const result = validatePortfolio(portfolioContent);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(portfolioContent.mode).toBe('preview');
  });

  it('verifies all featuredProjectIds exist in projects list', () => {
    const projectIds = new Set(portfolioContent.projects.map((p) => p.id));
    portfolioContent.featuredProjectIds.forEach((id) => {
      expect(projectIds.has(id)).toBe(true);
    });
    expect(portfolioContent.featuredProjectIds.length).toBeGreaterThanOrEqual(3);
  });

  it('verifies all project IDs and slugs are unique', () => {
    const ids = portfolioContent.projects.map((p) => p.id);
    const slugs = portfolioContent.projects.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('verifies sceneBindings link to valid project IDs', () => {
    const projectIds = new Set(portfolioContent.projects.map((p) => p.id));
    portfolioContent.sceneBindings.forEach((binding) => {
      expect(projectIds.has(binding.projectId)).toBe(true);
    });
  });

  it('fails validation in production mode when placeholders are present', () => {
    const prodDraft: Portfolio = {
      ...portfolioContent,
      mode: 'production',
    };
    const result = validatePortfolio(prodDraft);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some((err) => err.includes('placeholder'))).toBe(true);
  });

  it('fails validation in production mode when email is invalid or missing', () => {
    const invalidEmailData: Portfolio = {
      ...portfolioContent,
      mode: 'production',
      owner: {
        ...portfolioContent.owner,
        name: 'Jane Doe',
        profession: 'Frontend Engineer',
        intro: 'Membangun antarmuka web modern',
        bio: 'Pengembang perangkat lunak berfokus pada aksesibilitas dan performa',
        approach: 'Komposisi berbasis grid dan pengujian otomatis',
        email: '',
      },
    };
    const result = validatePortfolio(invalidEmailData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((err) => err.includes('email'))).toBe(true);
  });

  it('fails validation if featuredProjectIds contains unknown project ID', () => {
    const brokenData: Portfolio = {
      ...portfolioContent,
      featuredProjectIds: ['unknown-id', ...portfolioContent.featuredProjectIds],
    };
    const result = validatePortfolio(brokenData);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((err) => err.includes('featuredProjectIds'))).toBe(true);
  });
});
