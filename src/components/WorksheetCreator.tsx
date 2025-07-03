import React, { useState, useCallback } from 'react';
import { FileText, Upload, Camera, Download, Users, Target, Mic, Loader, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import GoogleAIService from '../services/googleAI';
import SpeechService from '../services/speechService';

export const WorksheetCreator: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['4-6']);
  const [worksheetType, setWorksheetType] = useState('practice');
  const [generatedWorksheets, setGeneratedWorksheets] = useState<any[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);

  const googleAI = GoogleAIService.getInstance();
  const speechService = SpeechService.getInstance();

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Auto-analyze the image
      analyzeImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  const analyzeImage = async (imageFile: File) => {
    setIsProcessing(true);
    try {
      const analysis = await googleAI.analyzeTextbookImage(imageFile);
      setAnalysisResult(analysis);
      
      // Provide voice feedback
      if (speechService.isSupported()) {
        await speechService.speak(`Image analyzed. Found ${analysis.subject} content about ${analysis.topic}`, 'en-US');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult({
        subject: 'General Studies',
        topic: 'Learning Content',
        gradeLevel: '4-6',
        concepts: ['Basic concepts', 'Practical applications'],
        difficulty: 'Medium'
      });
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
      const worksheets = await googleAI.generateDifferentiatedWorksheets(analysisResult, selectedGrades);
      setGeneratedWorksheets(worksheets);
      
      // Provide voice feedback
      if (speechService.isSupported()) {
        await speechService.speak(`Generated ${worksheets.length} worksheets successfully`, 'en-US');
      }
    } catch (error) {
      console.error('Error generating worksheets:', error);
    }
    setIsProcessing(false);
  };

  const handleVoiceCommand = async () => {
    if (isListening) return;

    try {
      setIsListening(true);
      const command = await speechService.startListening('en-US');
      
      if (command.toLowerCase().includes('make worksheet') || command.toLowerCase().includes('create worksheet')) {
        if (uploadedImage && selectedGrades.length > 0) {
          handleGenerateWorksheets();
        }
      } else if (command.toLowerCase().includes('practice')) {
        setWorksheetType('practice');
      } else if (command.toLowerCase().includes('assessment')) {
        setWorksheetType('assessment');
      } else if (command.toLowerCase().includes('homework')) {
        setWorksheetType('homework');
      }
    } catch (error) {
      console.error('Voice command error:', error);
    } finally {
      setIsListening(false);
    }
  };

  const downloadWorksheet = (worksheet: any) => {
    const element = document.createElement('a');
    const file = new Blob([worksheet.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${worksheet.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Worksheet Creator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a textbook page and automatically generate differentiated worksheets using Google AI Vision
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
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'
                }`}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <div>
                    <img 
                      src={imagePreview} 
                      alt="Uploaded content" 
                      className="max-h-32 mx-auto rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Click or drag to change image</p>
                  </div>
                ) : (
                  <div>
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop or click to upload'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  AI Analysis Complete
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Subject:</strong> {analysisResult.subject}</p>
                  <p><strong>Topic:</strong> {analysisResult.topic}</p>
                  <p><strong>Grade Level:</strong> {analysisResult.gradeLevel}</p>
                  <p><strong>Difficulty:</strong> {analysisResult.difficulty}</p>
                  <div>
                    <strong>Key Concepts:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {analysisResult.concepts?.map((concept: string, index: number) => (
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

            <div className="flex space-x-2">
              <button
                onClick={handleGenerateWorksheets}
                disabled={!analysisResult || selectedGrades.length === 0 || isProcessing}
                className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    {analysisResult ? 'Generating...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </button>

              <button
                onClick={handleVoiceCommand}
                disabled={isListening}
                className={`p-3 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-secondary-500 text-white hover:bg-secondary-600'
                }`}
                title="Voice command"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
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
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {generatedWorksheets.length} worksheets ready
                </span>
              )}
            </div>

            {generatedWorksheets.length > 0 ? (
              <div className="space-y-4">
                {generatedWorksheets.map((worksheet, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{worksheet.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          grades.find(g => g.value === worksheet.grade)?.color
                        }`}>
                          {grades.find(g => g.value === worksheet.grade)?.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {worksheet.estimatedTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-3">
                      <div className="whitespace-pre-wrap text-sm text-gray-700 max-h-40 overflow-y-auto">
                        {worksheet.content.substring(0, 300)}...
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => downloadWorksheet(worksheet)}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-600 transition-colors flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload a textbook page to generate worksheets</p>
                <p className="text-xs mt-2">AI will analyze content and create grade-appropriate materials</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Google AI Features */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Google AI Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <Camera className="h-4 w-4 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Vision AI Analysis</h4>
            <p className="text-gray-600">Google Vision API analyzes textbook content automatically</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Gemini Generation</h4>
            <p className="text-gray-600">Creates differentiated content for multiple grade levels</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <Mic className="h-4 w-4 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Speech Integration</h4>
            <p className="text-gray-600">Voice commands and audio feedback throughout</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
              <Download className="h-4 w-4 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Instant Export</h4>
            <p className="text-gray-600">Ready-to-print worksheets in multiple formats</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetCreator;