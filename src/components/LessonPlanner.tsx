import React, { useState } from 'react';
import { Calendar, Clock, Target, Users, BookOpen, CheckCircle } from 'lucide-react';

export const LessonPlanner: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('45');
  const [grades, setGrades] = useState<string[]>(['4-6']);
  const [learningObjectives, setLearningObjectives] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 
    'Environmental Studies', 'Arts', 'Physical Education'
  ];

  const gradeOptions = [
    { value: '1-3', label: 'Grade 1-3' },
    { value: '4-6', label: 'Grade 4-6' },
    { value: '7-9', label: 'Grade 7-9' },
    { value: '10-12', label: 'Grade 10-12' },
  ];

  const handleGradeToggle = (grade: string) => {
    setGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const handleGeneratePlan = async () => {
    if (!subject || !topic) return;

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock lesson plan
    setGeneratedPlan({
      title: `${subject}: ${topic}`,
      duration: parseInt(duration),
      grades: grades,
      objectives: learningObjectives || 'Students will understand and apply key concepts related to the topic.',
      activities: [
        {
          phase: 'Introduction',
          duration: 10,
          activity: 'Warm-up activity and topic introduction',
          materials: ['Blackboard', 'Chalk', 'Visual aids'],
          instructions: 'Begin with a question or story related to the topic to engage students'
        },
        {
          phase: 'Main Activity',
          duration: 25,
          activity: 'Interactive lesson with demonstrations',
          materials: ['Textbook', 'Worksheets', 'Props'],
          instructions: 'Explain key concepts using local examples and hands-on activities'
        },
        {
          phase: 'Practice',
          duration: 15,
          activity: 'Guided practice and group work',
          materials: ['Practice sheets', 'Group materials'],
          instructions: 'Students work in mixed-grade groups to reinforce learning'
        },
        {
          phase: 'Wrap-up',
          duration: 5,
          activity: 'Summary and assessment',
          materials: ['Assessment forms'],
          instructions: 'Quick review and exit ticket to check understanding'
        }
      ],
      assessment: {
        formative: 'Observation during activities, questioning',
        summative: 'End-of-lesson quiz or practical demonstration',
        differentiation: 'Varied complexity levels for different grades'
      },
      homework: 'Practice exercises adapted for each grade level',
      extensions: 'Additional activities for advanced learners'
    });

    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-primary-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">AI Lesson Planner</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create comprehensive lesson plans for multi-grade classrooms with structured activities and assessments
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="h-5 w-5 text-primary-500 mr-2" />
            Lesson Details
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
                  Duration (minutes)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic/Chapter
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, Fractions, Water Cycle"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Levels Present
              </label>
              <div className="grid grid-cols-2 gap-2">
                {gradeOptions.map((grade) => (
                  <label key={grade.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={grades.includes(grade.value)}
                      onChange={() => handleGradeToggle(grade.value)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm">{grade.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Objectives (Optional)
              </label>
              <textarea
                value={learningObjectives}
                onChange={(e) => setLearningObjectives(e.target.value)}
                placeholder="What should students learn by the end of this lesson?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={!subject || !topic || isGenerating}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating Lesson Plan...
                </span>
              ) : (
                'Generate Lesson Plan'
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-primary-500 mr-2" />
            Generated Lesson Plan
          </h2>

          {generatedPlan ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{generatedPlan.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {generatedPlan.duration} minutes
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Grades: {generatedPlan.grades.join(', ')}
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {generatedPlan.objectives}
                </p>
              </div>

              {/* Activities */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Lesson Activities:</h4>
                <div className="space-y-3">
                  {generatedPlan.activities.map((activity: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{activity.phase}</h5>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.duration} min
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{activity.activity}</p>
                      <p className="text-xs text-gray-600 mb-2">{activity.instructions}</p>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.map((material: string, idx: number) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Assessment:</h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Formative: </span>
                    <span className="text-sm text-gray-600">{generatedPlan.assessment.formative}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Summative: </span>
                    <span className="text-sm text-gray-600">{generatedPlan.assessment.summative}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Differentiation: </span>
                    <span className="text-sm text-gray-600">{generatedPlan.assessment.differentiation}</span>
                  </div>
                </div>
              </div>

              {/* Homework & Extensions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Homework:</h4>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                    {generatedPlan.homework}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Extensions:</h4>
                  <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                    {generatedPlan.extensions}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated lesson plan will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Grade Teaching Tips</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Flexible Grouping</h4>
            <p className="text-gray-600">Mix students of different grades for peer learning</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <CheckCircle className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Differentiated Tasks</h4>
            <p className="text-gray-600">Same concept, different complexity levels</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <CheckCircle className="h-6 w-6 text-purple-500 mb-2" />
            <h4 className="font-medium text-gray-900 mb-2">Rotation Activities</h4>
            <p className="text-gray-600">Keep all students engaged with station-based learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};