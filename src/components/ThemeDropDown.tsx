import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  theme: "light" | "dark";
}

const ThemedDropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const { theme } = useQuiz();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef} $theme={theme}>
      <button className="dropdown-btn" onClick={() => setOpen((o) => !o)}>
        {value} ▾
      </button>

      {open && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className="dropdown-item"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};


export default ThemedDropdown;


const Wrapper = styled.div<{ $theme: "light" | "dark" }>`
  position: relative;
  width: fit-content;
  margin: 0 auto; 

  .dropdown-btn {
    padding: 10px 20px;
    border-radius: 12px;
    border: 2px solid ${({ $theme }) => ($theme === "dark" ? "#444" : "#ccc")}; /* ✅ Visible border */
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
    background: ${({ $theme }) => ($theme === "dark" ? "#1C1A1C" : "#f0f0f0")};
    color: ${({ $theme }) => ($theme === "dark" ? "#ffffff" : "#000")};
  }

  .dropdown-btn:hover {
  background: ${({ $theme }) => ($theme === "dark" ? "linear-gradient(0deg,#A47CF3,#683FEA)" : "#1C1A1C")};

    color:${({ $theme }) => ($theme === "dark" ? "#1C1A1C" : "#fff")};
    border-color: transparent; /* optional: remove border on hover */
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: ${({ $theme }) => ($theme === "dark" ? "#1C1A1C" : "#fff")};
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-radius: 12px;
    margin-top: 6px;
    overflow: hidden;
    z-index: 10;
    padding: 0;
  }

  .dropdown-item {
    padding: 10px 20px;
    cursor: pointer;
    list-style: none;
    transition: 0.3s;
    color: ${({ $theme }) => ($theme === "dark" ? "#fff" : "#000")};
  }

  .dropdown-item:hover {
    background: ${({ $theme }) => ($theme === "dark" ? "linear-gradient(0deg,#A47CF3,#683FEA)" : "#1C1A1C")};

    color:${({ $theme }) => ($theme === "dark" ? "#1C1A1C" : "#fff")};
    font-weight: 400;
  }
`;
