
import React from "react";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";

interface ProgressBarProps {
  current: number; 
  total: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { theme } = useQuiz();

  
  const safeTotal = Math.max(1, total);

  const fillPercent = safeTotal > 1 ? (current / (safeTotal - 1)) * 100 : 100;


  
  const getLeft = (index: number) =>
    safeTotal > 1 ? (index / (safeTotal - 1)) * 100 : 50;

  return (
    <Wrapper data-theme={theme} role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={safeTotal}>
      <div className="track">
        <div className="fill" style={{ width: `${fillPercent}%` }} />
        {Array.from({ length: safeTotal }).map((_, i) => {
          const left = getLeft(i);
          const active = i <= current;
          return (
            <div
              key={i}
              className={`checkpoint ${active ? "active" : ""}`}
              style={{ left: `${left}%` }}
              aria-hidden={false}
            >
              <svg viewBox="0 0 24 24" aria-hidden focusable={false}>
                <path d="m4.5 12.75 6 6 9-13.5" strokeWidth={2} stroke="white" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          );
        })}
      </div>
      {/* <div className="label">Question {Math.min(current + 1, safeTotal)} of {safeTotal}</div> */}
    </Wrapper>
  );
};

export default ProgressBar;


const Wrapper = styled.div`
margin-top : 40px;
 margin-bottom: 50px;
  --track-h: 12px;              
  --checkpoint-size: 28px;        
  --accent-dark: #00e5ff;         
  --accent-light: #0077b6;       
  --track-bg-dark: #33363a;
  --track-bg-light: #e7e7e7;

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;

  .track {
    position: relative;
    width: 100%;
    max-width: 900px;         
    height: calc(var(--track-h));
    background: var(--track-bg-dark);
    border-radius: 999px;
    overflow: visible;       
  }

  
  .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--accent-dark);
    border-radius: 999px;
    transition: width 420ms cubic-bezier(.2,.9,.2,1);
    box-shadow: 0 6px 18px rgba(0, 229, 255, 0.14), inset 0 -4px 12px rgba(0,0,0,0.08);
  }

  
  .checkpoint {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: var(--checkpoint-size);
    height: var(--checkpoint-size);
    border-radius: 50%;
    background: #2f3336; 
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 14px rgba(0,0,0,0.35);
    transition: transform 240ms ease, background 240ms ease, box-shadow 240ms ease;
    z-index: 3; 
  }

  .checkpoint svg {
    width: 14px;
    height: 14px;
    opacity: 0; 
    transform: scale(0.9);
    transition: opacity 200ms ease, transform 200ms ease;
  }

  .checkpoint.active {
    background: var(--accent-dark);
    box-shadow: 0 8px 24px rgba(0, 229, 255, 0.18), 0 2px 12px rgba(0,0,0,0.35);
    transform: translate(-50%, -50%) scale(1.02);
  }

  .checkpoint.active svg {
    opacity: 1;
    transform: scale(1);
  }

  .label {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.85);
    user-select: none;
  }

  
  &[data-theme="light"] {
    .track { background: var(--track-bg-light); }
    .fill { background: var(--accent-light); box-shadow: 0 6px 18px rgba(0,119,182,0.12); }
    .checkpoint { background: #ffffff; box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
    .checkpoint.active { background: var(--accent-light); box-shadow: 0 8px 24px rgba(0,119,182,0.16); }
    .label { color: #222; }
  }
`;
