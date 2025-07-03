import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Download, Share2, Copy, Mic, Volume2 } from 'lucide-react';
import { AIService } from '../services/aiService';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

export const ContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('hi');
  const [contentType, setContentType] = useState('story');
  const [gradeLevel, setGradeLevel] = useState('1-3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { speak, speaking, supported } = useSpeechSynthesis();

  const languages = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'en', name: 'English', native: 'English' },
  ];

  const contentTypes = [
    { value: 'story', label: 'Story/Narrative' },
    { value: 'explanation', label: 'Concept Explanation' },
    { value: 'dialogue', label: 'Dialogue/Conversation' },
    { value: 'poem', label: 'Poem/Rhyme' },
    { value: 'activity', label: 'Activity Instructions' },
    { value: 'examples', label: 'Examples & Analogies' },
  ];

  const gradeLevels = [
    { value: '1-3', label: 'Grade 1-3 (Primary)' },
    { value: '4-6', label: 'Grade 4-6 (Upper Primary)' },
    { value: '7-9', label: 'Grade 7-9 (Secondary)' },
    { value: '10-12', label: 'Grade 10-12 (Higher Secondary)' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const aiService = AIService.getInstance();
      const content = await aiService.generateContent(prompt, language, contentType, gradeLevel);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Error generating content. Please try again.');
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleSpeak = () => {
    if (generatedContent) {
      const langCode = language === 'hi' ? 'hi-IN' : language === 'en' ? 'en-US' : 'hi-IN';
      speak(generatedContent, langCode);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('create') || lowerCommand.includes('generate')) {
      // Extract content from voice command
      const contentMatch = lowerCommand.match(/(?:create|generate)\s+(.+)/);
      if (contentMatch) {
        setPrompt(contentMatch[1]);
        setTimeout(handleGenerate, 500);
      }
    } else if (lowerCommand.includes('story')) {
      setContentType('story');
    } else if (lowerCommand.includes('explain')) {
      setContentType('explanation');
    } else if (lowerCommand.includes('hindi')) {
      setLanguage('hi');
    } else if (lowerCommand.includes('english')) {
      setLanguage('en');
    }
  };

  // Auto-generate content when voice command sets prompt
  useEffect(() => {
    if (prompt && prompt.length > 10) {
      const timer = setTimeout(() => {
        handleGenerate();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [prompt]);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Hyper-Local Content Generator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create culturally relevant stories, explanations, and teaching materials in your local language
        </p>
        <div className="mt-4 bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            🎤 Try voice commands: "Create a story about farmers in Hindi" or "Explain photosynthesis"
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
            Content Request
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to create?
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a story about farmers to explain different soil types"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={() => handleVoiceCommand(prompt)}
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
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.native} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {gradeLevels.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating...
                </span>
              ) : (
                'Generate Content'
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Content</h2>
            {generatedContent && (
              <div className="flex space-x-2">
                {supported && (
                  <button
                    onClick={handleSpeak}
                    disabled={speaking}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    title="Read aloud"
                  >
                    <Volume2 className={`h-4 w-4 ${speaking ? 'animate-pulse' : ''}`} />
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {generatedContent}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated content will appear here</p>
              <p className="text-xs mt-2">Try using voice commands for faster input!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <button
          onClick={() => {
            setPrompt('Create a story about water cycle for children');
            setContentType('story');
            setTimeout(handleGenerate, 500);
          }}
          className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-blue-900">Water Cycle Story</h4>
          <p className="text-sm text-blue-700 mt-1">Generate an engaging story about water cycle</p>
        </button>
        
        <button
          onClick={() => {
            setPrompt('Explain photosynthesis using local plants');
            setContentType('explanation');
            setTimeout(handleGenerate, 500);
          }}
          className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-green-900">Photosynthesis Explanation</h4>
          <p className="text-sm text-green-700 mt-1">Simple explanation with local examples</p>
        </button>
        
        <button
          onClick={() => {
            setPrompt('Create math word problems about local market');
            setContentType('activity');
            setTimeout(handleGenerate, 500);
          }}
          className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-left transition-colors"
        >
          <h4 className="font-medium text-purple-900">Math Word Problems</h4>
          <p className="text-sm text-purple-700 mt-1">Contextual math problems for practice</p>
        </button>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Better Content</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Voice Commands</h4>
            <p>Use natural language like "Create a story about..." or "Explain how..."</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Local Context</h4>
            <p>Mention local customs, festivals, or familiar situations for better relatability.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Grade-Appropriate</h4>
            <p>Select the right grade level to ensure vocabulary matches your students' abilities.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Multi-Language</h4>
            <p>Switch between languages easily to create content in your preferred language.</p>
          </div>
        </div>
      </div>
    </div>
  );
};