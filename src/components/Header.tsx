import React, { useState, useEffect, useRef } from 'react'; // Added useEffect and useRef
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'; // Added ChevronDown
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiToolsDropdownOpen, setIsAiToolsDropdownOpen] = useState(false); // New state for AI Tools dropdown
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuthStore(); // Changed from 'logout: signOut'
  const aiToolsRef = useRef<HTMLDivElement>(null); // Ref for AI tools dropdown

  // AI Tools list (similar to the image provided)
  const aiToolsLinks = [
    { href: "#", text: "Paraphraser" },
    { href: "#", text: "Grammar Checker" },
    { href: "#", text: "AI Detector" },
    { href: "#", text: "Plagiarism Checker" },
    { href: "#", text: "AI Humanizer" },
    { href: "#", text: "Summarizer" },
    { href: "#", text: "Translate" },
    { href: "#", text: "Citation Generator" },
    { href: "#", text: "QuillBot Flow" }, // Assuming this is a tool
  ];

  const handleSignOut = async () => {
    try {
      await signOut(); // This calls the signOut from useAuthStore
      navigate('/');
      setIsMenuOpen(false);
      setIsAiToolsDropdownOpen(false);
    } catch (error) {
      console.error("Error during sign out:", error);
      // Optionally, you could add some user feedback here, like an alert
      // alert("Failed to sign out. Please try again.");
    }
  };

  const handleScroll = (sectionIdWithHash: string) => {
    const sectionId = sectionIdWithHash.substring(1); // Remove # for querySelector
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`); // Navigate to home page then scroll
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    setIsAiToolsDropdownOpen(false); // Close AI tools dropdown on scroll
  };

  // Close AI tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiToolsRef.current && !aiToolsRef.current.contains(event.target as Node)) {
        setIsAiToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainNavLinks = [
    { href: "/#features", text: "Features", isScroll: true },
    { href: "/#testimonials", text: "Testimonials", isScroll: true },
    { href: "/pricing", text: "Pricing", isScroll: false },
    { href: "/#blog", text: "Blog", isScroll: true }, // Assuming a blog section
    { href: "/contact", text: "Contact", isScroll: false },
  ];

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
        <nav className="hidden md:flex items-center space-x-6">
          {/* AI Tools Dropdown Button - Desktop */}
          <div className="relative" ref={aiToolsRef}>
            <button
              onClick={() => setIsAiToolsDropdownOpen(!isAiToolsDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              AI Tools
              <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${isAiToolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isAiToolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                {aiToolsLinks.map((tool) => (
                  <Link
                    key={tool.text}
                    to={tool.href} // Using dummy href for now
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setIsAiToolsDropdownOpen(false)} // Close dropdown on item click
                  >
                    {tool.text}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainNavLinks.map((link) => (
            <Link
              key={link.text}
              to={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
              onClick={() => link.isScroll && handleScroll(link.href)}
            >
              {link.text}
            </Link>
          ))}
          {user ? (
            <>
              {/* These show when user is logged IN */}
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Dashboard</Link>
              <Link to="/credits-tracker" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Credits</Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* These show when user is logged OUT */}
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
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
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in-down">
          <nav className="flex flex-col space-y-4">
            {/* AI Tools Section - Mobile */}
            <div className="py-2">
              <button 
                onClick={() => setIsAiToolsDropdownOpen(!isAiToolsDropdownOpen)} 
                className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
              >
                AI Tools
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${isAiToolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAiToolsDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                  {aiToolsLinks.map((tool) => (
                    <Link
                      key={tool.text}
                      to={tool.href} // Using dummy href for now
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => {
                        setIsAiToolsDropdownOpen(false);
                        setIsMenuOpen(false); // Close main mobile menu as well
                      }}
                    >
                      {tool.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainNavLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left w-full"
                onClick={() => {
                  if (link.isScroll) {
                    handleScroll(link.href);
                  } else {
                    setIsMenuOpen(false);
                  }
                  setIsAiToolsDropdownOpen(false); // Close AI tools dropdown if open
                }}
              >
                {link.text}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAiToolsDropdownOpen(false);
                  }}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/credits-tracker" 
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left w-full" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAiToolsDropdownOpen(false);
                  }}
                >
                  Credits
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left w-full"
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