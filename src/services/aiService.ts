const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string; 

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}


const getQuizPrompt = (topic: string, difficulty: number, personality : string) => {
  let difficultyDescription = '';
  switch (difficulty) {
    case 1: difficultyDescription = "Easiest: Questions should be based on fun facts and widely known, surface-level information."; break;
    case 2: difficultyDescription = "Easy: Questions should cover common knowledge that a casual enthusiast of the topic would know."; break;
    case 3: difficultyDescription = "Medium: Questions should require some specific knowledge and assume the user has a foundational understanding of the topic."; break;
    case 4: difficultyDescription = "Hard: Questions should be for dedicated fans, covering in-depth details, niche facts, and specific terminology."; break;
    case 5: difficultyDescription = "Hardest: Questions should be expert-level, obscure, and challenging even for a knowledgeable person."; break;
    default: difficultyDescription = "Medium: A standard mix of questions.";
  }

  let personalityInstruction = '';
  switch (personality) {
    case 'The Professional Quizmaster':
      personalityInstruction = "Adopt a formal, clear, and authoritative tone like a televised quiz show host. Often provide a brief introductory sentence or context before asking the question directly.";
      break;
    case 'The Storyteller':
      personalityInstruction = "Adopt a narrative, descriptive, and engaging tone. Weave a short scenario or story into each question to make it more immersive. The question should emerge naturally from the narrative.";
      break;
    case 'The Sarcastic Rival':
      personalityInstruction = "Adopt a taunting, challenging, and slightly mocking tone. Frame questions as a personal challenge to the user, using informal and direct language as if daring them to get it right.";
      break;
    case 'The Enthusiastic Child':
      personalityInstruction = "Adopt a playful, simple, and wondrous tone. Use simple words and lots of excitement. Frame questions from a curious, child-like perspective, even if the topic is complex.";
      break;
    default:
      personalityInstruction = "Use a standard, neutral tone for questioning.";
  }

  return `
  You are a robust JSON-generating API. Your primary function is to create educational quizzes.
    
    The user-provided topic is: "${topic}"

    --- PRE-GENERATION CHECK ---
    First, evaluate the topic. If the topic is nonsensical (e.g., "asdfghjk"), ambiguous, inappropriate, or too short (less than 3 characters) to generate a meaningful quiz, you MUST respond with the following JSON object and nothing else:
    {
      "error": "The topic you provided is invalid or too vague. Please provide a more specific and appropriate topic."
    }
    --- END PRE-GENERATION CHECK ---

    If the topic is valid, proceed with generating the quiz according to the specifications below.

    You are a helpful quiz-generating assistant and
    You are an AI Quizmaster. You MUST adopt the following personality for the entire duration of this quiz generation task.
    
    --- PERSONALITY DIRECTIVE ---
    ${personalityInstruction}
    --- END DIRECTIVE ---

    Your task is to generate a quiz based on the user's specifications. Your adopted personality should influence the TONE, STYLE, and CONTEXT of the questions you create.

    --- QUIZ SPECIFICATIONS ---
    - Topic: "${topic}"
    - Difficulty Level: ${difficulty} out of 5 (${difficultyDescription})
    --- END SPECIFICATIONS ---

    Now, generate the quiz. 
    Respond ONLY with a valid JSON object. Do not include any introductory text, explanations, or code block formatting like \`\`\`json.
    
    The JSON object must have a single key "questions" which is an array of 5 question objects.
    Each question object must have the following keys:
    - "question": A string containing the question text, phrased according to your assigned personality.
    - "options": An array of 4 unique strings.
    - "correctAnswerIndex": A number between 0 and 3.`
};


export async function generateQuiz(topic: string, modelName: string, difficulty: number, personality: string): Promise<Question[]> {
  const prompt = getQuizPrompt(topic, difficulty,personality);

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

    let jsonString;
    if (modelName.startsWith('gemini')) {
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("The AI response was blocked or is empty. This can happen with sensitive topics.");
      }
      jsonString = data.candidates[0].content.parts[0].text;
    } else {
      jsonString = data.choices[0].message.content;
    }

    const parsedData = JSON.parse(jsonString.replace(/```json|```/g, '').trim());

   
    if (parsedData.error) {
      throw new Error(parsedData.error);
    }
    
    return parsedData.questions;


    // const jsonString = data.candidates[0].content.parts[0].text;
    // const quiz = JSON.parse(jsonString.replace(/```json|```/g, '').trim());
    // return quiz.questions;

    

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

