import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Image, 
  Calendar, 
  Mic, 
  Gamepad2, 
  Users,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Globe,
  Award
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const features = [
    {
      title: 'Hyper-Local Content Generator',
      description: 'Create culturally relevant stories and lessons in your local language using AI',
      icon: BookOpen,
      link: '/content-generator',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      badge: 'AI Powered'
    },
    {
      title: 'Smart Worksheet Creator',
      description: 'Upload textbook pages and generate multi-level worksheets automatically',
      icon: FileText,
      link: '/worksheet-creator',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      badge: 'Auto-Generate'
    },
    {
      title: 'Instant Knowledge Base',
      description: 'Get simple explanations for complex questions with voice support',
      icon: HelpCircle,
      link: '/knowledge-base',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      badge: 'Voice Enabled'
    },
    {
      title: 'Visual Aids Designer',
      description: 'Generate simple drawings and charts for blackboard teaching',
      icon: Image,
      link: '/visual-aids',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      badge: 'Blackboard Ready'
    },
    {
      title: 'AI Lesson Planner',
      description: 'Comprehensive lesson planning for multi-grade classrooms',
      icon: Calendar,
      link: '/lesson-planner',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      badge: 'Multi-Grade'
    },
    {
      title: 'Audio Assessment',
      description: 'Voice-based reading assessments and pronunciation checks',
      icon: Mic,
      link: '/audio-assessment',
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      badge: 'Speech AI'
    },
    {
      title: 'Educational Games',
      description: 'Generate interactive games for different subjects and grades',
      icon: Gamepad2,
      link: '/games-generator',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      badge: 'Interactive'
    },
  ];

  const stats = [
    { label: 'Students Helped', value: '2,500+', icon: Users, color: 'text-blue-600' },
    { label: 'Content Created', value: '1,200+', icon: BookOpen, color: 'text-green-600' },
    { label: 'Time Saved', value: '450 hrs', icon: Clock, color: 'text-purple-600' },
    { label: 'Teacher Rating', value: '4.8/5', icon: Star, color: 'text-yellow-600' },
  ];

  const quickActions = [
    {
      title: 'Create Story in Hindi',
      description: 'Generate a story about water cycle',
      action: () => window.location.href = '/content-generator',
      icon: BookOpen,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Make Math Worksheet',
      description: 'Upload textbook page for instant worksheets',
      action: () => window.location.href = '/worksheet-creator',
      icon: FileText,
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Explain Science Concept',
      description: 'Get simple explanation for any topic',
      action: () => window.location.href = '/knowledge-base',
      icon: HelpCircle,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Sahayak</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your AI-powered teaching companion designed specifically for multi-grade classrooms in India. 
            Create localized content, differentiated materials, and engaging learning experiences with the power of Google AI.
          </p>
        </div>
        
        {/* Voice Command Indicator */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-2 text-blue-800">
            <Mic className="h-5 w-5" />
            <span className="font-medium">Voice Commands Active</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            Try saying: "Create content about plants" or "Make worksheet" or "Explain gravity"
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow">
            <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} border-2 rounded-xl p-6 text-left transition-all duration-300 hover:scale-105`}
            >
              <action.icon className="h-8 w-8 text-gray-700 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group bg-white rounded-xl p-6 shadow-sm border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className={`${feature.color} p-3 rounded-lg mr-4 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                <span>Explore Feature</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Powered by Google AI</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Sahayak leverages cutting-edge Google AI technologies including Gemini for content generation, 
            Vertex AI for speech processing, and Firebase for seamless deployment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Gemini AI</h4>
            <p className="text-sm opacity-90">Advanced content generation and image analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Multi-Language</h4>
            <p className="text-sm opacity-90">Support for 8+ Indian languages with cultural context</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Voice AI</h4>
            <p className="text-sm opacity-90">Speech recognition and synthesis for accessibility</p>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Start Guide</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold text-primary-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Choose Language</h4>
            <p className="text-sm text-gray-600">Select your preferred local language from the header menu</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold text-primary-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Pick a Tool</h4>
            <p className="text-sm text-gray-600">Select the feature you need or use voice commands</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold text-primary-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Create Content</h4>
            <p className="text-sm text-gray-600">Generate AI-powered content for your students</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-xl font-bold text-primary-600">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Use in Class</h4>
            <p className="text-sm text-gray-600">Download, print, or present the generated materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};