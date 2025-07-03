import React, { useState } from 'react';
import { Mic, Play, Pause, Square, Volume2, Award } from 'lucide-react';

export const AudioAssessment: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [assessmentType, setAssessmentType] = useState('reading');
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<any>(null);

  const languages = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'en', name: 'English', native: 'English' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  const assessmentTypes = [
    { value: 'reading', label: 'Reading Assessment', icon: '📖' },
    { value: 'pronunciation', label: 'Pronunciation Check', icon: '🗣️' },
    { value: 'fluency', label: 'Fluency Test', icon: '⚡' },
    { value: 'comprehension', label: 'Oral Comprehension', icon: '🧠' },
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner (Grade 1-3)' },
    { value: 'intermediate', label: 'Intermediate (Grade 4-6)' },
    { value: 'advanced', label: 'Advanced (Grade 7+)' },
  ];

  const sampleTexts = {
    reading: {
      hi: "सूरज सुबह उदय होता है। पंछी गाना गाते हैं। फूल खिलते हैं।",
      en: "The sun rises in the morning. Birds sing songs. Flowers bloom.",
      mr: "सूर्य सकाळी उगवतो. पक्षी गाणी गातात. फुले फुलतात.",
      ta: "சூரியன் காலையில் உதிக்கிறது. பறவைகள் பாடுகின்றன. பூக்கள் பூக்கின்றன.",
      te: "సూర్యుడు ఉదయం ఉదయిస్తాడు. పక్షులు పాటలు పాడుతాయి. పువ్వులు వికసిస్తాయి.",
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In real implementation, start recording with Web Audio API
    setTimeout(() => {
      // Mock recording completion
      setIsRecording(false);
      setAudioBlob(new Blob()); // Mock audio blob
      
      // Mock feedback after processing
      setTimeout(() => {
        setFeedback({
          score: 85,
          accuracy: 88,
          fluency: 82,
          pronunciation: 87,
          suggestions: [
            "Great job with clear pronunciation!",
            "Try to speak a bit slower for better clarity",
            "Work on the pronunciation of 'उदय' - emphasize the 'उ' sound",
            "Overall fluency is good, keep practicing!"
          ],
          strengths: ["Clear voice", "Good pace", "Proper intonation"],
          improvements: ["Consonant clarity", "Vowel sounds"]
        });
      }, 2000);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handlePlayback = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, play the recorded audio
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000); // Mock playback duration
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Mic className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Audio Assessment</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Voice-based reading assessments and pronunciation checks for students
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Setup Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Assessment Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
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
                  Assessment Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {assessmentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setAssessmentType(type.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors border ${
                        assessmentType === type.value
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.icon}</div>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {difficultyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reading Text */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Text to Read</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-lg leading-relaxed text-gray-800">
                {sampleTexts.reading[selectedLanguage as keyof typeof sampleTexts.reading]}
              </p>
            </div>
            <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
              <Volume2 className="h-4 w-4" />
              <span className="text-sm">Play Sample Audio</span>
            </button>
          </div>
        </div>

        {/* Recording Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Recording</h2>
            
            <div className="text-center space-y-4">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary-500'
                }`}>
                  <Mic className="h-10 w-10 text-white" />
                </div>
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                )}
              </div>

              <div className="space-y-2">
                {!isRecording && !audioBlob && (
                  <button
                    onClick={handleStartRecording}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                  >
                    Start Recording
                  </button>
                )}

                {isRecording && (
                  <div className="space-y-2">
                    <p className="text-red-600 font-medium">Recording in progress...</p>
                    <button
                      onClick={handleStopRecording}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
                    >
                      <Square className="h-4 w-4" />
                      <span>Stop Recording</span>
                    </button>
                  </div>
                )}

                {audioBlob && !isRecording && (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">Recording completed!</p>
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={handlePlayback}
                        className="bg-secondary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary-600 transition-colors flex items-center space-x-2"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>
                      <button
                        onClick={handleStartRecording}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Re-record
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                Assessment Results
              </h3>
              
              <div className="space-y-4">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {feedback.score}%
                  </div>
                  <p className="text-gray-600">Overall Score</p>
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-blue-600">{feedback.accuracy}%</div>
                    <p className="text-sm text-gray-600">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-600">{feedback.fluency}%</div>
                    <p className="text-sm text-gray-600">Fluency</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-purple-600">{feedback.pronunciation}%</div>
                    <p className="text-sm text-gray-600">Pronunciation</p>
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {feedback.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths & Improvements */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <h4 className="font-medium text-green-900 mb-2">Strengths:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-900 mb-2">Areas to Improve:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {feedback.improvements.map((improvement: string, index: number) => (
                        <li key={index}>• {improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Features</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Multi-Language Support</h4>
            <p className="text-gray-600">Supports major Indian languages with native pronunciation</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Real-time Feedback</h4>
            <p className="text-gray-600">Instant analysis and suggestions for improvement</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Progress Tracking</h4>
            <p className="text-gray-600">Monitor student improvement over time</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Offline Capable</h4>
            <p className="text-gray-600">Works even with limited internet connectivity</p>
          </div>
        </div>
      </div>
    </div>
  );
};