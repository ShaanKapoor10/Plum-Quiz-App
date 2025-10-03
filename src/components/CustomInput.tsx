import React from "react";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";

interface CustomInputProps {
  id?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ id, value, placeholder, onChange }) => {
  const { theme } = useQuiz();

  return (
    <Wrapper data-theme={theme}>
      <input
        id={id}
        className="input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={placeholder || "input"}
        autoComplete="off"
      />
    </Wrapper>
  );
};

export default CustomInput;

const Wrapper = styled.div`
  --accent: #00e5ff;       
  --accent-weak: rgba(0,229,255,0.12);
  --radius: 10px;

  display: inline-block;
  width: 100%;
  max-width: 640px; 

  .input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    border-radius: var(--radius);
    border: 1px solid transparent;
    outline: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
    background-clip: padding-box;
  }

 
  &[data-theme="dark"] .input {
    background: rgba(255,255,255,0.03);
    color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.6) inset;
    border: 1px solid rgba(58, 112, 112, 0.16);
  }

  &[data-theme="dark"] .input::placeholder {
    color: rgba(255,255,255,0.40);
  }


  &[data-theme="light"] .input {
    background: #ffffff;
    color: #0b0b0b;
    border: 1px solid rgba(55, 81, 99, 0.06);
    box-shadow: 0 2px 8px rgba(9,10,11,0.04) inset;
  }

  &[data-theme="light"] .input::placeholder {
    color: rgba(16,22,26,0.4);
  }


  .input:focus {
    border-color: var(--accent);
    box-shadow: 0 6px 28px var(--accent-weak), 0 0 0 3px rgba(0,229,255,0.06);
    outline: none;
    transform: translateZ(0);
  }

  .input:hover {
    filter: brightness(1.02);
  }
  
  @media (max-width: 480px) {
    .input {
      padding: 10px 12px;
      font-size: 0.92rem;
      border-radius: 8px;
    }
  }
`;
