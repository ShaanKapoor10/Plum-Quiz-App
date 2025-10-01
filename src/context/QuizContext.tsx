import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Question, generateQuiz, generateFeedback } from '../services/aiService';

// here we are defining shape of our context State
interface QuizContextType {
  gameState: 'topic' | 'loading' | 'quiz' | 'results';
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  score: number;
  feedback: string;
  selectTopic: (topic: string) => void;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  submitQuiz: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<'topic' | 'loading' | 'quiz' | 'results'>('topic');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const selectTopic = async (selectedTopic: string) => {
    setGameState('loading');
    setTopic(selectedTopic);
    try {
      const fetchedQuestions = await generateQuiz(selectedTopic);
      setQuestions(fetchedQuestions);
      setUserAnswers(new Array(fetchedQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setGameState('quiz');
    } catch (error) {
      console.error("Failed to start quiz:", error);
      setGameState('topic'); // error handle we go back to topic selection on error
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

  const submitQuiz = async () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswerIndex === userAnswers[index]) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setGameState('loading'); // loader will show while fetching feedback
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
    <QuizContext.Provider value={{ gameState, questions, currentQuestionIndex, userAnswers, score, feedback, selectTopic, selectAnswer, nextQuestion, submitQuiz, restartQuiz }}>
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