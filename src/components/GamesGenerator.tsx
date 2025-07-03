import React, { useState } from 'react';
import { Gamepad2, Star, Trophy, Users, Play } from 'lucide-react';

export const GamesGenerator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [gameType, setGameType] = useState('quiz');
  const [difficulty, setDifficulty] = useState('easy');
  const [playerCount, setPlayerCount] = useState('individual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<any>(null);

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Geography', 
    'History', 'Environmental Studies', 'General Knowledge'
  ];

  const gameTypes = [
    { value: 'quiz', label: 'Quiz Game', icon: '❓', description: 'Multiple choice questions with scoring' },
    { value: 'memory', label: 'Memory Game', icon: '🧠', description: 'Match pairs and remember sequences' },
    { value: 'word', label: 'Word Game', icon: '📝', description: 'Word puzzles and vocabulary building' },
    { value: 'math', label: 'Math Challenge', icon: '🔢', description: 'Number games and calculations' },
    { value: 'sorting', label: 'Sorting Game', icon: '🔄', description: 'Categorize and organize items' },
    { value: 'puzzle', label: 'Puzzle Game', icon: '🧩', description: 'Logic puzzles and problem solving' },
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy (Grade 1-3)', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium (Grade 4-6)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hard', label: 'Hard (Grade 7+)', color: 'bg-red-100 text-red-800' },
  ];

  const playerOptions = [
    { value: 'individual', label: 'Individual Play' },
    { value: 'pair', label: 'Pair/Team (2 players)' },
    { value: 'group', label: 'Group (3-5 players)' },
    { value: 'class', label: 'Whole Class' },
  ];

  const handleGenerateGame = async () => {
    if (!subject || !topic) return;

    setIsGenerating(true);
    // Simulate game generation
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock generated game
    setGeneratedGame({
      title: `${gameType} Game: ${topic}`,
      subject,
      topic,
      type: gameType,
      difficulty,
      playerCount,
      instructions: `Play this interactive ${gameType} game to learn about ${topic}. Great for ${playerCount} play!`,
      questions: [
        {
          question: `What is an important concept related to ${topic}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0,
          explanation: 'This is the correct answer because...'
        },
        {
          question: `Which of these is related to ${topic}?`,
          options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
          correct: 1,
          explanation: 'This demonstrates the key principle of...'
        },
        {
          question: `How does ${topic} work in real life?`,
          options: ['Method A', 'Method B', 'Method C', 'Method D'],
          correct: 2,
          explanation: 'This is a practical application of...'
        }
      ],
      scoring: {
        correct: 10,
        incorrect: 0,
        bonus: 5
      },
      features: [
        'Interactive gameplay',
        'Instant feedback',
        'Cultural context',
        'Progress tracking',
        'Adaptive difficulty'
      ]
    });

    setIsGenerating(false);
  };

  const previewGame = () => {
    // Mock game preview
    alert('Game preview would open here in a real implementation!');
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Gamepad2 className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Educational Games Generator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create engaging, interactive games for different subjects and grade levels
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Setup Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 text-primary-500 mr-2" />
            Game Setup
          </h2>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Multiplication, Water Cycle, Planets"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {gameTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setGameType(type.value)}
                    className={`p-3 rounded-lg text-left transition-colors border ${
                      gameType === type.value
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs opacity-75 mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  {difficulties.map((level) => (
                    <label key={level.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level.value}
                        checked={difficulty === level.value}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${level.color}`}>
                        {level.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player Mode
                </label>
                <select
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {playerOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateGame}
              disabled={!subject || !topic || isGenerating}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating Game...
                </span>
              ) : (
                'Generate Game'
              )}
            </button>
          </div>
        </div>

        {/* Generated Game */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="h-5 w-5 text-primary-500 mr-2" />
            Generated Game
          </h2>

          {generatedGame ? (
            <div className="space-y-4">
              {/* Game Header */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{generatedGame.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{generatedGame.instructions}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {generatedGame.subject}
                  </span>
                  <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded">
                    {generatedGame.type}
                  </span>
                  <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded">
                    {generatedGame.difficulty}
                  </span>
                </div>
              </div>

              {/* Game Preview */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Sample Questions:</h4>
                <div className="space-y-3">
                  {generatedGame.questions.slice(0, 2).map((q: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-sm text-gray-900 mb-2">
                        Q{index + 1}: {q.question}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((option: string, optIndex: number) => (
                          <button
                            key={optIndex}
                            className={`p-2 text-xs rounded border text-left ${
                              optIndex === q.correct
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Features */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Game Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {generatedGame.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-sm text-blue-800">
                      <Star className="h-3 w-3 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scoring */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Scoring System:</h4>
                <div className="text-sm text-yellow-800 space-y-1">
                  <div>• Correct Answer: +{generatedGame.scoring.correct} points</div>
                  <div>• Incorrect Answer: {generatedGame.scoring.incorrect} points</div>
                  <div>• Speed Bonus: +{generatedGame.scoring.bonus} points</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={previewGame}
                  className="flex-1 bg-secondary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary-600 transition-colors flex items-center justify-center"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Preview Game
                </button>
                <button className="flex-1 bg-accent-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors">
                  Save Game
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated game will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Game Types Showcase */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Educational Games Work</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <Gamepad2 className="h-6 w-6 text-purple-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Engagement</h4>
            <p className="text-gray-600">Games keep students actively participating and motivated</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Retention</h4>
            <p className="text-gray-600">Interactive learning improves knowledge retention</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Users className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Collaboration</h4>
            <p className="text-gray-600">Multi-player games encourage teamwork and discussion</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Trophy className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Achievement</h4>
            <p className="text-gray-600">Scoring and progress tracking motivate continued learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};