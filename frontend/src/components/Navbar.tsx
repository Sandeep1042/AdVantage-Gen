import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav id="top" className="gradient-bg-nav shadow-sm w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center cursor-pointer">
            {/* Left: Logo */}
            <div className="flex items-center space-x-2 group">
              <img src="/avg2.png" alt="Logo" className="h-8 w-20 object-contain" />
              <span className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white transition-opacity duration-300">AdVantage Gen</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <a href="#ai-tools" className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition-colors">
                  AI Tools
                </a>
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition-colors">
                  Pricing
                </a>
                <div className="flex items-center space-x-4 ml-4">
                  <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition-colors">
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition-colors">
                  <i className="fas fa-home mr-2"></i>Dashboard
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-blue focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm">
                      U
                    </div>
                    <i className={`fas fa-chevron-down text-sm transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-gray-700 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <i className="fas fa-user mr-2 w-5"></i>Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <i className="fas fa-cog mr-2 w-5"></i>Settings
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt mr-2 w-5"></i>Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">

            <button
              className="text-gray-700 dark:text-gray-300 hover:text-primary-blue focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <a href="#features" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Features
                </a>
                <a href="#pricing" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Pricing
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link to="/login" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Log In
                </Link>
                <Link to="/register" className="block text-primary-blue font-medium">
                  Sign Up Free
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Dashboard
                </Link>
                <Link to="/profile" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Profile
                </Link>
                <Link to="/settings" className="block text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium">
                  Settings
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link to="/logout" className="block text-red-600 font-medium">
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
