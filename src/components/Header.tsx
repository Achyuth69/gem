import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-primary-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary-500 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sahayak</h1>
              <p className="text-xs text-gray-500">AI Teaching Assistant</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/content-generator" className="text-gray-700 hover:text-primary-600 transition-colors">
              Content Generator
            </Link>
            <Link to="/worksheet-creator" className="text-gray-700 hover:text-primary-600 transition-colors">
              Worksheets
            </Link>
            <Link to="/knowledge-base" className="text-gray-700 hover:text-primary-600 transition-colors">
              Knowledge Base
            </Link>
            <Link to="/lesson-planner" className="text-gray-700 hover:text-primary-600 transition-colors">
              Lesson Planner
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === currentLanguage)?.native}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {lang.native} ({lang.name})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/content-generator" className="py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Content Generator
              </Link>
              <Link to="/worksheet-creator" className="py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Worksheets
              </Link>
              <Link to="/knowledge-base" className="py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Knowledge Base
              </Link>
              <Link to="/lesson-planner" className="py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Lesson Planner
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};