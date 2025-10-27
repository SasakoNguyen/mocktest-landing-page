/**
 * QuestionCard Component
 * Displays the current question information
 */

// React-like useState hook pattern
function useState(initialValue) {
    let state = initialValue;
    return [state, (newValue) => { state = newValue; }];
}

/**
 * QuestionCard Component
 * @param {Object} props - Component props
 * @param {Object} props.question - The question object
 * @param {number} props.questionNumber - Current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @returns {string} HTML string for the question card
 */
function QuestionCard(props) {
    const { question, questionNumber, totalQuestions } = props;
    
    return `
        <div class="question-card">
            <div class="question-card__header">
                <span class="question-card__number">
                    Câu ${questionNumber}/${totalQuestions}
                </span>
                ${question.type ? `<span class="question-card__type">${question.type}</span>` : ''}
            </div>
            <h3 class="question-card__question">${question.question}</h3>
            ${question.passage ? `<div class="question-card__passage">${question.passage}</div>` : ''}
            ${question.audioText ? `
                <div class="audio-player">
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">🎧 Audio:</div>
                    <div style="font-size: 0.9rem; color: #555;">${question.audioText}</div>
                </div>
            ` : ''}
        </div>
    `;
}