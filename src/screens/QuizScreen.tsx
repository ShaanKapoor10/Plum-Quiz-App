import React from "react";
import { useQuiz } from "../context/QuizContext";
import Card from "../components/GlowCard";
import ProgressBar from "../components/ProgressBar";
import OptionSelector from "../components/OptionSelector";
import NavigationButtons from "../components/NavigationButtons";

const QuizScreen = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
  } = useQuiz();

  const question = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        align="start"
        style={{
          borderRadius: "10px",
          margin: "0 auto",
          padding: "24px",
          width: "100%",
          maxWidth: "980px", 
        }}
      >
        <div
          className="card-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <ProgressBar current={currentQuestionIndex} total={questions.length} />

          <h2 style={{ margin: 0 }}>{question.question}</h2>

          <OptionSelector
            options={question.options}
            selectedIndex={selectedAnswer}
            onSelect={(index) => selectAnswer(currentQuestionIndex, index)}
          />

          <NavigationButtons
            currentIndex={currentQuestionIndex}
            total={questions.length}
            isDisabled={selectedAnswer === null}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onSubmit={submitQuiz}
          />
        </div>
      </Card>
    </div>
  );
};

export default QuizScreen;
