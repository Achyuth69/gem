import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader, Globe } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  const translations = {
    en: {
      title: 'Welcome Back to Sahayak',
      subtitle: 'Your AI Teaching Assistant',
      description: 'Sign in to access your personalized teaching tools and continue empowering your students',
      email: 'Email Address',
      password: 'Password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      or: 'or',
      demoLogin: 'Try Demo Account',
      features: {
        content: 'Generate hyper-local content in your language',
        worksheets: 'Create differentiated worksheets instantly',
        voice: 'Voice-powered teaching assistance',
        multilingual: 'Support for 8+ Indian languages'
      }
    },
    hi: {
      title: 'सहायक में आपका स्वागत है',
      subtitle: 'आपका AI शिक्षण सहायक',
      description: 'अपने व्यक्तिगत शिक्षण उपकरणों तक पहुंचने और अपने छात्रों को सशक्त बनाना जारी रखने के लिए साइन इन करें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      signIn: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      noAccount: 'खाता नहीं है?',
      signUp: 'साइन अप करें',
      or: 'या',
      demoLogin: 'डेमो खाता आज़माएं',
      features: {
        content: 'अपनी भाषा में स्थानीय सामग्री बनाएं',
        worksheets: 'तुरंत विभिन्न स्तर की वर्कशीट बनाएं',
        voice: 'आवाज़ संचालित शिक्षण सहायता',
        multilingual: '8+ भारतीय भाषाओं का समर्थन'
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, 'demo@sahayak.com', 'demo123');
      navigate('/dashboard');
    } catch (error) {
      // If demo account doesn't exist, navigate anyway for demo purposes
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Language Selector */}
          <div className="flex justify-end">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
            <p className="text-lg text-primary-600 font-medium mb-2">{t.subtitle}</p>
            <p className="text-gray-600 text-sm">{t.description}</p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="teacher@school.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
              >
                {t.forgotPassword}
              </Link>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  t.signIn
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.or}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                {t.demoLogin}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">{t.noAccount} </span>
              <Link
                to="/register"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                {t.signUp}
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Features Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-secondary-600 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h3 className="text-3xl font-bold mb-8">Empower Your Teaching</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-lg p-2">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.features.multilingual}</h4>
                <p className="text-white/80 text-sm">{t.features.content}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-lg p-2">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Smart Worksheets</h4>
                <p className="text-white/80 text-sm">{t.features.worksheets}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-lg p-2">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Voice Assistant</h4>
                <p className="text-white/80 text-sm">{t.features.voice}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white/10 rounded-xl p-6">
            <h4 className="font-semibold mb-3">Trusted by 2,500+ Teachers</h4>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg">4.8/5</div>
                <div className="text-white/80">Rating</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">450hrs</div>
                <div className="text-white/80">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">1,200+</div>
                <div className="text-white/80">Content Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};