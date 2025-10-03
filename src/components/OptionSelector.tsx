import React from "react";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";

interface OptionSelectorProps {
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedIndex,
  onSelect,
}) => {
  const { theme } = useQuiz();

  return (
    <StyledWrapper data-theme={theme}>
      <div className="radio-group-container">
        {options.map((option, index) => (
          <label key={index} className={`radio-label color-${index}`}>
            <input
              type="radio"
              checked={selectedIndex === index}
              onChange={() => onSelect(index)}
              className="radio-input"
            />
            <span className="radio-custom" />
            <span className="radio-text">{option}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-group-container {
    background-color: rgba(26, 27, 40, 0.7);
    padding: 20px 35px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.055);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    width: 100%;
    max-width: 40rem;
    transition: all 0.3s ease;
    margin: auto;
    box-sizing: border-box;
  }

  .radio-label {
    display: flex;
    align-items: center;
    margin: 18px 0;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .radio-input {
    display: none;
  }

  .radio-custom {
    width: 22px;
    height: 22px;
    background-color: transparent;
    border: 2px solid #5c5e79;
    border-radius: 50%;
    margin-right: 18px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .radio-custom::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .radio-custom::after {
    content: "";
    position: absolute;
    width: 34px;
    height: 34px;
    border: 2px solid transparent;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s ease;
  }

  
  &[data-theme="light"] .radio-group-container {
    background-color: rgba(252, 250, 245, 0.8); /* soft warm white */

    border-color: rgba(0, 0, 0, 0.05);
  }
  &[data-theme="light"] .radio-text {
    color: #333;
  }

 
  .radio-label.color-0 .radio-input:checked + .radio-custom {
    border-color: var(--c0);
  }
  .radio-label.color-0 .radio-input:checked + .radio-custom::before {
    background-color: var(--c0);
  }
  .radio-label.color-0 .radio-input:checked + .radio-custom::after {
    border-top-color: var(--c0);
    box-shadow: 0 0 30px var(--c0), 0 0 80px var(--c0a);
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
  }

 
  .radio-label.color-1 .radio-input:checked + .radio-custom {
    border-color: var(--c1);
  }
  .radio-label.color-1 .radio-input:checked + .radio-custom::before {
    background-color: var(--c1);
  }
  .radio-label.color-1 .radio-input:checked + .radio-custom::after {
    border-top-color: var(--c1);
    box-shadow: 0 0 30px var(--c1), 0 0 80px var(--c1a);
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
  }

  .radio-label.color-2 .radio-input:checked + .radio-custom {
    border-color: var(--c2);
  }
  .radio-label.color-2 .radio-input:checked + .radio-custom::before {
    background-color: var(--c2);
  }
  .radio-label.color-2 .radio-input:checked + .radio-custom::after {
    border-top-color: var(--c2);
    box-shadow: 0 0 30px var(--c2), 0 0 80px var(--c2a);
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
  }

  .radio-label.color-3 .radio-input:checked + .radio-custom {
    border-color: var(--c3);
  }
  .radio-label.color-3 .radio-input:checked + .radio-custom::before {
    background-color: var(--c3);
  }
  .radio-label.color-3 .radio-input:checked + .radio-custom::after {
    border-top-color: var(--c3);
    box-shadow: 0 0 30px var(--c3), 0 0 80px var(--c3a);
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
  }

  
  &[data-theme="dark"] {
    --c0: #00a6ff;
    --c0a: rgba(0, 166, 255, 0.2);
    --c1: #e900ff;
    --c1a: rgba(233, 0, 255, 0.2);
    --c2: #00ffc2;
    --c2a: rgba(0, 255, 194, 0.2);
    --c3: #ff6b6b;
    --c3a: rgba(255, 107, 107, 0.2);
  }

 
  &[data-theme="light"] {
  --c0: #4a90e2; 
  --c0a: rgba(74, 144, 226, 0.2);
  --c1: #d656ff; 
  --c1a: rgba(214, 86, 255, 0.2);
  --c2: #5cffb0; 
  --c2a: rgba(92, 255, 176, 0.2);
  --c3: #ff6b6b; 
  --c3a: rgba(255, 107, 107, 0.2);
}

  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default OptionSelector;
