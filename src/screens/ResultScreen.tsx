import React from 'react';
import { useQuiz } from '../context/QuizContext';

const ResultScreen = () => {
  const { score, questions, feedback, restartQuiz } = useQuiz();
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="card result-card">
      <h1>Quiz Results</h1>
      <p className="score-text">You scored {score} out of {totalQuestions} ({percentage}%)</p>
      <div className="feedback-box">
        <h3>AI Feedback:</h3>
        <p>{feedback}</p>
      </div>
      <button onClick={restartQuiz}>Try Another Quiz</button>
    </div>
  );
};

export default ResultScreen;