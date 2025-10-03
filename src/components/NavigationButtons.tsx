import React from "react";
import styled from "styled-components";

interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  isDisabled: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  total,
  isDisabled,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <NavWrapper>
      {currentIndex > 0 && (
        <NeonButton className="prev" onClick={onPrevious}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
            <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5" />
            <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5" />
            <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5" />
          </svg>
          <span>Previous</span>
        </NeonButton>
      )}

      {currentIndex < total - 1 ? (
        <NeonButton className="next" onClick={onNext} disabled={isDisabled}>
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
            <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5" />
            <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5" />
            <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5" />
          </svg>
        </NeonButton>
      ) : (
        <NeonButton className="next" onClick={onSubmit} disabled={isDisabled}>
          <span>Submit Quiz</span>
        </NeonButton>
      )}
    </NavWrapper>
  );
};

export default NavigationButtons;
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 25rem;
  margin-top: 24px;
  width: 100%;
`;


const NeonButton = styled.button`
flex: 0 0 auto; 
  width: auto;    
  min-width: 120px; 
  --main-size: 1rem; 
  --color-text: #ffffff;
  --color-background: #b026ff;
  --color-background-hover: #ca3dff;
  --color-outline: rgba(176, 38, 255, 0.4);
  --color-shadow: rgba(0, 0, 0, 0.4);

  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 999px;
  padding: 0.55em 1em; 
  font-family: "Poppins", sans-serif;
  font-weight: 500; 
  font-size: var(--main-size);
  color: var(--color-text);
  background: var(--color-background);
  box-shadow: 0 0 0.15em 0 var(--color-background);
  transition: 0.3s ease;
  
  svg {
    height: 0.65em;
    fill: var(--color-text);
    transition: 0.3s ease;
  }

  &.prev {
    flex-direction: row-reverse;
    svg {
      transform: scaleX(-1);
      margin-left: 0.4em;
    }
  }

  &.next svg {
    margin-left: 0.4em;
  }

  &:hover:not(:disabled) {
    box-shadow: 0 0 0.6em 0 var(--color-background);
    background: var(--color-background-hover);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
