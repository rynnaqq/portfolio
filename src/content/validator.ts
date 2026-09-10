import type { Portfolio, Project } from '../types/portfolio';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePortfolio(data: Portfolio): ValidationResult {
  const errors: string[] = [];

  // 1. Check unique project IDs and slugs
  const idSet = new Set<string>();
  const slugSet = new Set<string>();

  data.projects.forEach((proj: Project) => {
    if (idSet.has(proj.id)) {
      errors.push(`Duplicate project ID detected: "${proj.id}"`);
    }
    idSet.add(proj.id);

    if (slugSet.has(proj.slug)) {
      errors.push(`Duplicate project slug detected: "${proj.slug}"`);
    }
    slugSet.add(proj.slug);
  });

  // 2. Check featuredProjectIds integrity
  if (!data.featuredProjectIds || data.featuredProjectIds.length < 1) {
    errors.push('featuredProjectIds must contain at least one project ID.');
  } else {
    data.featuredProjectIds.forEach((id) => {
      if (!idSet.has(id)) {
        errors.push(`featuredProjectIds contains unknown project ID: "${id}"`);
      }
    });
  }

  // 3. Check sceneBindings integrity
  if (data.sceneBindings) {
    data.sceneBindings.forEach((binding) => {
      if (!idSet.has(binding.projectId)) {
        errors.push(`sceneBinding part "${binding.partId}" references unknown project ID: "${binding.projectId}"`);
      }
    });
  }

  // 4. Production Mode Integrity Rules (PRD Bagian 3.3, 10.2, 15)
  if (data.mode === 'production') {
    const isPlaceholderString = (str?: string): boolean => {
      if (!str) return false;
      return /\[.*\]/.test(str) || str.includes('contoh') || str.includes('placeholder');
    };

    if (isPlaceholderString(data.owner.name)) {
      errors.push('Production error: owner.name contains placeholder markers.');
    }
    if (isPlaceholderString(data.owner.profession)) {
      errors.push('Production error: owner.profession contains placeholder markers.');
    }
    if (isPlaceholderString(data.owner.intro)) {
      errors.push('Production error: owner.intro contains placeholder markers.');
    }
    if (isPlaceholderString(data.owner.bio)) {
      errors.push('Production error: owner.bio contains placeholder markers.');
    }

    // Email validation for production
    if (!data.owner.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.owner.email)) {
      errors.push('Production error: owner.email must be a valid, non-empty email address.');
    }

    // Projects count for production (PRD requires 3-4 verified projects)
    if (data.featuredProjectIds.length < 3) {
      errors.push('Production error: production requires at least 3 featured projects.');
    }

    data.projects.forEach((proj) => {
      if (proj.contentState === 'placeholder') {
        errors.push(`Production error: project "${proj.title}" is in placeholder state.`);
      }
      if (isPlaceholderString(proj.title)) {
        errors.push(`Production error: project title contains placeholder markers: "${proj.title}"`);
      }
      if (!proj.problem || isPlaceholderString(proj.problem)) {
        errors.push(`Production error: project "${proj.title}" missing verified problem.`);
      }
      if (!proj.role || isPlaceholderString(proj.role)) {
        errors.push(`Production error: project "${proj.title}" missing verified role.`);
      }
      if (!proj.contributions || proj.contributions.length === 0) {
        errors.push(`Production error: project "${proj.title}" must have verified contributions.`);
      }
      if (!proj.caseStudy.context || isPlaceholderString(proj.caseStudy.context)) {
        errors.push(`Production error: project "${proj.title}" missing case study context.`);
      }
      if (!proj.caseStudy.deliverables || proj.caseStudy.deliverables.length === 0) {
        errors.push(`Production error: project "${proj.title}" must have deliverables.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
