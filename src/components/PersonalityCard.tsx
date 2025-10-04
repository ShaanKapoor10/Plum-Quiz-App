import React, { type FC } from 'react';


const ProfessionalIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="8" y1="15" x2="16" y2="15"></line>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const StorytellerIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const SarcasticIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 15c1.5-1.5 4-1.5 4 0"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const ChildIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <path d="M9 9L8 8"></path>
    <path d="M15 9L16 8"></path>
  </svg>
);


export const getPersonalityIcon = (name: string) => {
  switch (name) {
    case 'The Professional Quizmaster': return ProfessionalIcon;
    case 'The Storyteller': return StorytellerIcon;
    case 'The Sarcastic Rival': return SarcasticIcon;
    case 'The Enthusiastic Child': return ChildIcon;
    default: return ProfessionalIcon;
  }
};


interface PersonalityCardProps {
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const PersonalityCard: FC<PersonalityCardProps> = ({ name, description, isSelected, onClick }) => {
  const Icon = getPersonalityIcon(name);

  return (
    <div 
      className={`personality-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="personality-card-icon">
        <Icon className="icon-svg" />
      </div>
      <h3 className="personality-card-title">{name}</h3>
      <p className="personality-card-description">{description}</p>
    </div>
  );
};

export default PersonalityCard;
