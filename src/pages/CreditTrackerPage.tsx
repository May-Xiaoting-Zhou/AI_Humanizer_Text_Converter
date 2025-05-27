import React from 'react'; // Removed useEffect
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { useCreditsStore } from '../store/creditsStore'; // Removed store import
import { useAuthStore } from '../store/authStore';

const planDetails = [
  {
    name: 'Free',
    price: '$0',
    credits: '10 Credits',
    totalCredits: 10,
    features: ['Basic Humanization', 'Limited Usage', 'Community Support'],
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
  },
  {
    name: 'Pro',
    price: '$19/month',
    credits: '100 Credits/month',
    totalCredits: 100,
    features: [
      'Advanced Humanization',
      'Higher Usage Limits',
      'Priority Email Support',
      'Access to New Features',
    ],
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$49/month',
    credits: '500 Credits/month',
    totalCredits: 500,
    features: [
      'Ultimate Humanization Suite',
      'Unlimited Usage',
      'Dedicated Support',
      'Early Access Program',
      'API Access',
    ],
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
  },
];

const CreditTrackerPage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Dummy data for plan and credits
  const plan = 'Pro'; // Example: User is on Pro plan
  const credits = 75;  // Example: User has 75 credits remaining
  const loading = false; // No loading as data is static

  // useEffect(() => { // Removed useEffect
  //   if (user) {
  //     fetchCredits();
  //   }
  // }, [user, fetchCredits]);

  const currentPlanDetails = planDetails.find(p => p.name.toLowerCase() === plan.toLowerCase());
  // Calculate creditsUsed based on dummy totalCredits and dummy remaining credits
  const creditsUsed = currentPlanDetails ? currentPlanDetails.totalCredits - credits : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Credit Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor your credit usage and explore plan benefits.
          </p>
        </div>

        {/* Removed loading state check as it's always false now */}
        {user && (
          <div className="bg-gray-50 shadow-lg rounded-xl p-8 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Current Status</h2>
            <p className="text-lg text-gray-700">
              Current Plan: <span className="font-bold capitalize">{plan}</span>
            </p>
            <p className="text-4xl font-bold text-purple-600 my-3">
              {credits} <span className="text-2xl font-normal text-gray-600">Credits Remaining</span>
            </p>
            {currentPlanDetails && (
                <p className="text-lg text-gray-700">
                    Credits Used This Cycle: <span className="font-bold">{creditsUsed >= 0 ? creditsUsed : 0}</span> / {currentPlanDetails.totalCredits}
                </p>
            )}
            <Link 
              to="/pricing"
              className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              View Pricing & Upgrade
            </Link>
          </div>
        )}
        {!user && (
            <div className="text-center bg-yellow-50 p-6 rounded-lg shadow">
                <p className="text-yellow-700 text-lg">Please <Link to="/login" className="font-bold underline">login</Link> to view your credit information.</p>
            </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Credit Allowances by Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planDetails.map((p, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-lg p-6 flex flex-col ${p.bgColor} ${p.textColor} ${plan.toLowerCase() === p.name.toLowerCase() ? 'ring-4 ring-purple-500' : ''}`}
              >
                <h3 className={`text-2xl font-bold mb-2`}>{p.name}</h3>
                <p className={`text-3xl font-extrabold mb-1 ${plan.toLowerCase() === p.name.toLowerCase() ? 'text-purple-600' : ''}`}>{p.price}</p>
                <p className={`text-lg font-semibold mb-4`}>{p.credits}</p>
                
                <ul className="space-y-2 mb-6 flex-grow text-sm">
                  {p.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.toLowerCase() === p.name.toLowerCase() ? 'text-green-500' : 'text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.toLowerCase() !== p.name.toLowerCase() && (
                    <Link 
                        to="/pricing"
                        className={`w-full text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${p.name === 'Pro' ? 'bg-blue-600 hover:bg-blue-700 text-white' : p.name === 'Premium' ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}`}
                    >
                        { p.name === 'Free' ? 'Current Plan' : `Switch to ${p.name}` }
                    </Link>
                )}
                 {plan.toLowerCase() === p.name.toLowerCase() && (
                    <p className="text-center py-2 px-4 rounded-lg font-semibold bg-green-500 text-white">
                        Current Plan
                    </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreditTrackerPage;