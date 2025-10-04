import React from 'react';
import Card from '../components/GlowCard'; 
import { useQuiz } from '../context/QuizContext';

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  const { restartQuiz } = useQuiz(); 

  return (
    <div style={{ display: "flex" ,alignItems : "start" }}>
      <Card
        align="center"
        style={{
          borderRadius: "10px",
          margin: "0 auto",
          
          width: "100%",
          
          textAlign: "center"
        }}
      >
        {/* <Card
        align="start"
        style={{
          borderRadius: "10px",
          margin: "0 auto",
          padding: "20px",
        }}
      ></Card> */}
        <div className="card-inner" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff7675' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>

          <h1 style={{ margin: 0 }}>Oops! Something went wrong.</h1>
          <p style={{ color: '#a0aec0', margin: '0 0 1rem 0' }}>
            We couldn't generate your quiz. Please try again.
          </p>
          
         
          <div className="feedback-box" style={{ padding: "12px", borderRadius: 8, background: "rgba(255,0,0,0.1)", width: '100%' }}>
            <p style={{ margin: 0, fontFamily: 'monospace', color: '#ff7675' }}>{message}</p>
          </div>
          
          <button onClick={restartQuiz} style={{ padding: "10px 16px", borderRadius: 10, cursor: "pointer", width: '50%' }}>
            Try Again
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorScreen;
