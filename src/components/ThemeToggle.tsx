import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Switch from './switch';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useQuiz();

  return (<>
    <Switch checked={theme === 'light'} onChange={toggleTheme} />

    {/* <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button> */}
    </>
  );
};

export default ThemeToggle;

