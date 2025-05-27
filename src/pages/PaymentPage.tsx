import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { useCreditsStore } from '../store/creditsStore';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || { plan: 'Pro' }; // Default to 'Pro' if no state passed
  const { user, updateUserFeaturesAndPlan } = useAuthStore(); // Use updateUserFeaturesAndPlan
  const { addCredits } = useCreditsStore();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const planDetails: { [key: string]: { price: string; credits: number; features: string[] } } = {
    Pro: { price: '$19/month', credits: 100, features: ['Advanced Humanization', 'Higher Usage Limits'] },
    Premium: { price: '$49/month', credits: 500, features: ['Ultimate Humanization Suite', 'Unlimited Usage', 'API Access'] },
  };

  const selectedPlanDetails = planDetails[plan] || planDetails.Pro;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (user) {
      const newFeatures = Array.from(new Set([...(user.features || []), ...selectedPlanDetails.features]));
      const newPlan = plan;

      try {
        // Update features and plan in Supabase and local store
        await updateUserFeaturesAndPlan(newFeatures, newPlan);
        
        // Add credits
        await addCredits(selectedPlanDetails.credits);
        
        setIsProcessing(false);
        alert(`Payment for ${plan} plan successful! Features unlocked and credits added.`);
        navigate('/');
      } catch (error) {
        console.error("Failed to update user details or credits:", error);
        setIsProcessing(false);
        alert("There was an issue processing your payment. Please try again.");
        // Potentially navigate to an error page or show a more specific error message
      }
    } else {
      setIsProcessing(false);
      alert("User not found. Please log in and try again.");
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-gray-600">
              You're subscribing to the <span className="font-semibold text-blue-600">{plan}</span> plan.
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{selectedPlanDetails.price}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="123"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay ${selectedPlanDetails.price}`}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;