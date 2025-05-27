import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      name: 'Free',
      price: '$0',
      credits: '10 Credits',
      features: ['Basic Humanization', 'Limited Usage', 'Community Support'],
      buttonText: 'Get Started',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      buttonColor: 'bg-gray-500 hover:bg-gray-600',
      action: () => navigate('/'), // Navigate to home for Free plan
    },
    {
      name: 'Pro',
      price: '$19/month',
      credits: '100 Credits/month',
      features: [
        'Advanced Humanization',
        'Higher Usage Limits',
        'Priority Email Support',
        'Access to New Features',
      ],
      buttonText: 'Choose Pro',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      buttonColor: 'bg-white hover:bg-blue-100 text-blue-600',
      highlight: true,
      action: () => navigate('/payment', { state: { plan: 'Pro' } }), // Navigate to payment for Pro plan
    },
    {
      name: 'Premium',
      price: '$49/month',
      credits: '500 Credits/month',
      features: [
        'Ultimate Humanization Suite',
        'Unlimited Usage',
        'Dedicated Support',
        'Early Access Program',
        'API Access',
      ],
      buttonText: 'Choose Premium',
      bgColor: 'bg-gray-800',
      textColor: 'text-white',
      buttonColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      action: () => navigate('/payment', { state: { plan: 'Premium' } }), // Navigate to payment for Premium plan
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Flexible Pricing for Everyone
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. Humanize your text with our powerful AI, backed by generous credit allowances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-xl p-8 flex flex-col ${plan.bgColor} ${plan.textColor} ${plan.highlight ? 'ring-4 ring-purple-500 transform scale-105' : ''}`}
            >
              <h2 className={`text-3xl font-bold mb-2 ${plan.highlight ? 'text-white' : ''}`}>{plan.name}</h2>
              <p className={`text-4xl font-extrabold mb-1 ${plan.highlight ? 'text-yellow-300' : ''}`}>{plan.price}</p>
              <p className={`text-lg font-semibold mb-6 ${plan.highlight ? 'text-blue-200' : ''}`}>{plan.credits}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className={`w-6 h-6 mr-2 flex-shrink-0 ${plan.highlight ? 'text-green-300' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={plan.action} // Add onClick handler
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 ${plan.buttonColor}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;