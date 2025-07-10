import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { MultilingualProvider } from './components/Enhanced/MultilingualProvider';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import WorksheetCreator from './components/WorksheetCreator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { VisualAids } from './components/VisualAids';
import { LessonPlanner } from './components/LessonPlanner';
import { AudioAssessment } from './components/AudioAssessment';
import { GamesGenerator } from './components/GamesGenerator';
import { EnhancedVoiceInterface } from './components/Enhanced/EnhancedVoiceInterface';
import SpeechService from './services/speechService';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('hi-IN');
  const speechService = SpeechService.getInstance();

  const handleVoiceCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    try {
      // Global navigation commands
      if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('home')) {
        window.location.href = '/';
      } else if (lowerCommand.includes('content generator') || lowerCommand.includes('create content')) {
        window.location.href = '/content-generator';
      } else if (lowerCommand.includes('worksheet') || lowerCommand.includes('make worksheet')) {
        window.location.href = '/worksheet-creator';
      } else if (lowerCommand.includes('knowledge base') || lowerCommand.includes('explain')) {
        window.location.href = '/knowledge-base';
      } else if (lowerCommand.includes('visual aid') || lowerCommand.includes('drawing')) {
        window.location.href = '/visual-aids';
      } else if (lowerCommand.includes('lesson plan') || lowerCommand.includes('plan lesson')) {
        window.location.href = '/lesson-planner';
      } else if (lowerCommand.includes('audio assessment') || lowerCommand.includes('voice test')) {
        window.location.href = '/audio-assessment';
      } else if (lowerCommand.includes('game') || lowerCommand.includes('play')) {
        window.location.href = '/games-generator';
      }
      
      // Language switching commands
      if (lowerCommand.includes('switch to hindi') || lowerCommand.includes('hindi language')) {
        setCurrentLanguage('hi-IN');
        await speechService.speak('भाषा हिंदी में बदल दी गई', 'hi-IN');
      } else if (lowerCommand.includes('switch to english') || lowerCommand.includes('english language')) {
        setCurrentLanguage('en-US');
        await speechService.speak('Language switched to English', 'en-US');
      }

      // Provide feedback for successful command
      if (lowerCommand.includes('go to') || lowerCommand.includes('switch to')) {
        await speechService.speak('Command executed successfully', currentLanguage);
      }
    } catch (error) {
      console.error('Voice command error:', error);
    }
  };

  return (
    <AuthProvider>
      <MultilingualProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/content-generator" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <ContentGenerator />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/worksheet-creator" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <WorksheetCreator />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/knowledge-base" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <KnowledgeBase />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/visual-aids" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <VisualAids />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/lesson-planner" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <LessonPlanner />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/audio-assessment" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <AudioAssessment />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/games-generator" element={
              <ProtectedRoute>
                <AppLayout onVoiceCommand={handleVoiceCommand}>
                  <GamesGenerator />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </MultilingualProvider>
    </AuthProvider>
  );
}

// App Layout Component for Protected Routes
const AppLayout: React.FC<{ children: React.ReactNode; onVoiceCommand: (command: string) => void }> = ({ 
  children, 
  onVoiceCommand 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Enhanced Global Voice Interface */}
      <EnhancedVoiceInterface 
        onVoiceCommand={onVoiceCommand}
        isActive={true}
      />
      
      {/* Voice Commands Help */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="bg-white rounded-xl shadow-xl border-2 border-primary-200 p-4 max-w-xs backdrop-blur-sm bg-white/90">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
            🎤 Voice Commands
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </h4>
          <ul className="text-xs text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Create content about..."
            </li>
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Make worksheet"
            </li>
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Explain photosynthesis"
            </li>
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Plan lesson for math"
            </li>
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Go to dashboard"
            </li>
            <li className="flex items-center">
              <span className="text-primary-500 mr-2">•</span>
              "Switch to Hindi"
            </li>
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-600 font-medium flex items-center">
                ✓ Google AI Powered
              </span>
              <span className="text-blue-600 font-medium">
                8+ Languages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Google AI Status */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            <div>
              <span className="text-sm font-semibold text-green-800">Google AI Active</span>
              <div className="text-xs text-green-600">Multilingual • Voice Enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;