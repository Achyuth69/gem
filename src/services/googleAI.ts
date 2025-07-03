import { GoogleGenerativeAI } from '@google/generative-ai';

class GoogleAIService {
  private static instance: GoogleAIService;
  private genAI: GoogleGenerativeAI;
  private model: any;
  private visionModel: any;

  private constructor() {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY || 'AIzaSyDp0H3dlWiOjUYZv4ydT3G7uHeUXy7HZn4';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.visionModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  public static getInstance(): GoogleAIService {
    if (!GoogleAIService.instance) {
      GoogleAIService.instance = new GoogleAIService();
    }
    return GoogleAIService.instance;
  }

  async generateHyperLocalContent(prompt: string, language: string, contentType: string, gradeLevel: string): Promise<string> {
    const enhancedPrompt = `
    Create ${contentType} content in ${language} language for grade ${gradeLevel} students in India.
    Topic: ${prompt}
    
    Requirements:
    - Use simple, age-appropriate language for grade ${gradeLevel}
    - Include Indian cultural context and local examples (villages, markets, festivals, local foods)
    - Make it relatable to rural/semi-urban Indian students
    - Include practical applications from daily Indian life
    - Use familiar Indian names, places, and situations
    - Keep it engaging and educational
    - If in Hindi/regional language, use appropriate script and cultural references
    
    Format: Provide a well-structured response with clear headings and examples.
    Length: Appropriate for ${gradeLevel} attention span.
    `;

    try {
      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Google AI Error:', error);
      throw new Error('Failed to generate content. Please check your internet connection.');
    }
  }

  async analyzeTextbookImage(imageFile: File): Promise<any> {
    try {
      const imageData = await this.fileToGenerativePart(imageFile);
      
      const prompt = `
      Analyze this textbook page image and extract:
      1. Subject (Mathematics, Science, English, Hindi, Social Studies, etc.)
      2. Topic/Chapter name
      3. Grade level (estimate based on complexity)
      4. Key concepts covered
      5. Learning objectives
      6. Difficulty level
      7. Type of content (theory, examples, exercises, etc.)
      
      Provide a detailed JSON response with this information for creating differentiated worksheets.
      `;

      const result = await this.visionModel.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response and structure it
      return this.parseImageAnalysis(text);
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image. Please try again.');
    }
  }

  async generateDifferentiatedWorksheets(analysis: any, selectedGrades: string[]): Promise<any[]> {
    const worksheets = [];
    
    for (const grade of selectedGrades) {
      const prompt = `
      Based on this textbook analysis: ${JSON.stringify(analysis)}
      
      Create a comprehensive worksheet for grade ${grade} students with:
      1. 5-8 questions appropriate for grade ${grade} level
      2. Mix of question types: multiple choice, short answer, practical application
      3. Instructions in simple language
      4. Real-world examples relevant to Indian students
      5. Difficulty appropriate for grade ${grade}
      6. Cultural context and local examples
      
      Format as a structured worksheet with clear sections.
      `;

      try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();
        
        worksheets.push({
          grade,
          title: `${analysis.subject} - ${analysis.topic} (Grade ${grade})`,
          content,
          difficulty: this.getDifficultyForGrade(grade),
          estimatedTime: this.getEstimatedTime(grade)
        });
      } catch (error) {
        console.error(`Error generating worksheet for grade ${grade}:`, error);
      }
    }
    
    return worksheets;
  }

