import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Switch from './Switch';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useQuiz();

  return (<>
    <Switch checked={theme === 'light'} onChange={toggleTheme} />

    
    </>
  );
};

export default ThemeToggle;

