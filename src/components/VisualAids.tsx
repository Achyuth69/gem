import React, { useState } from 'react';
import { Image, Palette, Download, Share2 } from 'lucide-react';

export const VisualAids: React.FC = () => {
  const [description, setDescription] = useState('');
  const [aidType, setAidType] = useState('diagram');
  const [complexity, setComplexity] = useState('simple');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAid, setGeneratedAid] = useState<string | null>(null);

  const aidTypes = [
    { value: 'diagram', label: 'Diagram/Chart', icon: '📊' },
    { value: 'illustration', label: 'Simple Illustration', icon: '🎨' },
    { value: 'flowchart', label: 'Process Flow', icon: '🔄' },
    { value: 'map', label: 'Map/Layout', icon: '🗺️' },
    { value: 'timeline', label: 'Timeline', icon: '📅' },
    { value: 'comparison', label: 'Comparison Chart', icon: '⚖️' },
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple Lines (Easy to draw on blackboard)' },
    { value: 'moderate', label: 'Moderate Detail (Some shading/labels)' },
    { value: 'detailed', label: 'Detailed (For handouts/printouts)' },
  ];

  const examples = [
    { text: 'Water cycle showing evaporation, condensation, and precipitation', type: 'diagram' },
    { text: 'Solar system with planets in order', type: 'diagram' },
    { text: 'Human digestive system with major organs', type: 'illustration' },
    { text: 'Steps to solve a math problem', type: 'flowchart' },
    { text: 'Map of India showing major rivers', type: 'map' },
    { text: 'Timeline of Indian independence movement', type: 'timeline' },
    { text: 'Compare renewable vs non-renewable energy', type: 'comparison' },
  ];

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    // Simulate API call to generate visual aid
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock generated visual aid (in real implementation, this would be an actual generated image)
    setGeneratedAid('https://images.pexels.com/photos/8926591/pexels-photo-8926591.jpeg?auto=compress&cs=tinysrgb&w=600');
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Image className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Visual Aids Designer</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate simple line drawings and charts that you can easily recreate on your blackboard
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="h-5 w-5 text-primary-500 mr-2" />
              Design Your Visual Aid
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what you want to draw
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Water cycle showing evaporation, condensation, and precipitation"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Visual Aid
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {aidTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setAidType(type.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors border ${
                        aidType === type.value
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
                  Complexity Level
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {complexityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating Visual Aid...
                  </span>
                ) : (
                  'Generate Visual Aid'
                )}
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Example Prompts</h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDescription(example.text);
                    setAidType(example.type);
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="text-sm text-gray-900">{example.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Type: {aidTypes.find(t => t.value === example.type)?.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Visual Aid</h2>
            {generatedAid && (
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {generatedAid ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <img
                  src={generatedAid}
                  alt="Generated visual aid"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Blackboard Drawing Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Start with the main outline using bold strokes</li>
                  <li>• Add labels clearly with larger text</li>
                  <li>• Use different colors for different components</li>
                  <li>• Keep proportions simple for easy reproduction</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Teaching Notes:</h4>
                <p className="text-sm text-green-800">
                  This visual aid is designed to be easily reproduced on a blackboard. 
                  The simplified lines and clear labels make it perfect for step-by-step 
                  drawing while explaining the concept to students.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated visual aid will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Aid Features</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Blackboard Friendly</h4>
            <p className="text-gray-600">Designed for easy reproduction with chalk or markers</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Clear Labels</h4>
            <p className="text-gray-600">Important parts are clearly labeled and easy to read</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Step-by-Step</h4>
            <p className="text-gray-600">Includes drawing instructions and teaching tips</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Curriculum Aligned</h4>
            <p className="text-gray-600">Matches common textbook concepts and standards</p>
          </div>
        </div>
      </div>
    </div>
  );
};