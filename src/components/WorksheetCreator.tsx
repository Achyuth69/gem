import React, { useState } from 'react';
import { FileText, Upload, Camera, Download, Users, Target, Mic } from 'lucide-react';
import { AIService } from '../services/aiService';

export const WorksheetCreator: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['1-3']);
  const [worksheetType, setWorksheetType] = useState('practice');
  const [generatedWorksheets, setGeneratedWorksheets] = useState<any[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const grades = [
    { value: '1-3', label: 'Grade 1-3 (Primary)', color: 'bg-green-100 text-green-800' },
    { value: '4-6', label: 'Grade 4-6 (Upper Primary)', color: 'bg-blue-100 text-blue-800' },
    { value: '7-9', label: 'Grade 7-9 (Secondary)', color: 'bg-purple-100 text-purple-800' },
    { value: '10-12', label: 'Grade 10-12 (Higher Secondary)', color: 'bg-orange-100 text-orange-800' },
  ];

  const worksheetTypes = [
    { value: 'practice', label: 'Practice Exercises' },
    { value: 'assessment', label: 'Assessment Questions' },
    { value: 'activity', label: 'Activity Sheets' },
    { value: 'homework', label: 'Homework Assignments' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Auto-analyze the image
        analyzeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const aiService = AIService.getInstance();
      const analysis = await aiService.analyzeImage(imageData);
      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
    setIsProcessing(false);
  };

  const handleGradeToggle = (grade: string) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const handleGenerateWorksheets = async () => {
    if (!analysisResult || selectedGrades.length === 0) return;

    setIsProcessing(true);
    try {
      const aiService = AIService.getInstance();
      const worksheets = [];
      
      for (const grade of selectedGrades) {
        const worksheet = await aiService.generateWorksheet(analysisResult, grade);
        worksheets.push({
          grade,
          title: `${worksheetType} Sheet for ${grade}`,
          ...worksheet
        });
      }
      
      setGeneratedWorksheets(worksheets);
    } catch (error) {
      console.error('Error generating worksheets:', error);
    }
    setIsProcessing(false);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('make worksheet') || lowerCommand.includes('create worksheet')) {
      if (uploadedImage && selectedGrades.length > 0) {
        handleGenerateWorksheets();
      }
    } else if (lowerCommand.includes('practice')) {
      setWorksheetType('practice');
    } else if (lowerCommand.includes('assessment')) {
      setWorksheetType('assessment');
    } else if (lowerCommand.includes('homework')) {
      setWorksheetType('homework');
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Worksheet Creator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a textbook page and automatically generate differentiated worksheets for multiple grade levels
        </p>
        <div className="mt-4 bg-green-50 rounded-lg p-3">
          <p className="text-sm text-green-800">
            🎤 Voice command: "Make worksheet" after uploading an image
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="h-5 w-5 text-primary-500 mr-2" />
            Upload Content
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Textbook Page
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <div>
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded content" 
                        className="max-h-32 mx-auto rounded-lg mb-2"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload image</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Image Analysis:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Subject:</strong> {analysisResult.subject}</p>
                  <p><strong>Topic:</strong> {analysisResult.topic}</p>
                  <p><strong>Difficulty:</strong> {analysisResult.difficulty}</p>
                  <div>
                    <strong>Key Concepts:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {analysisResult.concepts.map((concept: string, index: number) => (
                        <li key={index}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Worksheet Type
              </label>
              <select
                value={worksheetType}
                onChange={(e) => setWorksheetType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {worksheetTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Grade Levels
              </label>
              <div className="space-y-2">
                {grades.map((grade) => (
                  <label key={grade.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedGrades.includes(grade.value)}
                      onChange={() => handleGradeToggle(grade.value)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${grade.color}`}>
                      {grade.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateWorksheets}
              disabled={!analysisResult || selectedGrades.length === 0 || isProcessing}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {analysisResult ? 'Generating Worksheets...' : 'Analyzing Image...'}
                </span>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Generate Worksheets
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Worksheets */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Target className="h-5 w-5 text-primary-500 mr-2" />
                Generated Worksheets
              </h2>
              {generatedWorksheets.length > 0 && (
                <button className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </button>
              )}
            </div>

            {generatedWorksheets.length > 0 ? (
              <div className="space-y-4">
                {generatedWorksheets.map((worksheet, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{worksheet.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        grades.find(g => g.value === worksheet.grade)?.color
                      }`}>
                        {grades.find(g => g.value === worksheet.grade)?.label}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Instructions:</h4>
                      <p className="text-sm text-gray-600">{worksheet.instructions}</p>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Sample Questions:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {worksheet.questions.map((question: string, qIndex: number) => (
                          <li key={qIndex} className="flex">
                            <span className="mr-2">{qIndex + 1}.</span>
                            <span>{question}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
                        Download PDF
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload a textbook page to automatically generate worksheets</p>
                <p className="text-xs mt-2">AI will analyze the content and create grade-appropriate questions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-Features */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automatic Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <Camera className="h-4 w-4 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Smart Image Analysis</h4>
            <p className="text-gray-600">Automatically detects subject, topic, and difficulty level</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Multi-Level Generation</h4>
            <p className="text-gray-600">Creates appropriate questions for each selected grade</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <Mic className="h-4 w-4 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Voice Commands</h4>
            <p className="text-gray-600">Control the entire process with voice commands</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
              <Download className="h-4 w-4 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Instant Download</h4>
            <p className="text-gray-600">Ready-to-print worksheets in multiple formats</p>
          </div>
        </div>
      </div>
    </div>
  );
};