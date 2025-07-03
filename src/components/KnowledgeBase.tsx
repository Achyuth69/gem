import React, { useState } from 'react';
import { HelpCircle, Search, Lightbulb, BookOpen, Globe, Volume2, Mic } from 'lucide-react';
import { AIService } from '../services/aiService';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

export const KnowledgeBase: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('hi');
  const [gradeLevel, setGradeLevel] = useState('1-3');
  const [isSearching, setIsSearching] = useState(false);
  const [answer, setAnswer] = useState('');
  const { speak, speaking, supported } = useSpeechSynthesis();

  const popularQuestions = [
    { q: 'Why is the sky blue?', category: 'Science', grade: '1-3' },
    { q: 'How do plants make food?', category: 'Science', grade: '4-6' },
    { q: 'What causes seasons?', category: 'Science', grade: '7-9' },
    { q: 'Why do we have different time zones?', category: 'Geography', grade: '4-6' },
    { q: 'How does rain form?', category: 'Science', grade: '1-3' },
    { q: 'What is gravity?', category: 'Physics', grade: '7-9' },
    { q: 'Why do leaves change color?', category: 'Science', grade: '4-6' },
    { q: 'How do birds fly?', category: 'Science', grade: '1-3' },
  ];

  const categories = [
    { name: 'Science', icon: '🔬', color: 'bg-blue-100 text-blue-800' },
    { name: 'Mathematics', icon: '📐', color: 'bg-green-100 text-green-800' },
    { name: 'Geography', icon: '🌍', color: 'bg-purple-100 text-purple-800' },
    { name: 'History', icon: '📚', color: 'bg-orange-100 text-orange-800' },
    { name: 'Language', icon: '📝', color: 'bg-pink-100 text-pink-800' },
    { name: 'Arts', icon: '🎨', color: 'bg-indigo-100 text-indigo-800' },
  ];

  const handleSearch = async () => {
    if (!question.trim()) return;

    setIsSearching(true);
    try {
      const aiService = AIService.getInstance();
      const response = await aiService.generateContent(question, language, 'explanation', gradeLevel);
      setAnswer(response);
      
      // Auto-speak the answer if supported
      if (supported) {
        setTimeout(() => {
          const langCode = language === 'hi' ? 'hi-IN' : language === 'en' ? 'en-US' : 'hi-IN';
          speak(response, langCode, 0.9);
        }, 500);
      }
    } catch (error) {
      console.error('Error getting explanation:', error);
      setAnswer('Sorry, I could not generate an explanation. Please try again.');
    }
    setIsSearching(false);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is') || lowerCommand.includes('why')) {
      // Extract question from voice command
      const questionMatch = lowerCommand.match(/(?:explain|what is|why)\s+(.+)/);
      if (questionMatch) {
        setQuestion(questionMatch[1]);
        setTimeout(handleSearch, 500);
      }
    } else if (lowerCommand.includes('hindi')) {
      setLanguage('hi');
    } else if (lowerCommand.includes('english')) {
      setLanguage('en');
    }
  };

  const handleQuestionClick = (q: string) => {
    setQuestion(q);
    setTimeout(handleSearch, 300);
  };

  const handleSpeak = () => {
    if (answer) {
      const langCode = language === 'hi' ? 'hi-IN' : language === 'en' ? 'en-US' : 'hi-IN';
      speak(answer, langCode);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Instant Knowledge Base</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get simple, culturally relevant explanations for any student question in your local language
        </p>
        <div className="mt-4 bg-yellow-50 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            🎤 Try: "Explain why the sky is blue" or "What is photosynthesis"
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Search className="h-5 w-5 text-primary-500 mr-2" />
              Ask a Question
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student's Question
                </label>
                <div className="relative">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., Why is the sky blue? How do plants grow? What causes earthquakes?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={() => handleVoiceCommand(question)}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-primary-500 transition-colors"
                    title="Use voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="mr">Marathi (मराठी)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                    <option value="te">Telugu (తెలుగు)</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Grade Level
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="1-3">Grade 1-3 (Primary)</option>
                    <option value="4-6">Grade 4-6 (Upper Primary)</option>
                    <option value="7-9">Grade 7-9 (Secondary)</option>
                    <option value="10-12">Grade 10-12 (Higher Secondary)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!question.trim() || isSearching}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating Explanation...
                  </span>
                ) : (
                  'Get Explanation'
                )}
              </button>
            </div>
          </div>

          {/* Answer Section */}
          {answer && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                  Explanation
                </h3>
                {supported && (
                  <button
                    onClick={handleSpeak}
                    disabled={speaking}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    title="Read explanation aloud"
                  >
                    <Volume2 className={`h-4 w-4 ${speaking ? 'animate-pulse' : ''}`} />
                  </button>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                  {answer}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors hover:opacity-80 ${category.color}`}
                >
                  <div className="text-lg mb-1">{category.icon}</div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Questions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 text-primary-500 mr-2" />
              Popular Questions
            </h3>
            <div className="space-y-3">
              {popularQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(item.q)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="font-medium text-sm text-gray-900 mb-1">{item.q}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Grade {item.grade}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <button
          onClick={() => handleQuestionClick('Why is the sky blue?')}
          className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-blue-900">Why is the sky blue?</h4>
          <p className="text-sm text-blue-700 mt-1">Simple explanation with local examples</p>
        </button>
        
        <button
          onClick={() => handleQuestionClick('How do plants make food?')}
          className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-green-900">How do plants make food?</h4>
          <p className="text-sm text-green-700 mt-1">Photosynthesis explained simply</p>
        </button>
        
        <button
          onClick={() => handleQuestionClick('What causes rain?')}
          className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-purple-900">What causes rain?</h4>
          <p className="text-sm text-purple-700 mt-1">Water cycle in simple terms</p>
        </button>
      </div>

      {/* Features */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Features</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <Globe className="h-8 w-8 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Local Context</h4>
            <p className="text-gray-600">Every explanation includes familiar examples from your students' daily lives</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Volume2 className="h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Voice Enabled</h4>
            <p className="text-gray-600">Ask questions by voice and hear explanations read aloud</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Instant Answers</h4>
            <p className="text-gray-600">Get immediate, grade-appropriate explanations for any question</p>
          </div>
        </div>
      </div>
    </div>
  );
};