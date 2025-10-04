import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Question, generateQuiz, generateFeedback } from '../services/aiService';

interface QuizContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  gameState: 'topic' | 'loading' | 'quiz' | 'results';
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  score: number;
  feedback: string;
  startQuiz: (topic: string, modelName: string , difficulty : number) => void;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  // Theme state management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (savedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

 
  const [gameState, setGameState] = useState<'topic' | 'loading' | 'quiz' | 'results'>('topic');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const startQuiz = async (selectedTopic: string, modelName: string,difficulty : number) => {
    setGameState('loading');
    setTopic(selectedTopic);
    try {
      const fetchedQuestions = await generateQuiz(selectedTopic, modelName,difficulty);
      setQuestions(fetchedQuestions);
      setUserAnswers(new Array(fetchedQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setGameState('quiz');
    } catch (error) {
      console.error("Failed to start quiz:", error);
      setGameState('topic'); 
    }
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = async () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswerIndex === userAnswers[index]) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setGameState('loading');
    const feedbackMsg = await generateFeedback(topic, calculatedScore);
    setFeedback(feedbackMsg);
    setGameState('results');
  };
  
  const restartQuiz = () => {
    setGameState('topic');
    setQuestions([]);
    setTopic('');
  };

  return (
    <QuizContext.Provider value={{ theme, toggleTheme, gameState, questions, currentQuestionIndex, userAnswers, score, feedback, startQuiz, selectAnswer, nextQuestion, previousQuestion, submitQuiz, restartQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

