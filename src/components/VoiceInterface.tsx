import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import SpeechService from '../services/speechService';

interface VoiceInterfaceProps {
  onVoiceCommand: (command: string) => void;
  language?: string;
  isActive?: boolean;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  onVoiceCommand,
  language = 'hi-IN',
  isActive = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const speechService = SpeechService.getInstance();

  useEffect(() => {
    setIsSupported(speechService.isSupported());
  }, []);

  const handleStartListening = async () => {
    if (isListening) return;

    try {
      setIsListening(true);
      const command = await speechService.startListening(language);
      setLastCommand(command);
      onVoiceCommand(command);
      
      // Provide audio feedback
      await speechService.speak('Command received', language);
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
      await speechService.speak(text, language);
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
      <div className="bg-white rounded-full shadow-lg border-2 border-primary-500 p-2 flex items-center space-x-2">
        {/* Voice Recognition Button */}
        <button
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`p-3 rounded-full transition-all duration-300 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice command'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Speech Synthesis Button */}
        <button
          onClick={handleToggleSpeaking}
          className={`p-3 rounded-full transition-all duration-300 ${
            isSpeaking
              ? 'bg-blue-500 text-white animate-pulse'
              : 'bg-secondary-500 text-white hover:bg-secondary-600'
          }`}
          title={isSpeaking ? 'Stop speaking' : 'Text-to-speech available'}
        >
          {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* Status Indicator */}
        {isListening && (
          <div className="flex items-center space-x-2 px-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-sm text-gray-600">Listening...</span>
          </div>
        )}
      </div>

      {/* Voice Commands Help */}
      {isListening && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border p-4 w-64">
          <h4 className="font-medium text-gray-900 mb-2">Voice Commands:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Create story about..." - Generate content</li>
            <li>• "Explain..." - Get explanations</li>
            <li>• "Make worksheet" - Create worksheets</li>
            <li>• "Plan lesson" - Generate lesson plans</li>
            <li>• "Show visual aid" - Create visual aids</li>
            <li>• "Generate game" - Create educational games</li>
          </ul>
        </div>
      )}

      {/* Last Command Display */}
      {lastCommand && (
        <div className="absolute bottom-16 right-0 bg-green-50 border border-green-200 rounded-lg p-3 max-w-xs">
          <p className="text-sm text-green-800">
            <strong>Last command:</strong> {lastCommand}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;