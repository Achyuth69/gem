import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, Languages } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import SpeechService from '../../services/speechService';

interface EnhancedVoiceInterfaceProps {
  onVoiceCommand: (command: string) => void;
  isActive?: boolean;
}

export const EnhancedVoiceInterface: React.FC<EnhancedVoiceInterfaceProps> = ({
  onVoiceCommand,
  isActive = true
}) => {
  const { profile } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    language: profile?.preferredLanguage || 'hi',
    rate: 0.9,
    pitch: 1,
    volume: 1
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const speechService = SpeechService.getInstance();
  const settingsRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechCode: 'hi-IN' },
    { code: 'en', name: 'English', native: 'English', speechCode: 'en-US' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', speechCode: 'mr-IN' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechCode: 'ta-IN' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', speechCode: 'te-IN' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', speechCode: 'bn-IN' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speechCode: 'gu-IN' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  ];

  const voiceCommands = {
    hi: [
      'सामग्री बनाएं', 'वर्कशीट बनाएं', 'समझाएं', 'पाठ योजना बनाएं',
      'दृश्य सहायता दिखाएं', 'खेल बनाएं', 'डैशबोर्ड पर जाएं'
    ],
    en: [
      'create content', 'make worksheet', 'explain', 'plan lesson',
      'show visual aid', 'generate game', 'go to dashboard'
    ],
    mr: [
      'सामग्री तयार करा', 'वर्कशीट बनवा', 'समजावून सांगा', 'धडा नियोजन करा'
    ],
    ta: [
      'உள்ளடக்கம் உருவாக்கு', 'பணித்தாள் உருவாக்கு', 'விளக்கு', 'பாடம் திட்டமிடு'
    ],
    te: [
      'కంటెంట్ సృష్టించు', 'వర్క్‌షీట్ చేయి', 'వివరించు', 'పాఠం ప్లాన్ చేయి'
    ]
  };

  useEffect(() => {
    setIsSupported(speechService.isSupported());
    
    // Update language when profile changes
    if (profile?.preferredLanguage) {
      setVoiceSettings(prev => ({ ...prev, language: profile.preferredLanguage }));
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === voiceSettings.language) || languages[0];
  };

  const handleStartListening = async () => {
    if (isListening) return;

    try {
      setIsListening(true);
      const currentLang = getCurrentLanguage();
      const command = await speechService.startListening(currentLang.speechCode);
      setLastCommand(command);
      onVoiceCommand(command);
      
      // Provide audio feedback
      await speechService.speak('कमांड प्राप्त हुई', currentLang.speechCode);
    } catch (error) {
      console.error('Voice recognition error:', error);
    } finally {
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleToggleSpeaking = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      const currentLang = getCurrentLanguage();
      await speechService.speak(text, currentLang.speechCode);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  if (!isActive || !isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Voice Interface */}
      <div className={`bg-white rounded-2xl shadow-2xl border-2 border-primary-500 transition-all duration-300 ${
        isExpanded ? 'p-4' : 'p-2'
      }`}>
        <div className="flex items-center space-x-2">
          {/* Voice Recognition Button */}
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-lg'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice command'}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </button>

          {/* Speech Synthesis Button */}
          <button
            onClick={handleToggleSpeaking}
            className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isSpeaking
                ? 'bg-blue-500 text-white animate-pulse shadow-lg'
                : 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white hover:from-secondary-600 hover:to-accent-600 shadow-lg'
            }`}
            title={isSpeaking ? 'Stop speaking' : 'Text-to-speech available'}
          >
            {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
            title="Voice settings"
          >
            <Settings className="h-6 w-6" />
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Languages className="h-4 w-4" />
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 space-y-3">
            {/* Current Language */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Current: {getCurrentLanguage().native}
              </p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isListening ? 'bg-red-500 animate-pulse' : 
                isSpeaking ? 'bg-blue-500 animate-pulse' : 
                'bg-green-500'
              }`}></div>
              <span className="text-xs text-gray-600">
                {isListening ? 'Listening...' : 
                 isSpeaking ? 'Speaking...' : 
                 'Ready'}
              </span>
            </div>

            {/* Quick Commands */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Quick Commands:</h4>
              <div className="grid grid-cols-1 gap-1">
                {(voiceCommands[voiceSettings.language as keyof typeof voiceCommands] || voiceCommands.en)
                  .slice(0, 3).map((command, index) => (
                  <button
                    key={index}
                    onClick={() => onVoiceCommand(command)}
                    className="text-xs text-left px-2 py-1 rounded bg-white hover:bg-primary-50 transition-colors"
                  >
                    "{command}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div 
          ref={settingsRef}
          className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl border p-4 w-80 z-60"
        >
          <h4 className="font-medium text-gray-900 mb-4">Voice Settings</h4>
          
          <div className="space-y-4">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={voiceSettings.language}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Speech Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speech Rate: {voiceSettings.rate}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.rate}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Volume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volume: {Math.round(voiceSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Test Button */}
            <button
              onClick={() => speakText('यह एक परीक्षण है। This is a test.')}
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Test Voice
            </button>
          </div>
        </div>
      )}

      {/* Voice Commands Help */}
      {isListening && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg border p-4 w-72">
          <h4 className="font-medium text-gray-900 mb-2">🎤 Say a command:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {(voiceCommands[voiceSettings.language as keyof typeof voiceCommands] || voiceCommands.en)
              .map((command, index) => (
              <li key={index} className="flex items-center">
                <span className="text-primary-500 mr-2">•</span>
                "{command}"
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-green-600 font-medium">
            ✓ Listening in {getCurrentLanguage().native}
          </div>
        </div>
      )}

      {/* Last Command Display */}
      {lastCommand && !isListening && (
        <div className="absolute bottom-20 right-0 bg-green-50 border border-green-200 rounded-lg p-3 max-w-xs">
          <p className="text-sm text-green-800">
            <strong>Last command:</strong> {lastCommand}
          </p>
        </div>
      )}
    </div>
  );
};