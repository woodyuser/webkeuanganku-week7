import React from 'react';
import { HeroSection } from './HeroSection';
import { FeatureCards } from './FeatureCards';
import { ScrollingBanner } from './ScrollingBanner';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';

export const AboutPage = () => {
  return (
    // Kembali ke struktur ini, TANPA div overflow-x-hidden di luarnya
    <div className="flex flex-col gap-32 w-full max-w-[950px] mx-auto py-16 px-8">
      
      <div className="flex flex-col gap-16 items-center w-full">
        <HeroSection />
        <FeatureCards />
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <ScrollingBanner />
      </div>

      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default AboutPage;