import React from 'react';
import { Sidebar } from './Sidebar';
import { HeroSection } from './HeroSection';
import { FeatureCards } from './FeatureCards';
import { ScrollingBanner } from './ScrollingBanner';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const AboutPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-white font-['Poppins',sans-serif]">
      <Sidebar />

      <div className="flex absolute flex-col gap-52 items-center h-[1861px] left-[402px] top-[53px] w-[1050px]">
        <div className="flex relative flex-col gap-32 items-center self-stretch">
          <div className="flex relative flex-col gap-32 items-center self-stretch">
            <div className="flex relative flex-col gap-16 items-center w-[885px]">
              <HeroSection />
              <FeatureCards />
            </div>
          </div>

          <ScrollingBanner />

          <FAQSection />

          <ContactSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
