import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ContentGenerator } from './components/ContentGenerator';
import { WorksheetCreator } from './components/WorksheetCreator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { VisualAids } from './components/VisualAids';
import { LessonPlanner } from './components/LessonPlanner';
import { AudioAssessment } from './components/AudioAssessment';
import { GamesGenerator } from './components/GamesGenerator';
import { VoiceInterface } from './components/VoiceInterface';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('hi-IN');

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
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
    } else if (lowerCommand.includes('switch to english') || lowerCommand.includes('english language')) {
      setCurrentLanguage('en-US');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content-generator" element={<ContentGenerator />} />
            <Route path="/worksheet-creator" element={<WorksheetCreator />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/visual-aids" element={<VisualAids />} />
            <Route path="/lesson-planner" element={<LessonPlanner />} />
            <Route path="/audio-assessment" element={<AudioAssessment />} />
            <Route path="/games-generator" element={<GamesGenerator />} />
          </Routes>
        </main>
        
        {/* Global Voice Interface */}
        <VoiceInterface 
          onVoiceCommand={handleVoiceCommand}
          language={currentLanguage}
          isActive={true}
        />
        
        {/* Voice Commands Help */}
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-white rounded-lg shadow-lg border p-4 max-w-xs">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">🎤 Voice Commands:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• "Create content about..."</li>
              <li>• "Make worksheet"</li>
              <li>• "Explain photosynthesis"</li>
              <li>• "Plan lesson for math"</li>
              <li>• "Go to dashboard"</li>
              <li>• "Switch to Hindi"</li>
            </ul>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;