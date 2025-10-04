import React from "react";
import styled from "styled-components";

interface ThemedSliderProps {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  description?: string;
}

const ThemedSlider: React.FC<ThemedSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  description,
}) => {
  return (
    <Wrapper>
      {label && (
        <label className="slider-label">
          {label} <strong>{value}</strong>
        </label>
      )}

      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />

      {description && <p className="slider-description">{description}</p>}
    </Wrapper>
  );
};

export default ThemedSlider;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .slider-label {
    font-size: 0.95rem;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(43deg, #4158D0, #C850C0, #FFCC70);
    outline: none;
    opacity: 0.9;
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1;
  }

  /* Webkit (Chrome, Edge, Safari) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(160deg, #4900f5, #80D0C7);
    box-shadow: 0px 0px 10px rgba(100, 100, 255, 0.6);
    cursor: pointer;
  }

  /* Firefox */
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(160deg, #4900f5, #80D0C7);
    cursor: pointer;
  }

  .slider-description {
    margin: 0;
    font-size: 0.9rem;
    color: #888;
  }
`;
