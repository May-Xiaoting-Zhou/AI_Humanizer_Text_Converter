import React from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/${sectionId}`);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HumanizeAI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('#features')} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('#testimonials')} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Testimonials
          </button>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
            Blog
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in-down">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('#features')}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('#testimonials')}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
            >
              Testimonials
            </button>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;