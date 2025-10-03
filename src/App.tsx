import React, { useEffect } from 'react';
import { useQuiz } from './context/QuizContext';
import TopicScreen from './screens/TopicScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const { gameState, theme } = useQuiz();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const renderGameState = () => {
    switch (gameState) {
      case 'topic':
        return <TopicScreen />;
      case 'loading':
        return <Loader message="Generating your quiz..." />;
      case 'quiz':
        return <QuizScreen />;
      case 'results':
        return <ResultScreen />;
      default:
        return <TopicScreen />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AI Quiz</h1>
        <ThemeToggle />
      </header>
      <main>
        {renderGameState()}
      </main>
    </div>
  );
}

export default App;

