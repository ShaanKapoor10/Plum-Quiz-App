import React from 'react';
import { useQuiz } from '../context/QuizContext';
import ProgressBar from '../components/ProgressBar';

const QuizScreen = () => {
  // NEW: Destructure the previousQuestion function
  const { questions, currentQuestionIndex, userAnswers, selectAnswer, nextQuestion, previousQuestion, submitQuiz } = useQuiz();
  
  const question = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="card quiz-card">
      <ProgressBar current={currentQuestionIndex} total={questions.length} />
      <h2>{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => selectAnswer(currentQuestionIndex, index)}
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* NEW: Updated navigation section */}
      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button onClick={previousQuestion}>Previous</button>
        )}
        
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={nextQuestion} disabled={selectedAnswer === null}>Next</button>
        ) : (
          <button onClick={submitQuiz} disabled={selectedAnswer === null}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;