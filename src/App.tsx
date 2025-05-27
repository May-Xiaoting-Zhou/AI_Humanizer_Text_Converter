import React from 'react';
import {
  BrowserRouter as Router, // Correctly alias BrowserRouter as Router
  Routes,
  Route,
  useLocation,
  Navigate // Ensure Navigate is also imported if used in protected routes
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PricingPage from './pages/PricingPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';
import CreditTrackerPage from './pages/CreditTrackerPage';
import ContactPage from './pages/ContactPage'; // Add this import
import { useAuthStore } from './store/authStore';

function App() {
  const { user, loading: isLoading } = useAuthStore(state => ({
    user: state.user,
    loading: state.loading,
  }));

  // Log user sign-in status
  console.log('User signed in:', !!user);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Add this route */}
        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route 
          path="/payment/:plan"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route 
          path="/credits-tracker" 
          element={user ? <CreditTrackerPage /> : <Navigate to="/login" replace />}
        /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;