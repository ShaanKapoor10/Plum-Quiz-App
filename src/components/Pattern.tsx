import React from "react";
import styled, { css } from "styled-components";
import { useQuiz } from "../context/QuizContext";

type ThemeMode = "light" | "dark";

const Pattern: React.FC<{ zIndex?: number }> = ({ zIndex = -1 }) => {
  const { theme } = useQuiz();
  
  const themeMode: ThemeMode = theme === "light" ? "light" : "dark";

  return <StyledWrapper themeMode={themeMode} style={{ zIndex }} aria-hidden>
    <div className="container" />
  </StyledWrapper>;
};

export default Pattern;



const lightCss = css`
  
  .container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #ffe8f3, #d9f3ff);
  }

  .container::before,
  .container::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #ff9aa2,
      #ffb7b2,
      #ffdac1,
      #e2f0cb,
      #a2e4ff,
      #c9afff,
      #ffb7b2,
      #ff9aa2
    );
    transform: translate(-50%, -50%);
    animation: rotate 8s linear infinite;
    filter: blur(50px);
    opacity: 0.8;
    pointer-events: none;
  }

  .container::after {
    width: 180%;
    height: 180%;
    animation: rotate-reverse 10s linear infinite;
    opacity: 0.6;
  }

  @keyframes rotate {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes rotate-reverse {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(-360deg); }
  }
`;

const darkCss = css`
  
  .container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: radial-gradient(
        ellipse at 20% 30%,
        rgba(138, 43, 226, 0.8) 0%,
        rgba(138, 43, 226, 0) 60%
      ),
      radial-gradient(
        ellipse at 80% 50%,
        rgba(0, 191, 255, 0.7) 0%,
        rgba(0, 191, 255, 0) 70%
      ),
      radial-gradient(
        ellipse at 50% 80%,
        rgba(50, 205, 50, 0.6) 0%,
        rgba(50, 205, 50, 0) 65%
      ),
      linear-gradient(135deg, #000000 0%, #0a0520 100%);
    background-blend-mode: overlay, screen, hard-light;
    animation: aurora-drift 25s infinite alternate ease-in-out;
  }

  .container::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.02) 0px,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 1px,
        transparent 40px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 60px
      );
    animation: grid-shift 20s linear infinite;
    pointer-events: none;
  }

  .container::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 70%,
      rgba(10, 5, 32, 0.9) 100%
    );
    animation: aurora-pulse 8s infinite alternate;
    pointer-events: none;
  }

  @keyframes aurora-drift {
    0% {
      background-position: 0% 0%, 0% 0%, 0% 0%;
      filter: hue-rotate(0deg) brightness(1);
    }
    50% {
      background-position: -10% -5%, 5% 10%, 0% 15%;
      filter: hue-rotate(30deg) brightness(1.2);
    }
    100% {
      background-position: 5% 10%, -10% -5%, 15% 0%;
      filter: hue-rotate(60deg) brightness(1);
    }
  }

  @keyframes grid-shift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-50%, -50%); }
  }

  @keyframes aurora-pulse {
    0% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.05); }
    100% { opacity: 0.8; transform: scale(1); }
  }
`;


interface WrapperProps {
  themeMode: ThemeMode;
}


const StyledWrapper = styled.div<WrapperProps>`
  position: fixed;
  inset: 0;
  z-index: -1; 
  pointer-events: none; 
  .container { will-change: transform, opacity; }

  
  background: transparent;

  ${(p) => (p.themeMode === "light" ? lightCss : darkCss)}
`;
