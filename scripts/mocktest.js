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
        ,
        answer: 'B'
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
        ,
        answer: 'C'
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
        ,
        answer: 'B'
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
    const total = questionsData.length;
    const answeredCount = Object.keys(selected).length;

    // Calculate score
    let correctCount = 0;
    const breakdown = questionsData.map((q, idx) => {
        const user = selected[idx] || null;
        const correct = q.answer || null;
        const isCorrect = user && correct && user === correct;
        if (isCorrect) correctCount += 1;
        return {
            id: q.id,
            question: q.question,
            userAnswer: user,
            correctAnswer: correct,
            isCorrect
        };
    });

    console.log('Submitting test with answers:', selected);
    console.log('Score breakdown:', breakdown);

    // Store results in state for rendering
    window.__mocktest_results = {
        total,
        answeredCount,
        correctCount,
        breakdown
    };

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
        // Show scored results with breakdown
        const results = window.__mocktest_results || { total: questionsData.length, answeredCount: 0, correctCount: 0, breakdown: [] };

        const breakdownHTML = results.breakdown.map((b, i) => {
            return `
                <div style="padding:0.75rem; border-radius:8px; margin-bottom:0.5rem; background:${b.isCorrect ? '#e6ffed' : '#fff0f0'}; border:1px solid ${b.isCorrect ? '#b7eb8f' : '#f5c6cb'};">
                    <div style="font-weight:700;">Q${i+1}: ${b.question}</div>
                    <div>Đáp án của bạn: <strong>${b.userAnswer || 'Chưa chọn'}</strong> — Đáp án đúng: <strong>${b.correctAnswer || 'N/A'}</strong></div>
                </div>
            `;
        }).join('');

        const resultsHTML = `
            <div style="text-align: center; padding: 2rem; max-width:900px; margin:0 auto;">
                <h2>🎉 Kết Quả Bài Kiểm Tra</h2>
                <p style="font-size:1.1rem;">Bạn trả lời <strong>${results.answeredCount}</strong> / <strong>${results.total}</strong> câu.</p>
                <p style="font-size:1.2rem;">Số câu đúng: <strong>${results.correctCount}</strong> — Điểm: <strong>${Math.round((results.correctCount / results.total) * 100)}%</strong></p>

                <div style="text-align:left; margin-top:1.5rem;">
                    ${breakdownHTML}
                </div>

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
            selectedAnswer: selectedAnswer
        });
        
        const navBar = NavBar({
            currentQuestion: currentIndex + 1,
            totalQuestions: questionsData.length,
            isLastQuestion: currentIndex === questionsData.length - 1
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

