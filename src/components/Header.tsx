import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Globe, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from './Auth/AuthContext';
import { useMultilingual } from './Enhanced/MultilingualProvider';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const { currentLanguage, setLanguage, languages, t } = useMultilingual();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-xl border-b-4 border-gradient-to-r from-primary-500 to-secondary-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Sahayak
              </h1>
              <p className="text-xs text-gray-500 font-medium">AI Teaching Assistant</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/content-generator" 
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              {t('navigation.contentGenerator')}
            </Link>
            <Link 
              to="/worksheet-creator" 
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              {t('navigation.worksheetCreator')}
            </Link>
            <Link 
              to="/knowledge-base" 
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              {t('navigation.knowledgeBase')}
            </Link>
            <Link 
              to="/lesson-planner" 
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              {t('navigation.lessonPlanner')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === currentLanguage)?.native}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary-50 text-sm transition-colors ${
                        currentLanguage === lang.code ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lang.native}</span>
                        <span className="text-xs text-gray-500">({lang.name})</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{profile?.fullName || user?.displayName || 'Teacher'}</p>
                  <p className="text-xs text-gray-500">{profile?.school || 'School'}</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{profile?.fullName || user?.displayName}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-400">{profile?.school}</p>
                  </div>
                  
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>{t('common.settings')}</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm flex items-center space-x-2 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('common.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link to="/dashboard" className="py-3 px-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {t('navigation.home')}
              </Link>
              <Link to="/content-generator" className="py-3 px-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {t('navigation.contentGenerator')}
              </Link>
              <Link to="/worksheet-creator" className="py-3 px-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {t('navigation.worksheetCreator')}
              </Link>
              <Link to="/knowledge-base" className="py-3 px-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {t('navigation.knowledgeBase')}
              </Link>
              <Link to="/lesson-planner" className="py-3 px-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {t('navigation.lessonPlanner')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};