  async explainConcept(question: string, language: string, gradeLevel: string): Promise<string> {
    const prompt = `
    Explain this concept/question in ${language} for grade ${gradeLevel} students in India:
    "${question}"
    
    Requirements:
    - Use very simple language appropriate for grade ${gradeLevel}
    - Include analogies from Indian daily life (cooking, farming, festivals, family)
    - Use examples students can see around them in India
    - Make it culturally relevant and relatable
    - Keep explanation concise but complete
    - Add a simple activity or experiment they can try
    
    Format: Clear explanation with examples and a simple activity.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Concept explanation error:', error);
      throw new Error('Failed to generate explanation. Please try again.');
    }
  }

  async generateVisualAid(description: string, type: string, complexity: string): Promise<any> {
    const prompt = `
    Create detailed instructions for drawing a ${type} about "${description}" that can be easily drawn on a blackboard.
    
    Complexity level: ${complexity}
    
    Provide:
    1. Step-by-step drawing instructions (numbered steps)
    2. What materials are needed (chalk, colored chalk, ruler, etc.)
    3. Teaching tips for explaining while drawing
    4. Key labels to add
    5. Common mistakes to avoid
    6. How to make it interactive for students
    
    Make it practical for Indian classroom settings with basic materials.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return {
        instructions: response.text(),
        type,
        complexity,
        estimatedTime: complexity === 'simple' ? '5-10 minutes' : complexity === 'moderate' ? '10-15 minutes' : '15-20 minutes'
      };
    } catch (error) {
      console.error('Visual aid generation error:', error);
      throw new Error('Failed to generate visual aid instructions.');
    }
  }

  async generateLessonPlan(subject: string, topic: string, duration: number, grades: string[], objectives: string): Promise<any> {
    const prompt = `
    Create a comprehensive lesson plan for multi-grade Indian classroom:
    
    Subject: ${subject}
    Topic: ${topic}
    Duration: ${duration} minutes
    Grades present: ${grades.join(', ')}
    Learning objectives: ${objectives}
    
    Create a detailed lesson plan with:
    1. Learning objectives for each grade level
    2. Materials needed (available in Indian schools)
    3. Step-by-step activities with time allocation
    4. Differentiation strategies for multi-grade teaching
    5. Assessment methods
    6. Homework assignments for different grades
    7. Extension activities
    8. Cultural connections and local examples
    
    Format as a structured lesson plan suitable for Indian teachers.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return {
        content: response.text(),
        subject,
        topic,
        duration,
        grades,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Lesson plan generation error:', error);
      throw new Error('Failed to generate lesson plan.');
    }
  }

  async generateEducationalGame(subject: string, topic: string, gameType: string, difficulty: string, playerCount: string): Promise<any> {
    const prompt = `
    Create an educational game for Indian students:
    
    Subject: ${subject}
    Topic: ${topic}
    Game Type: ${gameType}
    Difficulty: ${difficulty}
    Player Count: ${playerCount}
    
    Generate:
    1. Game rules and instructions
    2. Materials needed (available in Indian schools)
    3. Step-by-step gameplay
    4. Learning objectives
    5. Scoring system
    6. Variations for different skill levels
    7. Cultural adaptations for Indian context
    8. Assessment criteria
    
    Make it engaging and educational for Indian students.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return {
        content: response.text(),
        subject,
        topic,
        gameType,
        difficulty,
        playerCount,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Game generation error:', error);
      throw new Error('Failed to generate educational game.');
    }
  }

  private async fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
  }

  private parseImageAnalysis(text: string): any {
    try {
      // Try to extract JSON if present, otherwise structure the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: structure the text response
      return {
        subject: this.extractField(text, 'subject') || 'General Studies',
        topic: this.extractField(text, 'topic') || 'Learning Concepts',
        gradeLevel: this.extractField(text, 'grade') || '4-6',
        concepts: this.extractConcepts(text),
        difficulty: this.extractField(text, 'difficulty') || 'Medium',
        contentType: this.extractField(text, 'type') || 'Mixed Content'
      };
    } catch (error) {
      console.error('Error parsing image analysis:', error);
      return {
        subject: 'General Studies',
        topic: 'Learning Concepts',
        gradeLevel: '4-6',
        concepts: ['Basic understanding', 'Practical application'],
        difficulty: 'Medium',
        contentType: 'Mixed Content'
      };
    }
  }

  private extractField(text: string, field: string): string | null {
    const patterns = {
      subject: /subject[:\s]*([^\n\r]+)/i,
      topic: /topic[:\s]*([^\n\r]+)/i,
      grade: /grade[:\s]*([^\n\r]+)/i,
      difficulty: /difficulty[:\s]*([^\n\r]+)/i,
      type: /type[:\s]*([^\n\r]+)/i
    };
    
    const pattern = patterns[field as keyof typeof patterns];
    const match = text.match(pattern);
    return match ? match[1].trim() : null;
  }

  private extractConcepts(text: string): string[] {
    const conceptsMatch = text.match(/concepts?[:\s]*([^\n\r]+)/i);
    if (conceptsMatch) {
      return conceptsMatch[1].split(',').map(c => c.trim());
    }
    return ['Key concept 1', 'Key concept 2', 'Practical application'];
  }

  private getDifficultyForGrade(grade: string): string {
    const gradeNum = parseInt(grade.split('-')[0]);
    if (gradeNum <= 3) return 'Easy';
    if (gradeNum <= 6) return 'Medium';
    return 'Hard';
  }

  private getEstimatedTime(grade: string): string {
    const gradeNum = parseInt(grade.split('-')[0]);
    if (gradeNum <= 3) return '15-20 minutes';
    if (gradeNum <= 6) return '20-30 minutes';
    return '30-45 minutes';
  }
}

export default GoogleAIService;