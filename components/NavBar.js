/**
 * NavBar Component
 * Navigation bar for moving between questions
 */

/**
 * NavBar Component
 * @param {Object} props - Component props
 * @param {number} props.currentQuestion - Current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @param {Function} props.onPrevQuestion - Callback for previous question
 * @param {Function} props.onNextQuestion - Callback for next question
 * @param {boolean} props.isLastQuestion - Whether this is the last question
 * @param {Function} props.onSubmit - Callback for submitting the test
 * @returns {string} HTML string for the navbar
 */
function NavBar(props) {
    const { currentQuestion, totalQuestions, onPrevQuestion, onNextQuestion, isLastQuestion, onSubmit } = props;
    
    const canGoBack = currentQuestion > 1;
    const canGoNext = currentQuestion < totalQuestions;
    
    return `
        <nav class="navbar">
            <button 
                class="navbar__button navbar__button--prev ${!canGoBack ? 'disabled' : ''}" 
                onclick="goToPreviousQuestion()"
                ${!canGoBack ? 'disabled' : ''}
            >
                ← Trước
            </button>
            
            <div class="navbar__info">
                <span class="navbar__progress">
                    ${currentQuestion}/${totalQuestions}
                </span>
            </div>
            
            ${isLastQuestion ? `
                <button 
                    class="navbar__button navbar__button--submit"
                    onclick="submitTest()"
                >
                    Nộp bài ✓
                </button>
            ` : `
                <button 
                    class="navbar__button navbar__button--next"
                    onclick="goToNextQuestion()"
                >
                    Sau →
                </button>
            `}
        </nav>
    `;
}
