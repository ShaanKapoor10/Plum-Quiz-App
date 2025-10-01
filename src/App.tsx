import React from 'react';
import { useQuiz } from './context/QuizContext';
import TopicScreen from './screens/TopicScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import Loader from './components/Loader';
import './App.css';

function App() {
  const { gameState } = useQuiz();

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
      <header>
        <h1>AI Knowledge Quiz 🧠</h1>
      </header>
      <main>
        {renderGameState()}
      </main>
    </div>
  );
}

export default App;