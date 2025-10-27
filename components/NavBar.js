import React from 'react';
import './NavBar.css';

const NavBar = ({ currentQuestion, totalQuestions, onPrevQuestion, onNextQuestion, isLastQuestion, onSubmit }) => {
  const canGoBack = currentQuestion > 1;
  const canGoNext = currentQuestion < totalQuestions;

  return (
    <nav className="navbar">
      <button 
        className={`navbar__button navbar__button--prev ${!canGoBack ? 'navbar__button--disabled' : ''}`}
        onClick={onPrevQuestion}
        disabled={!canGoBack}
      >
        ← Trước
      </button>
      
      <div className="navbar__info">
        <span className="navbar__progress">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>
      
      {isLastQuestion ? (
        <button 
          className="navbar__button navbar__button--submit"
          onClick={onSubmit}
        >
          Nộp bài ✓
        </button>
      ) : (
        <button 
          className="navbar__button navbar__button--next"
          onClick={onNextQuestion}
          disabled={!canGoNext}
        >
          Sau →
        </button>
      )}
    </nav>
  );
};

export default NavBar;

