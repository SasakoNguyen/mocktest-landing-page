/**
 * MockTest Demo - Using Components with useState Pattern
 */

// Custom useState implementation
let renderCallback = null;

function useState(initialValue) {
    let state = initialValue;
    
    const listeners = new Set();
    
    function setState(newValue) {
        const valueToSet = typeof newValue === 'function' ? newValue(state) : newValue;
        state = valueToSet;
        
        // Trigger re-render
        if (renderCallback) {
            renderCallback();
        }
        
        // Update debug display
        updateStateDebug();
    }
    
    function getState() {
        return state;
    }
    
    return [getState, setState];
}

// Sample questions data
const questionsData = [
    {
        id: 1,
        question: "Tính giá trị biểu thức: 2 + 2 = ?",
        choices: [
            {letter: "A", text: "3"},
            {letter: "B", text: "4"},
            {letter: "C", text: "5"},
            {letter: "D", text: "6"}
        ]
    },
    {
        id: 2,
        question: "Giải phương trình: x - 3 = 5. Tìm x?",
        choices: [
            {letter: "A", text: "6"},
            {letter: "B", text: "7"},
            {letter: "C", text: "8"},
            {letter: "D", text: "9"}
        ]
    },
    {
        id: 3,
        question: "Đạo hàm của hàm số f(x) = x² là?",
        choices: [
            {letter: "A", text: "x"},
            {letter: "B", text: "2x"},
            {letter: "C", text: "x²"},
            {letter: "D", text: "2x²"}
        ]
    }
];

// State management with useState
const [getCurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [getSelectedAnswers, setSelectedAnswers] = useState({});
const [getShowResults, setShowResults] = useState(false);

// Get current question
function getCurrentQuestion() {
    return questionsData[getCurrentQuestionIndex()];
}

// Select answer handler
function handleAnswerSelect(choiceLetter) {
    const currentIndex = getCurrentQuestionIndex();
    const newSelectedAnswers = { ...getSelectedAnswers() };
    newSelectedAnswers[currentIndex] = choiceLetter;
    setSelectedAnswers(newSelectedAnswers);
    
    console.log(`Answer selected: ${choiceLetter} for question ${currentIndex + 1}`);
    console.log('Current state:', {
        currentQuestion: currentIndex + 1,
        selectedAnswer: choiceLetter,
        totalQuestions: questionsData.length
    });
}

// Navigation handlers
function handlePrevQuestion() {
    const current = getCurrentQuestionIndex();
    if (current > 0) {
        setCurrentQuestionIndex(current - 1);
    }
}

function handleNextQuestion() {
    const current = getCurrentQuestionIndex();
    if (current < questionsData.length - 1) {
        setCurrentQuestionIndex(current + 1);
    }
}

function handleSubmit() {
    const selected = getSelectedAnswers();
    const selectedCount = Object.keys(selected).length;
    
    console.log('Submitting test with answers:', selected);
    
    alert(`Bài kiểm tra đã được nộp!\n\nBạn đã trả lời: ${selectedCount}/${questionsData.length} câu hỏi.\n\nKiểm tra console để xem chi tiết state.`);
    
    setShowResults(true);
    renderApp();
}

// Update state debug display
function updateStateDebug() {
    const stateDebug = document.getElementById('stateDebug');
    const currentIndex = getCurrentQuestionIndex();
    const selected = getSelectedAnswers();
    
    stateDebug.innerHTML = `
        <strong>State Debug:</strong><br>
        Current Question: ${currentIndex + 1} / ${questionsData.length}<br>
        Selected Answer for Q${currentIndex + 1}: ${selected[currentIndex] || 'Chưa chọn'}<br>
        Total Selected: ${Object.keys(selected).length} / ${questionsData.length}<br>
        Selected Answers: ${JSON.stringify(selected)}
    `;
}

// Render function
function renderApp() {
    const app = document.getElementById('app');
    
    if (getShowResults()) {
        // Show results
        const selected = getSelectedAnswers();
        const resultsHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h2>🎉 Kết Quả Bài Kiểm Tra</h2>
                <p>Số câu trả lời: ${Object.keys(selected).length} / ${questionsData.length}</p>
                <div style="margin-top: 2rem;">
                    <button 
                        style="padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                               color: white; border: none; border-radius: 25px; font-size: 1rem; 
                               font-weight: bold; cursor: pointer;"
                        onclick="resetTest()">
                        Làm Lại
                    </button>
                </div>
            </div>
        `;
        app.innerHTML = resultsHTML;
    } else {
        const question = getCurrentQuestion();
        const currentIndex = getCurrentQuestionIndex();
        const selectedAnswer = getSelectedAnswers()[currentIndex];
        
        // Create component instances
        const questionCard = QuestionCard({
            question: question,
            questionNumber: currentIndex + 1,
            totalQuestions: questionsData.length
        });
        
        const choices = Choices({
            choices: question.choices,
            selectedAnswer: selectedAnswer,
            questionIndex: currentIndex
        });
        
        const navBar = NavBar({
            currentQuestion: currentIndex + 1,
            totalQuestions: questionsData.length,
            onPrevQuestion: handlePrevQuestion,
            onNextQuestion: handleNextQuestion,
            isLastQuestion: currentIndex === questionsData.length - 1,
            onSubmit: handleSubmit
        });
        
        app.innerHTML = questionCard + choices + navBar;
    }
    
    updateStateDebug();
}

// Reset test function
function resetTest() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    renderApp();
}

// Setup event handlers as global functions
window.handleAnswerSelect = function(choiceLetter) {
    const currentIndex = getCurrentQuestionIndex();
    const newSelectedAnswers = { ...getSelectedAnswers() };
    newSelectedAnswers[currentIndex] = choiceLetter;
    setSelectedAnswers(newSelectedAnswers);
    renderApp();
};

window.goToPreviousQuestion = function() {
    handlePrevQuestion();
    renderApp();
};

window.goToNextQuestion = function() {
    handleNextQuestion();
    renderApp();
};

window.submitTest = function() {
    handleSubmit();
};

window.resetTest = resetTest;

// Initialize app
function init() {
    renderCallback = renderApp;
    renderApp();
    
    console.log('MockTest Demo initialized with useState pattern');
    console.log('Components loaded:', {
        QuestionCard: typeof QuestionCard,
        Choices: typeof Choices,
        NavBar: typeof NavBar
    });
}

// Start app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

