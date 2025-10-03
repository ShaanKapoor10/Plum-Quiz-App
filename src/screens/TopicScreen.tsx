import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import Card from "../components/GlowCard";
import TopicCard from "../components/TopicCard";
import GenerateButton from "../components/GenerateButton";
import CustomInput from "../components/CustomInput";
import ThemedDropdown from "../components/ThemeDropDown";

const topics = [
  { title: "Space Exploration", tagline: "Think you’re smarter than NASA?" },
  { title: "World History", tagline: "Can you rewrite the past correctly?" },
  { title: "Artificial Intelligence", tagline: "Dare to outsmart the machines?" },
  { title: "Mythology", tagline: "Legends or facts—can you tell apart?" },
  { title: "Cinema & TV", tagline: "Are you the ultimate binge-watcher?" },
  { title: "Human Anatomy", tagline: "Test your body knowledge—literally." },
  { title: "Indian Polity", tagline: "Democracy quiz for real citizens!" },
  { title: "Logical Reasoning", tagline: "Crack the puzzles, beat the odds." },
  { title: "Physics", tagline: "Do Newton and Einstein approve?" },
  { title: "Marvel Universe", tagline: "Avengers-level trivia awaits!" },
  { title: "Geography", tagline: "World traveler or map struggler?" },
  { title: "Wildlife", tagline: "Do you really know the animal kingdom?" },
  { title: "Astronomy", tagline: "Stargazer or space cadet?" },
  { title: "Business & Startups", tagline: "Can you pitch your way through trivia?" },
  { title: "Sports Legends", tagline: "GOAT-level trivia for fans!" },
  { title: "Programming", tagline: "Debug your brain in this quiz." },
  { title: "Anime & Manga", tagline: "Only true otakus will survive." },
  { title: "Psychology", tagline: "Mind games—are you ready?" },
  { title: "Music", tagline: "Hit the right notes in this quiz!" },
  { title: "Literature", tagline: "Bookworm or bluff master?" },
];

const TopicScreen = () => {
  const [customTopic, setCustomTopic] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const { startQuiz } = useQuiz();

  const handleStartQuiz = (topicToUse: string) => {
    if (!topicToUse.trim()) {
      alert("Please select or enter a topic!");
      return;
    }
    startQuiz(topicToUse, selectedModel);
  };

 
  const theme: "light" | "dark" = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return (
    <div style={{ display: "flex" }}>
      <Card
        align="start"
        style={{
          borderRadius: "10px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          className="card-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold" }}>Create Your Quiz</h1>

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="model-select">Choose AI Model:</label>
            <ThemedDropdown
                value={selectedModel}
                theme={theme} 
                onChange={setSelectedModel}
                options={[
                  "gemini-2.5-flash",
                  "gemini-2.5-pro"
                ]}
              />



          </div>

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="custom-topic">Enter a Custom Topic:</label>
            <CustomInput
              id="custom-topic"
              placeholder="e.g., The Roman Empire"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />

            
            <GenerateButton
              onClick={() => handleStartQuiz(customTopic)}
              disabled={!customTopic.trim()}
              ariaLabel="Generate custom quiz"
            />
          </div>

          <div className="divider" style={{ textAlign: "center", fontWeight: "bold" }}>OR</div>

          <div
            className="topic-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              justifyItems: "center",
            }}
          >
            {topics.map((t) => (
              <TopicCard
                key={t.title}
                title={t.title}
                tagline={t.tagline}
                theme={theme}
                onClick={() => handleStartQuiz(t.title)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TopicScreen;
