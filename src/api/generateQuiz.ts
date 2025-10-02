// Some notes according to how i have made and why i made this 
// This is a serverless function and runs on the backend.
// even though i have written logic for openAi , as openAi isnt providing the free api use , we dont use it but we have provided it just in case in future someone has to use it
import OpenAI from "openai"; 


// created a generalised prompt here, which is same irrespective of models
const getQuizPrompt = (topic: string) => `
  You are a helpful quiz-generating assistant. Your task is to generate a quiz based on a given topic.
  Respond ONLY with a valid JSON object. Do not include any introductory text, explanations, or code block formatting like \`\`\`json.
  
  The JSON object should represent a quiz and have a single key "questions" which is an array of 5 question objects.
  Each question object must have the following keys:
  - "question": A string containing the question text.
  - "options": An array of 4 unique strings representing the multiple-choice options.
  - "correctAnswerIndex": A number (0, 1, 2, or 3) representing the index of the correct answer in the "options" array.

  Topic: "${topic}"
`;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { topic, modelName } = await request.json();

    if (!topic || !modelName) {
      return new Response(JSON.stringify({ error: 'Topic and modelName are required.' }), { status: 400 });
    }

    let quizQuestions;
    let response;

    // model selection logic
    if (modelName.startsWith('gemini')) {
      if (!GEMINI_API_KEY) throw new Error("Gemini API key is not configured on the server.");
      
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
      response = await fetch(API_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: getQuizPrompt(topic) }] }],
          }),
      });

      if (!response.ok) {
          const errorBody = await response.text();
          console.error('Gemini API Error Response:', errorBody);
          throw new Error(`Failed to fetch from Gemini. Status: ${response.status}`);
      }

      const data = await response.json();
      const jsonString = data.candidates[0].content.parts[0].text;
      quizQuestions = JSON.parse(jsonString.replace(/```json|```/g, '').trim()).questions;

    } else if (modelName.startsWith('gpt')) {
      if (!OPENAI_API_KEY) throw new Error("OpenAI API key is not configured on the server.");
      
      const openAIModelToUse = 'gpt-4.1';
      const API_URL = 'https://api.openai.com/v1/responses';
      response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: openAIModelToUse,
            input: getQuizPrompt(topic)
          }),
      });

      if (!response.ok) {
          const errorBody = await response.text();
          console.error('OpenAI API Error Response:', errorBody);
          throw new Error(`Failed to fetch from OpenAI. Status: ${response.status}`);
      }
      
      const data = await response.json();
      const jsonString = data.response || data.text;
       if (!jsonString) {
        throw new Error("Could not find a valid response field in the OpenAI API output.");
      }
      quizQuestions = JSON.parse(jsonString.replace(/```json|```/g, '').trim()).questions;
      
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported model.' }), { status: 400 });
    }

    return new Response(JSON.stringify({ questions: quizQuestions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: 'Failed to generate quiz.', details: errorMessage }), { status: 500 });
  }
}
