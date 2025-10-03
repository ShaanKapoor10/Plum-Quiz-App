import React from "react";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";

interface GenerateButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}


const GenerateButton: React.FC<GenerateButtonProps> = ({
  children = "Generate Custom Quiz",
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  const { theme } = useQuiz();

  return (
    <Wrapper data-theme={theme}>
      <button
        className="btn"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel ?? String(children)}
        title={String(children)}
      >
        <svg
          className="sparkle"
          height={20}
          width={20}
          viewBox="0 0 24 24"
          aria-hidden
          focusable={false}
        >
          <path
            d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245Z"
            fill="currentColor"
          />
        </svg>
        <span className="text">{children}</span>
      </button>
    </Wrapper>
  );
};

export default GenerateButton;
const Wrapper = styled.div`

  display: inline-flex;    
  justify-content: center;
  align-items: center;
  width: auto !important;   
  margin: 0 auto; 
    padding-top : 2rem;


  .btn {
  
    --accent: linear-gradient(0deg,#A47CF3,#683FEA);
    --accent-weak: rgba(0, 229, 255, 0.14);

    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 0.6rem 1.4rem; 
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
    white-space: nowrap;
  }

 
  &[data-theme="dark"] .btn {
    
    background: rgba(255, 255, 255, 0.07);
    color: white;
  }
  &[data-theme="dark"] .btn:hover {
    background: var(--accent);
    box-shadow: 0 8px 22px rgba(0, 229, 255, 0.24);
    color: black;
  }

  
  &[data-theme="light"] .btn {
    background: rgba(0, 0, 0, 0.05);
    color: black;
  }
  &[data-theme="light"] .btn:hover {
    background: black;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
    color: white;
  }

  .sparkle {
    transition: transform 200ms ease;
  }
  .btn:hover .sparkle {
    transform: scale(1.1);
  }


      .btn:disabled,
  .btn[disabled] {
    pointer-events: none;
    opacity: 0.4;
   transform: none !important;
   box-shadow: none !important;
   background: rgba(128,128,128,0.2) !important;
   color: inherit !important;
  }

 
 .btn:disabled:hover,
 .btn[disabled]:hover {
   background: rgba(128,128,128,0.2) !important;
   box-shadow: none !important;
   transform: none !important;
   color: inherit !important;
}


`;
