import React from "react";
import { useQuiz } from "../context/QuizContext";
import Card from "../components/GlowCard";

const ResultScreen = () => {
  const { score, questions, feedback, restartQuiz } = useQuiz();
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        align="start"
        style={{
          borderRadius: "10px",
          margin: "0 auto",
          padding: "28px",
          width: "100%",
          maxWidth: "780px",
        }}
      >
        <div
          className="card-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
          }}
        >
          <h1 style={{ margin: 0 }}>Quiz Results</h1>

          <p className="score-text" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            You scored {score} out of {totalQuestions} ({percentage}%)
          </p>

          <div className="feedback-box" style={{ padding: "12px", borderRadius: 8, background: "rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0 }}>AI Feedback:</h3>
            <p style={{ marginBottom: 0 }}>{feedback}</p>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={restartQuiz} style={{ padding: "10px 16px", borderRadius: 10, cursor: "pointer" }}>
              Try Another Quiz
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultScreen;
