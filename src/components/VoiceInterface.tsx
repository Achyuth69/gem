import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

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
  const {
    isListening,
    transcript,
    isSupported: speechRecognitionSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  const {
    speak,
    cancel,
    speaking,
    supported: speechSynthesisSupported
  } = useSpeechSynthesis();

  const [lastCommand, setLastCommand] = useState('');

  useEffect(() => {
    if (transcript && transcript !== lastCommand) {
      setLastCommand(transcript);
      onVoiceCommand(transcript);
      resetTranscript();
    }
  }, [transcript, lastCommand, onVoiceCommand, resetTranscript]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(language);
    }
  };

  const handleToggleSpeaking = () => {
    if (speaking) {
      cancel();
    }
  };

  if (!isActive || !speechRecognitionSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-full shadow-lg border-2 border-primary-500 p-2 flex items-center space-x-2">
        {/* Voice Recognition Button */}
        <button
          onClick={handleToggleListening}
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
        {speechSynthesisSupported && (
          <button
            onClick={handleToggleSpeaking}
            className={`p-3 rounded-full transition-all duration-300 ${
              speaking
                ? 'bg-blue-500 text-white animate-pulse'
                : 'bg-secondary-500 text-white hover:bg-secondary-600'
            }`}
            title={speaking ? 'Stop speaking' : 'Text-to-speech available'}
          >
            {speaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        )}

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
          </ul>
        </div>
      )}
    </div>
  );
};