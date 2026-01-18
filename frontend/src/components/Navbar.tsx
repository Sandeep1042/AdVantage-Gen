import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-xl"></i>
            </div>
            <span className="ml-3 text-xl font-bold gradient-text">AdVantage Gen</span>
          </Link>

          {!isAuthenticated && (
            <>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                  Features
                </a>
                <a href="#pricing" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                  Pricing
                </a>
                <a href="#testimonials" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                  Testimonials
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-white px-6 py-2 rounded-lg font-medium"
                >
                  Sign Up Free
                </Link>
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                <i className="fas fa-home mr-2"></i>Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                  <i className="fas fa-chevron-down text-sm"></i>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-user mr-2"></i>Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-cog mr-2"></i>Settings
                    </Link>
                    <hr className="my-2" />
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">
              Features
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-medium">
              Pricing
            </a>
            <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 font-medium">
              Testimonials
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
