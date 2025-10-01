import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      <span>Question {current + 1} of {total}</span>
    </div>
  );
};

export default ProgressBar;