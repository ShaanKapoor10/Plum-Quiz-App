import React, { type FC, type ReactNode } from "react";
import styled, { css } from "styled-components";
import { useQuiz } from "../context/QuizContext"; 
interface CardProps {
  title?: string;
  children?: ReactNode;
  align?: "center" | "start";
  className?: string;
   style?: React.CSSProperties;
}

const Card: FC<CardProps> = ({ title = "magic...", children, align = "center", className,style }) => {
  const { theme } = useQuiz(); 
  
    return (
    <StyledWrapper className={className} data-align={align} data-theme={theme} style={style}>
      <div className="card">
        <div className="card-info">
         
          {children ?? <p className="title">{title}</p>}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --background: linear-gradient(to right, #13b37f 0%, #11a3c8 100%);
    width: 100rem;
    max-width: 1000px;
    height: auto; 
    min-height: 180px;
    padding: 0.9px;
    border-radius: 0.7rem;
    overflow: visible;
    background: var(--background);
    position: relative;
    z-index: 1;
     margin: 0 auto;   
  }

  .card::after {
    position: absolute;
    content: "";
    top: -22px;
    left: 0px;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: scale(0.76);
    filter: blur(34.5px);
    background: #f7ba2b;
    background: var(--background);
    transition: opacity 0.5s;
  }
 
.StyledWrapper { padding: 24px; overflow: visible; }


  &[data-theme="dark"] .card-info {
    background: #1f1a1d;
    color: #fff;
  }

  &[data-theme="light"] .card-info {
    background: #f5f5f5;
    color: #111;
  }

  .card-info {
    --color: #1f1a1d;
    background: var(--color);
    color: var(--color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: visible;
    border-radius: 0.7rem;
    padding: 1.2rem;
  }

  
  &[data-align="start"] .card-info {
    justify-content: flex-start;
    align-items: stretch;
  }

  .card .title {
    font-weight: 300;
    letter-spacing: 0.2em;
    color: #ffffff;
    margin: 0;
  }


  .card:hover::after {
    opacity: 0.6;
    padding: 0.7rem 0;
    top: 18px;
    transition: 0.6s;
  }

  .card-info {
    color: #fff9f9;
    transition: color 1s;
  }

  
  @media (max-width: 480px) {
    .card {
      max-width: 100%;
    }
  }
`;

export default Card;
