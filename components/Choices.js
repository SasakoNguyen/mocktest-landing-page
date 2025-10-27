/**
 * Choices Component
 * Displays answer choices and allows selection
 */

/**
 * Choices Component
 * @param {Object} props - Component props
 * @param {Array} props.choices - Array of choice objects
 * @param {string} props.selectedAnswer - The currently selected answer letter
 * @param {Function} props.onAnswerSelect - Callback function when an answer is selected
 * @param {number} props.questionIndex - Index of the current question
 * @returns {string} HTML string for the choices
 */
function Choices(props) {
    const { choices, selectedAnswer, onAnswerSelect, questionIndex } = props;
    
    const choicesHTML = choices.map((choice, index) => {
        const choiceId = choice.letter || `choice-${index}`;
        const isSelected = selectedAnswer === choice.letter;
        
        return `
            <li 
                class="choices__item ${isSelected ? 'selected' : ''}" 
                onclick="handleAnswerSelect('${choice.letter}')"
            >
                <div class="choices__radio">
                    ${isSelected ? '<span class="choices__radio-check">✓</span>' : ''}
                </div>
                <span class="choices__letter">${choice.letter}.</span>
                <span class="choices__text">${choice.text}</span>
            </li>
        `;
    }).join('');
    
    return `
        <div class="choices">
            <h4 class="choices__title">Chọn đáp án:</h4>
            <ul class="choices__list">
                ${choicesHTML}
            </ul>
        </div>
    `;
}
