// Questions Page JavaScript with State Handling

// Current state
let currentState = 'idle'; // idle, loading, success, error, empty
let questionsData = [];

/**
 * Show specific state UI
 */
function showState(state) {
    // Hide all states
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    document.getElementById('questionsList').innerHTML = '';
    document.getElementById('questionsList').style.display = 'none';

    // Show the requested state
    switch(state) {
        case 'loading':
            document.getElementById('loadingState').style.display = 'block';
            break;
        case 'empty':
            document.getElementById('emptyState').style.display = 'block';
            break;
        case 'error':
            document.getElementById('errorState').style.display = 'block';
            break;
        case 'success':
            document.getElementById('questionsList').style.display = 'flex';
            break;
    }
    currentState = state;
}

/**
 * Fetch questions from questions.json
 */
async function fetchQuestions() {
    try {
        // Show loading state
        showState('loading');

        // Fetch data
        const response = await fetch('questions.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Wait a bit to show loading state (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if data is empty
        if (!data || data.length === 0) {
            showState('empty');
            return;
        }

        // Store data and render
        questionsData = data;
        renderQuestions(data);
        showState('success');
        
    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('errorMessage').textContent = 
            `Lỗi: ${error.message}. Vui lòng kiểm tra kết nối mạng hoặc đường dẫn file questions.json.`;
        showState('error');
    }
}

/**
 * Render questions to the page
 */
function renderQuestions(questions) {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        questionsList.appendChild(questionElement);
    });
}

/**
 * Create question element HTML
 */
function createQuestionElement(question, index) {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.innerHTML = `
        <div class="question-item__header">
            <div class="question-item__question">${question.question}</div>
            <button class="question-item__toggle" onclick="toggleAnswer(${index})">+</button>
        </div>
        <div class="question-item__answer" id="answer-${index}">
            ${question.answer}
        </div>
    `;
    return div;
}

/**
 * Toggle answer visibility
 */
function toggleAnswer(index) {
    const answerElement = document.getElementById(`answer-${index}`);
    const toggleButton = event.target;
    
    if (answerElement.classList.contains('show')) {
        answerElement.classList.remove('show');
        toggleButton.textContent = '+';
    } else {
        answerElement.classList.add('show');
        toggleButton.textContent = '−';
    }
}

/**
 * Navigation functions
 */
function goBack() {
    window.history.back();
}

function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        window.location.href = 'index.html';
    }
}

// Initialize page on load
window.onload = function() {
    // Get username from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    if (username) {
        document.getElementById('displayUsername').textContent = username;
    }
    
    // Fetch and display questions
    fetchQuestions();
};

