import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;