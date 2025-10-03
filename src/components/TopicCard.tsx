import React, { useMemo } from "react";
import styled from "styled-components";

interface TopicCardProps {
  title: string;
  tagline: string;
  theme: "light" | "dark";
  onClick: () => void;
}

const gradientsDark = [
  "linear-gradient(135deg, #00c6ff, #0072ff)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #7f00ff, #e100ff)",
  "linear-gradient(135deg, #ff9966, #ff5e62)",
  "linear-gradient(135deg, #36d1dc, #5b86e5)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
];

const gradientsLight = [
  "linear-gradient(135deg, #f6d365, #fda085)",
  "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
  "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
  "linear-gradient(135deg, #84fab0, #8fd3f4)",
  "linear-gradient(135deg, #ffecd2, #fcb69f)",
  "linear-gradient(135deg, #d4fc79, #96e6a1)",
];

const TopicCard: React.FC<TopicCardProps> = ({ title, tagline, theme, onClick }) => {
 
  const gradient = useMemo(() => {
    const pool = theme === "dark" ? gradientsDark : gradientsLight;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [theme]);

  return (
    <StyledWrapper onClick={onClick}>
      <div className="card">
        <div className="card-inner">
          <div className="card-front" style={{ background: gradient }}>
            <h3>{title}</h3>
          </div>
          <div className="card-back" style={{ background: gradient }}>
            <p>{tagline}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 220px;
    height: 140px;
    perspective: 1000px;
    cursor: pointer;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s;
    border-radius: 12px;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    color: #fff;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    padding: 10px;
    text-align: center;
  }

  .card-front {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .card-back {
    transform: rotateY(180deg);
    font-size: 1rem;
  }
    

`;

export default TopicCard;
