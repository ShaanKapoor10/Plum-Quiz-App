const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;


export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}


export async function generateQuiz(topic: string): Promise<Question[]> {
  const prompt = `
    You are a helpful quiz-generating assistant. Your task is to generate a quiz based on a given topic.
    Respond ONLY with a valid JSON object. Do not include any introductory text, explanations, or code block formatting like \`\`\`json.
    
    The JSON object should represent a quiz and have a single key "questions" which is an array of 5 question objects.
    Each question object must have the following keys:
    - "question": A string containing the question text.
    - "options": An array of 4 unique strings representing the multiple-choice options.
    - "correctAnswerIndex": A number (0, 1, 2, or 3) representing the index of the correct answer in the "options" array.

    Topic: "${topic}"
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quiz from AI.');
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
    const quiz = JSON.parse(jsonString);
    return quiz.questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error; 
  }
}


export async function generateFeedback(topic: string, score: number): Promise<string> {
    const prompt = `
      You are a supportive and encouraging tutor. Your task is to provide a brief, personalized feedback message to a student based on their quiz score.
      The user scored ${score} out of 5 on a quiz about ${topic}.
      Respond with a 2-3 sentence message that is encouraging and mentions one interesting fact related to the topic. Do not ask any questions.
      Respond ONLY with the text of the message, with no extra formatting.
    `;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch feedback from AI.');
      }
  
      const data = await response.json();
      return data.candidates[0].content.parts[0].text.trim();
  
    } catch (error) {
      console.error("Error generating feedback:", error);
      return "Great effort! Keep learning and exploring."; // Fallback message
    }
  }