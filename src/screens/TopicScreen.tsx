import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const predefinedTopics = ['Tech Trends', 'World History', 'Space Exploration'];

const TopicScreen = () => {
  const [customTopic, setCustomTopic] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash'); 
  const { startQuiz } = useQuiz();

  const handleStartQuiz = (topicToUse: string) => {
    if (!topicToUse.trim()) {
      alert("Please select or enter a topic!");
      return;
    }
    startQuiz(topicToUse, selectedModel);
  };

  return (
    <div className="card">
      <h1>Create Your Quiz</h1>
      
      <div className="form-group">
        <label htmlFor="model-select">Choose AI Model:</label>
        <select 
          id="model-select" 
          value={selectedModel} 
          onChange={e => setSelectedModel(e.target.value)}
        >
          <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fastest)</option>
          <option value="gemini-2.5-pro">Gemini 2.5 Pro (Advanced)</option>
          {/* <option value="gpt-3.5-turbo">OpenAI GPT (Free Tier)</option> */}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="custom-topic">Enter a Custom Topic:</label>
        <input 
          type="text" 
          id="custom-topic"
          placeholder="e.g., The Roman Empire"
          value={customTopic}
          onChange={e => setCustomTopic(e.target.value)}
        />
        <button onClick={() => handleStartQuiz(customTopic)}>Generate Custom Quiz</button>
      </div>

      <div className="divider">OR</div>

      <div className="topic-buttons">
        {predefinedTopics.map(topic => (
          <button key={topic} onClick={() => handleStartQuiz(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicScreen;

