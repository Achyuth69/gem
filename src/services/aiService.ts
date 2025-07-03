import { GeminiService } from './geminiService';

// Enhanced AI service with better error handling and features
export class AIService {
  private static instance: AIService;
  private geminiService: GeminiService;
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  constructor() {
    this.geminiService = GeminiService.getInstance();
  }

  async generateContent(prompt: string, language: string, contentType: string, gradeLevel: string): Promise<string> {
    try {
      return await this.geminiService.generateContent(prompt, language, contentType, gradeLevel);
    } catch (error) {
      console.error('Error generating content:', error);
      return this.getFallbackContent(prompt, language, contentType, gradeLevel);
    }
  }

  async analyzeImage(imageData: string): Promise<any> {
    try {
      return await this.geminiService.analyzeImage(imageData);
    } catch (error) {
      console.error('Error analyzing image:', error);
      return this.getFallbackImageAnalysis();
    }
  }

  async generateWorksheet(analysis: any, gradeLevel: string): Promise<any> {
    try {
      return await this.geminiService.generateWorksheet(analysis, gradeLevel);
    } catch (error) {
      console.error('Error generating worksheet:', error);
      return this.getFallbackWorksheet(gradeLevel);
    }
  }

  async generateVisualAid(description: string, type: string, complexity: string = 'simple'): Promise<any> {
    try {
      return await this.geminiService.generateVisualAid(description, type, complexity);
    } catch (error) {
      console.error('Error generating visual aid:', error);
      return this.getFallbackVisualAid(description);
    }
  }

