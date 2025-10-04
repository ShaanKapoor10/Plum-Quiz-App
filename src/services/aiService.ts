const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string; 

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}


const getQuizPrompt = (topic: string, difficulty: number) => {
  let difficultyDescription = '';
  switch (difficulty) {
    case 1: difficultyDescription = "Easiest: Questions should be based on fun facts and widely known, surface-level information."; break;
    case 2: difficultyDescription = "Easy: Questions should cover common knowledge that a casual enthusiast of the topic would know."; break;
    case 3: difficultyDescription = "Medium: Questions should require some specific knowledge and assume the user has a foundational understanding of the topic."; break;
    case 4: difficultyDescription = "Hard: Questions should be for dedicated fans, covering in-depth details, niche facts, and specific terminology."; break;
    case 5: difficultyDescription = "Hardest: Questions should be expert-level, obscure, and challenging even for a knowledgeable person."; break;
    default: difficultyDescription = "Medium: A standard mix of questions.";
  }

  return `
    You are a helpful quiz-generating assistant. Your task is to generate a quiz based on a given topic and difficulty level.
    Respond ONLY with a valid JSON object. Do not include any introductory text, explanations, or code block formatting like \`\`\`json.
    
    --- QUIZ SPECIFICATIONS ---
    - Topic: "${topic}"
    - Difficulty Level: ${difficulty} out of 5.
    - Difficulty Description: ${difficultyDescription}
    --- END SPECIFICATIONS ---

    The JSON object must have a single key "questions" which is an array of 5 question objects.
    Each question object must have the following keys:
    - "question": A string containing the question text.
    - "options": An array of 4 unique strings representing the multiple-choice options.
    - "correctAnswerIndex": A number (0, 1, 2, or 3) representing the index of the correct answer in the "options" array.
  `;
};


export async function generateQuiz(topic: string, modelName: string, difficulty: number): Promise<Question[]> {
  const prompt = getQuizPrompt(topic, difficulty);

  try {
    let response;

    if (modelName.startsWith('gemini')) {
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY 
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

    } else if (modelName.startsWith('gpt')) {
      throw new Error('OpenAI models are not currently enabled.');

    } else {
      throw new Error(`Unsupported model: ${modelName}`);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('API Error Response:', errorBody);
      throw new Error(`Failed to fetch quiz from AI. Status: ${response.status}`);
    }
    
    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    const quiz = JSON.parse(jsonString.replace(/```json|```/g, '').trim());
    return quiz.questions;

  } catch (error) {
    console.error("Error in generateQuiz function:", error);
    throw error; 
  }
}

export async function generateFeedback(topic: string, score: number): Promise<string> {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
  const prompt = `
      You are a supportive tutor. The user scored ${score} out of 5 on a quiz about ${topic}.
      Respond with a 2-3 sentence encouraging message and one related fun fact.
      Respond ONLY with the text of the message.
    `;
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch feedback. Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  
  } catch (error) {
    console.error("Error in generateFeedback function:", error);
    return "Great effort! Keep learning and exploring.";
  }
}

