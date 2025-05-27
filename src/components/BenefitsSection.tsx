import React from 'react';
import { CheckCircle, Zap, Shield, Globe, Clock, Brain } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Shield size={24} />,
      title: "Avoid AI Detection",
      description: "Our advanced algorithms ensure your content bypasses AI detection tools with high success rates."
    },
    {
      icon: <Zap size={24} />,
      title: "Quick Transformation",
      description: "Transform your text in seconds with our lightning-fast processing engine."
    },
    {
      icon: <Brain size={24} />,
      title: "Natural Human Tone",
      description: "Adjust fluency, creativity, and tone to make your text sound authentically human."
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Maintain Meaning",
      description: "Our system preserves the original meaning while changing the structure and style."
    },
    {
      icon: <Globe size={24} />,
      title: "Multiple Languages",
      description: "Support for over 20 languages with specialized humanization for each."
    },
    {
      icon: <Clock size={24} />,
      title: "Save Time",
      description: "Stop spending hours manually editing AI-generated content to sound more human."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-blue-600">HumanizeAI</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI humanizer transforms robotic, AI-generated content into natural-sounding text that's indistinguishable from human writing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#"
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            See All Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;