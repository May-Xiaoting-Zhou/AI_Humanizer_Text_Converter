import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your AI Content Sound Human?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators, students, and professionals who use HumanizeAI to bypass AI detection and create authentic-sounding content.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center">
              <CheckCircle size={20} className="mr-2 text-blue-200" />
              <span>Free plan available</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={20} className="mr-2 text-blue-200" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={20} className="mr-2 text-blue-200" />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a 
              href="#"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full transition-colors duration-200 hover:bg-white hover:text-blue-600 flex items-center justify-center"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;