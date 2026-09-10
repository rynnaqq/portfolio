export type ContentState = 'placeholder' | 'verified';

export interface ExternalLink {
  label: string;
  url: string;
  kind?: 'repository' | 'demo' | 'social' | 'article';
}

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  contentState?: ContentState;
}

export interface Outcome {
  statement: string;
  evidenceReference?: string;
  metricContext?: string;
}

export interface CaseStudy {
  context: string;
  contributions: string[];
  process: string[];
  decisions: {
    decision: string;
    rationale: string;
    tradeoff?: string;
  }[];
  deliverables: string[];
  outcomes?: Outcome[];
  lessons?: string[];
  gallery?: Media[];
}

export interface Project {
  id: string;
  slug: string;
  contentState: ContentState;
  title: string;
  summary: string;
  problem: string;
  role: string;
  contributions: string[];
  cover: Media;
  caseStudy: CaseStudy;
  year?: string;
  period?: string;
  technologies?: string[];
  projectType?: string;
  externalLinks?: ExternalLink[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Owner {
  name: string;
  profession: string;
  intro: string;
  bio: string;
  approach: string;
  skillGroups: SkillGroup[];
  email: string;
  socialLinks: ExternalLink[];
  availability?: string;
}

export type SculpturePartId = 'part-cube' | 'part-sphere' | 'part-ring' | 'part-arc';

export interface SceneBinding {
  partId: SculpturePartId;
  projectId: string;
}

export interface Labels {
  navWork: string;
  navAbout: string;
  navContact: string;
  ctaViewWork: string;
  ctaContactMe: string;
  copyEmailSuccess: string;
  copyEmailFailed: string;
  fallback3DTitle: string;
  fallback3DDesc: string;
  retry3DButton: string;
  rotateHint: string;
  rotateHintTouch: string;
}

export interface SEO {
  title: string;
  description: string;
  siteUrl?: string;
  ogImage?: string;
}

export interface Portfolio {
  mode: 'preview' | 'production';
  locale: 'id' | 'en';
  owner: Owner;
  projects: Project[];
  featuredProjectIds: string[];
  sceneBindings: SceneBinding[];
  labels: Labels;
  seo: SEO;
}
