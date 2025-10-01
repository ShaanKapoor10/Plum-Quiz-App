import React from 'react';
import { useQuiz } from '../context/QuizContext';

const topics = ['Tech Trends', 'Wellness', 'World History', 'Space Exploration'];

const TopicScreen = () => {
  const { selectTopic } = useQuiz();

  return (
    <div className="card">
      <h1>Select a Topic</h1>
      <div className="topic-buttons">
        {topics.map(topic => (
          <button key={topic} onClick={() => selectTopic(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicScreen;