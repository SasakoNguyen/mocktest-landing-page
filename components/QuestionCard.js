import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, questionNumber, totalQuestions }) => {
  return (
    <div className="question-card">
      <div className="question-card__header">
        <span className="question-card__number">
          Câu {questionNumber}/{totalQuestions}
        </span>
      </div>
      <h3 className="question-card__question">{question.question}</h3>
      <div className="question-card__metadata">
        <span className="question-card__points">Điểm: {question.points}</span>
        <span className="question-card__time">⏱️ {question.timeLimit}s</span>
      </div>
    </div>
  );
};

export default QuestionCard;

