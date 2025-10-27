import React from 'react';
import './Choices.css';

const Choices = ({ choices, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="choices">
      <h4 className="choices__title">Chọn đáp án:</h4>
      <ul className="choices__list">
        {choices.map((choice, index) => {
          const choiceId = choice.letter || `choice-${index}`;
          const isSelected = selectedAnswer === choiceId;
          
          return (
            <li 
              key={choiceId} 
              className={`choices__item ${isSelected ? 'choices__item--selected' : ''}`}
              onClick={() => onAnswerSelect(choiceId)}
            >
              <div className="choices__radio">
                {isSelected && <span className="choices__radio-check">✓</span>}
              </div>
              <span className="choices__letter">{choice.letter}.</span>
              <span className="choices__text">{choice.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Choices;

