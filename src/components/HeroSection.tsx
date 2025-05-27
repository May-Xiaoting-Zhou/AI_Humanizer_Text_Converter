import React from 'react';
import TextProcessor from './TextProcessor';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
            Make AI-Generated Text Sound Human
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform robotic AI writing into natural, human-like text that bypasses AI detection tools with our advanced humanizing technology.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="#"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
            >
              Start Humanizing Free
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a 
              href="#"
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full transition-colors duration-200 hover:bg-gray-50"
            >
              See How It Works
            </a>
          </div>
        </div>
        
        {/* Main Tool */}
        <TextProcessor />
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-600 mb-1">1M+</p>
            <p className="text-gray-600">Texts Humanized</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-600 mb-1">98%</p>
            <p className="text-gray-600">Detection Bypass Rate</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-600 mb-1">50k+</p>
            <p className="text-gray-600">Happy Users</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-600 mb-1">20+</p>
            <p className="text-gray-600">Languages Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;