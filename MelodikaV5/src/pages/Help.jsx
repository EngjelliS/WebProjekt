import React, { useState } from 'react';
import FAQSection from '../components/FAQSection';
import SupportSection from '../components/SupportSection';
import HelpTopics from '../components/HelpTopics';
import HeroSection from '../components/HeroSection';

const Help = () => {
  return (
    <main className="help-page">
      <HeroSection currentPage='help'/>
      <FAQSection />
      <SupportSection />
      <HelpTopics />
    </main>
  );
};

export default Help;