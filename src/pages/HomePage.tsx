import React, { useEffect } from 'react';
import { portfolioContent } from '../content/portfolio';
import { HeroSection } from '../components/hero/HeroSection';
import { WorkSection } from '../components/work/WorkSection';
import { AboutSection } from '../components/about/AboutSection';
import { ContactSection } from '../components/contact/ContactSection';

interface HomePageProps {
  renderScene?: React.ComponentProps<typeof HeroSection>['renderScene'];
}

export const HomePage: React.FC<HomePageProps> = ({ renderScene }) => {
  useEffect(() => {
    document.title = portfolioContent.seo.title;
  }, []);

  return (
    <>
      <HeroSection renderScene={renderScene} />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};