  async generateLessonPlan(subject: string, topic: string, duration: number, grades: string[]): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      title: `${subject}: ${topic}`,
      duration,
      grades,
      objectives: [
        `Students will understand the fundamental concepts of ${topic}`,
        `Students will be able to apply ${topic} knowledge in practical situations`,
        `Students will demonstrate learning through hands-on activities`,
        `Students will connect ${topic} to their daily experiences`
      ],
      activities: [
        {
          phase: 'Opening Circle',
          duration: Math.floor(duration * 0.15),
          activity: `Introduction to ${topic} through storytelling`,
          materials: ['Blackboard', 'Chalk', 'Story props', 'Visual aids'],
          instructions: `Begin with a local story or example that introduces ${topic}. Ask students what they already know about the topic. Use their experiences to build connections.`,
          differentiation: 'Younger students listen, older students can share experiences'
        },
        {
          phase: 'Exploration',
          duration: Math.floor(duration * 0.35),
          activity: `Hands-on exploration of ${topic}`,
          materials: ['Textbooks', 'Local materials', 'Worksheets', 'Demonstration items'],
          instructions: `Guide students through interactive exploration. Use local examples and materials. Encourage questions and observations. Demonstrate key concepts clearly.`,
          differentiation: 'Different complexity levels for different grades'
        },
        {
          phase: 'Practice & Application',
          duration: Math.floor(duration * 0.35),
          activity: 'Collaborative practice and problem-solving',
          materials: ['Practice sheets', 'Group materials', 'Art supplies'],
          instructions: 'Students work in mixed-grade groups. Older students help younger ones. Provide varied tasks based on ability levels. Circulate and provide support.',
          differentiation: 'Peer tutoring, varied task complexity'
        },
        {
          phase: 'Reflection & Closure',
          duration: Math.floor(duration * 0.15),
          activity: 'Summary and assessment',
          materials: ['Assessment sheets', 'Reflection journals'],
          instructions: 'Review key learning points. Students share one thing they learned. Quick assessment to check understanding. Preview next lesson.',
          differentiation: 'Verbal or written reflection based on grade level'
        }
      ],
      assessment: {
        formative: 'Observation during activities, questioning, peer discussions, thumbs up/down checks',
        summative: 'End-of-lesson quiz, practical demonstration, worksheet completion, oral presentation',
        differentiation: 'Multiple assessment methods: visual, verbal, written, practical demonstrations'
      },
      homework: `Grade-appropriate practice exercises related to ${topic}. Younger students: drawing/coloring activities. Older students: research and problem-solving tasks.`,
      extensions: [
        `Research project about ${topic} in the local community`,
        `Create a presentation or poster about ${topic}`,
        `Interview family members about their experience with ${topic}`,
        `Design a simple experiment or demonstration`
      ],
      culturalConnections: [
        `Local examples and applications of ${topic}`,
        `Traditional knowledge related to ${topic}`,
        `Community resources and experts`,
        `Regional variations and practices`
      ]
    };
  }

  async generateGame(subject: string, topic: string, gameType: string, difficulty: string, playerCount: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const gameTemplates = {
      quiz: {
        title: `${topic} Knowledge Challenge`,
        type: 'Interactive Quiz Game',
        description: `Test your knowledge about ${topic} with this fun quiz game!`,
        questions: [
          {
            question: `What is the most important thing to know about ${topic}?`,
            options: ['Option A: Basic concept', 'Option B: Advanced theory', 'Option C: Practical application', 'Option D: Historical background'],
            correct: 0,
            explanation: `The basic concept is fundamental to understanding ${topic}. It forms the foundation for all other learning.`,
            difficulty: difficulty,
            points: 10
          },
          {
            question: `How is ${topic} used in everyday life?`,
            options: ['Option A: Rarely used', 'Option B: Only in schools', 'Option C: In many daily activities', 'Option D: Only by experts'],
            correct: 2,
            explanation: `${topic} is actually used in many daily activities, making it very relevant to our lives.`,
            difficulty: difficulty,
            points: 15
          },
          {
            question: `Which example best demonstrates ${topic}?`,
            options: ['Option A: Textbook example', 'Option B: Local community example', 'Option C: Internet example', 'Option D: Teacher example'],
            correct: 1,
            explanation: `Local community examples help students relate better to the concept and understand its practical applications.`,
            difficulty: difficulty,
            points: 20
          }
        ],
        scoring: {
          correct: 10,
          incorrect: 0,
          timeBonus: 5,
          streakBonus: 10
        },
        instructions: `Answer questions about ${topic}. You get points for correct answers and bonus points for quick responses and answer streaks!`,
        gameFeatures: [
          'Progressive difficulty',
          'Local context examples',
          'Immediate feedback',
          'Score tracking',
          'Cultural relevance'
        ]
      },
      memory: {
        title: `${topic} Memory Master`,
        type: 'Memory Matching Game',
        description: `Match concepts and definitions related to ${topic}!`,
        pairs: [
          { term: `Key Concept 1 of ${topic}`, definition: 'Definition explaining the first important concept' },
          { term: `Key Concept 2 of ${topic}`, definition: 'Definition explaining the second important concept' },
          { term: `Application of ${topic}`, definition: 'How this concept is used in real life' },
          { term: `Example of ${topic}`, definition: 'A practical example from daily life' },
          { term: `Benefit of ${topic}`, definition: 'Why this concept is important to learn' }
        ],
        instructions: `Flip cards to find matching pairs of terms and definitions. Remember the locations to improve your score!`,
        scoring: {
          match: 20,
          mismatch: -5,
          timeBonus: 10
        }
      },
      word: {
        title: `${topic} Word Challenge`,
        type: 'Word Building Game',
        description: `Create words related to ${topic} and learn new vocabulary!`,
        words: [
          { word: topic.toLowerCase(), hint: `The main subject we're learning about` },
          { word: 'learn', hint: 'What we do when we study' },
          { word: 'practice', hint: 'How we get better at something' },
          { word: 'example', hint: 'A sample that shows how something works' },
          { word: 'understand', hint: 'When concepts become clear to us' }
        ],
        instructions: `Use the given letters to form words related to ${topic}. Each word you create earns points!`,
        scoring: {
          shortWord: 5,
          mediumWord: 10,
          longWord: 20,
          bonusWord: 30
        }
      }
    };

    const selectedGame = gameTemplates[gameType as keyof typeof gameTemplates] || gameTemplates.quiz;
    
    return {
      ...selectedGame,
      subject,
      topic,
      difficulty,
      playerCount,
      estimatedTime: playerCount === 'individual' ? '10-15 minutes' : '15-25 minutes',
      ageGroup: difficulty === 'easy' ? '6-9 years' : difficulty === 'medium' ? '10-13 years' : '14+ years',
      learningObjectives: [
        `Reinforce understanding of ${topic}`,
        'Improve retention through gamification',
        'Encourage collaborative learning',
        'Build confidence through achievement'
      ]
    };
  }

  async assessAudio(audioBlob: Blob, language: string, text: string, assessmentType: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Comprehensive audio assessment simulation
    const baseScore = Math.floor(Math.random() * 20) + 75; // 75-95
    const accuracy = Math.floor(Math.random() * 15) + 80;   // 80-95
    const fluency = Math.floor(Math.random() * 20) + 75;    // 75-95
    const pronunciation = Math.floor(Math.random() * 15) + 80; // 80-95
    
    return {
      overallScore: baseScore,
      detailedScores: {
        accuracy,
        fluency,
        pronunciation,
        clarity: Math.floor(Math.random() * 10) + 85,
        pace: Math.floor(Math.random() * 15) + 80,
        intonation: Math.floor(Math.random() * 10) + 85
      },
      feedback: {
        strengths: [
          'Clear pronunciation of most words',
          'Good reading pace',
          'Proper voice modulation',
          'Confident delivery'
        ],
        improvements: [
          'Work on specific consonant sounds',
          'Practice vowel clarity',
          'Improve word stress patterns',
          'Focus on sentence rhythm'
        ],
        suggestions: [
          'Practice reading aloud daily for 10 minutes',
          'Record yourself and listen back',
          'Focus on difficult words separately',
          'Read with expression and emotion',
          'Practice with tongue twisters for clarity'
        ]
      },
      wordLevelAnalysis: [
        { word: 'example', score: 90, issue: 'none' },
        { word: 'pronunciation', score: 75, issue: 'stress pattern' },
        { word: 'difficult', score: 85, issue: 'consonant cluster' }
      ],
      recommendations: [
        `Continue practicing ${assessmentType} exercises`,
        'Focus on identified weak areas',
        'Use voice recording apps for self-assessment',
        'Practice with peers for feedback'
      ],
      nextSteps: [
        'Practice identified difficult words',
        'Work on fluency through repeated reading',
        'Record and compare with model pronunciation',
        'Take assessment again in one week'
      ]
    };
  }

  // Fallback methods for offline functionality
  private getFallbackContent(prompt: string, language: string, contentType: string, gradeLevel: string): string {
    return `# ${prompt} - ${contentType}

This is a ${contentType} about ${prompt} for grade ${gradeLevel} students.

## Key Points:
- Important concept related to ${prompt}
- Practical applications in daily life
- Local examples and connections
- Simple explanations for better understanding

## Activity:
Try to find examples of ${prompt} in your surroundings and discuss with your classmates.

*Note: This is a simplified version. For full AI-generated content, please check your internet connection.*`;
  }

  private getFallbackImageAnalysis(): any {
    return {
      subject: 'General Studies',
      topic: 'Learning Concepts',
      concepts: ['Basic understanding', 'Practical application', 'Real-world connections'],
      difficulty: 'Grade 4-6',
      keyPoints: ['Visual learning', 'Hands-on practice', 'Collaborative work']
    };
  }

  private getFallbackWorksheet(gradeLevel: string): any {
    return {
      questions: [
        'What did you learn from the lesson?',
        'Give an example from your daily life',
        'Draw a picture to show your understanding'
      ],
      instructions: 'Answer the questions based on what you learned in class today.',
      activities: ['Writing', 'Drawing', 'Thinking']
    };
  }

  private getFallbackVisualAid(description: string): any {
    return {
      imageUrl: 'https://images.pexels.com/photos/8926591/pexels-photo-8926591.jpeg?auto=compress&cs=tinysrgb&w=800',
      drawingInstructions: [
        `Draw the main parts of ${description}`,
        'Add labels to each part',
        'Use colors to make it clear',
        'Show connections between parts'
      ],
      teachingTips: [
        'Draw step by step',
        'Explain as you draw',
        'Ask students to participate',
        'Use simple shapes'
      ]
    };
  }
}