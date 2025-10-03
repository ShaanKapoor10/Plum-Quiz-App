import React from 'react';
import { type Question } from '../services/aiService'; // Assuming Question type is exported from aiService

interface AnswerReviewProps {
  question: Question;
  userAnswerIndex: number | null;
  questionIndex: number;
}

const AnswerReview = ({ question, userAnswerIndex, questionIndex }: AnswerReviewProps) => {
  const isCorrect = userAnswerIndex === question.correctAnswerIndex;

  return (
    <div className="answer-review-container">
      <h4 className="answer-review-question">
        {questionIndex + 1}. {question.question}
      </h4>
      <div className="answer-review-options">
        {question.options.map((option, index) => {
          const isUserAnswer = index === userAnswerIndex;
          const isCorrectAnswer = index === question.correctAnswerIndex;
          
          // Determine the class for the option
          let optionClass = 'answer-review-option';
          if (isCorrectAnswer) {
            optionClass += ' correct'; // Always highlight the correct answer in green
          }
          if (isUserAnswer && !isCorrectAnswer) {
            optionClass += ' incorrect'; // Highlight the user's wrong answer in red
          }

          return (
            <div key={index} className={optionClass}>
              {option}
              {isUserAnswer && <span> ← Your Answer</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerReview;
