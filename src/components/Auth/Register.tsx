import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { GraduationCap, Mail, Lock, User, School, MapPin, Eye, EyeOff, Loader, CheckCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    location: '',
    subjects: [] as string[],
    grades: [] as string[],
    language: 'en'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies',
    'Environmental Studies', 'Arts', 'Physical Education', 'Computer Science'
  ];

  const gradeOptions = [
    '1-3', '4-6', '7-9', '10-12'
  ];

  const translations = {
    en: {
      title: 'Join Sahayak Community',
      subtitle: 'Empower Your Teaching Journey',
      description: 'Create your account to access AI-powered teaching tools designed for Indian educators',
      step1: 'Basic Information',
      step2: 'Teaching Details',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      school: 'School Name',
      location: 'Location (City, State)',
      subjects: 'Subjects You Teach',
      grades: 'Grade Levels',
      language: 'Preferred Language',
      next: 'Next Step',
      previous: 'Previous',
      createAccount: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      passwordRequirements: 'Password must be at least 6 characters long'
    },
    hi: {
      title: 'सहायक समुदाय में शामिल हों',
      subtitle: 'अपनी शिक्षण यात्रा को सशक्त बनाएं',
      description: 'भारतीय शिक्षकों के लिए डिज़ाइन किए गए AI-संचालित शिक्षण उपकरणों तक पहुंचने के लिए अपना खाता बनाएं',
      step1: 'बुनियादी जानकारी',
      step2: 'शिक्षण विवरण',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      school: 'स्कूल का नाम',
      location: 'स्थान (शहर, राज्य)',
      subjects: 'आप जो विषय पढ़ाते हैं',
      grades: 'कक्षा स्तर',
      language: 'पसंदीदा भाषा',
      next: 'अगला चरण',
      previous: 'पिछला',
      createAccount: 'खाता बनाएं',
      haveAccount: 'पहले से खाता है?',
      signIn: 'साइन इन करें',
      passwordRequirements: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'
    }
  };

  const t = translations[formData.language as keyof typeof translations] || translations.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: 'subjects' | 'grades', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: formData.fullName
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'teachers', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        school: formData.school,
        location: formData.location,
        subjects: formData.subjects,
        grades: formData.grades,
        preferredLanguage: formData.language,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex">
      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Language Selector */}
          <div className="flex justify-end">
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
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

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
              </div>
              <span className="text-sm font-medium">{t.step1}</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">{t.step2}</span>
            </div>
          </div>

          {/* Registration Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.fullName}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.password}
                      onChange={handleInputChange}
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
                  <p className="text-xs text-gray-500 mt-1">{t.passwordRequirements}</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.confirmPassword}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                >
                  {t.next}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.school}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <School className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      value={formData.school}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Government Primary School"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.location}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Mumbai, Maharashtra"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.subjects}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={() => handleArrayChange('subjects', subject)}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.grades}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gradeOptions.map((grade) => (
                      <label key={grade} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.grades.includes(grade)}
                          onChange={() => handleArrayChange('grades', grade)}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Grade {grade}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    {t.previous}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      t.createAccount
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="text-center">
              <span className="text-sm text-gray-600">{t.haveAccount} </span>
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                {t.signIn}
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Features Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary-500 to-primary-600 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h3 className="text-3xl font-bold mb-8">Transform Your Classroom</h3>
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-semibold mb-3">🎯 Personalized Teaching</h4>
              <p className="text-white/80 text-sm">
                Create content tailored to your students' local context and learning levels
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-semibold mb-3">🚀 Save Time</h4>
              <p className="text-white/80 text-sm">
                Generate worksheets, lesson plans, and visual aids in minutes, not hours
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-semibold mb-3">🌍 Multi-Language Support</h4>
              <p className="text-white/80 text-sm">
                Work in your preferred language with full voice assistant support
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 text-sm">
              Join thousands of teachers already using Sahayak to enhance their teaching
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};