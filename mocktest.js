/**
 * MockTest Page - State Management with useState pattern
 */

// useState implementation (custom hook pattern)
function useState(initialValue) {
  let state = initialValue;
  
  function setState(newValue) {
    state = typeof newValue === 'function' ? newValue(state) : newValue;
    render();
  }
  
  return [state, setState];
}

// Mock data for questions
const questions = [
  {
    id: 1,
    question: "Tính giá trị của biểu thức: 15 + 7 × 3 = ?",
    choices: [
      { letter: "A", text: "36", value: 36 },
      { letter: "B", text: "50", value: 50 },
      { letter: "C", text: "66", value: 66 },
      { letter: "D", text: "72", value: 72 }
    ],
    points: 1,
    timeLimit: 60,
    correctAnswer: "C"
  },
  {
    id: 2,
    question: "Giải phương trình: 2x + 5 = 15",
    choices: [
      { letter: "A", text: "x = 5", value: 5 },
      { letter: "B", text: "x = 10", value: 10 },
      { letter: "C", text: "x = 20", value: 20 },
      { letter: "D", text: "x = 25", value: 25 }
    ],
    points: 2,
    timeLimit: 90,
    correctAnswer: "A"
  },
  {
    id: 3,
    question: "Tính diện tích hình chữ nhật có chiều dài 8cm và chiều rộng 5cm:",
    choices: [
      { letter: "A", text: "13 cm²", value: 13 },
      { letter: "B", text: "26 cm²", value: 26 },
      { letter: "C", text: "40 cm²", value: 40 },
      { letter: "D", text: "80 cm²", value: 80 }
    ],
    points: 2,
    timeLimit: 90,
    correctAnswer: "C"
  }
];

// State variables (using useState pattern)
let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
let [selectedAnswers, setSelectedAnswers] = useState({});
let [isSubmitted, setIsSubmitted] = useState(false);

let currentQuestion = questions[currentQuestionIndex];
let totalQuestions = questions.length;

/**
 * Render function - updates UI based on state
 */
function render() {
  // Update current question
  currentQuestion = questions[currentQuestionIndex];
  
  // Update question display
  document.getElementById('questionNumber').textContent = 
    `Câu ${currentQuestionIndex + 1}/${totalQuestions}`;
  document.getElementById('questionText').textContent = currentQuestion.question;
  
  // Render choices
  renderChoices();
  
  // Update navbar
  updateNavBar();
  
  // Debug: log state
  console.log('State updated:', {
    currentQuestion: currentQuestionIndex + 1,
    selectedAnswer: selectedAnswers[currentQuestionIndex] || 'Not selected',
    totalQuestions: totalQuestions
  });
}

/**
 * Render choices for current question
 */
function renderChoices() {
  const choicesList = document.getElementById('choicesList');
  choicesList.innerHTML = '';
  
  const currentAnswer = selectedAnswers[currentQuestionIndex];
  
  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    const choiceId = `${currentQuestionIndex}-${index}`;
    const isSelected = currentAnswer === choice.letter;
    
    li.className = `choices__item ${isSelected ? 'selected' : ''}`;
    li.innerHTML = `
      <div class="choices__radio">
        ${isSelected ? '<span class="choices__radio-check">✓</span>' : ''}
      </div>
      <span class="choices__letter">${choice.letter}.</span>
      <span class="choices__text">${choice.text}</span>
    `;
    
    li.onclick = () => selectAnswer(choice.letter);
    choicesList.appendChild(li);
  });
}

/**
 * Update NavBar based on current position
 */
function updateNavBar() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progress = document.getElementById('progress');
  
  progress.textContent = `${currentQuestionIndex + 1}/${totalQuestions}`;
  
  // Update prev button
  if (currentQuestionIndex === 0) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }
  
  // Update next button
  if (currentQuestionIndex === totalQuestions - 1) {
    nextBtn.classList.remove('navbar__button--next');
    nextBtn.classList.add('navbar__button--submit');
    nextBtn.textContent = 'Nộp bài ✓';
    nextBtn.onclick = handleSubmit;
  } else {
    nextBtn.classList.remove('navbar__button--submit');
    nextBtn.classList.add('navbar__button--next');
    nextBtn.textContent = 'Sau →';
    nextBtn.onclick = goToNextQuestion;
  }
}

/**
 * Select an answer for current question
 */
function selectAnswer(choiceLetter) {
  console.log('Answer selected:', choiceLetter, 'for question', currentQuestionIndex + 1);
  
  setSelectedAnswers({
    ...selectedAnswers,
    [currentQuestionIndex]: choiceLetter
  });
  
  render();
}

/**
 * Navigate to previous question
 */
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
}

/**
 * Navigate to next question
 */
function goToNextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
}

/**
 * Handle form submission
 */
function handleSubmit() {
  console.log('Final answers:', selectedAnswers);
  
  // Calculate score
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  const score = (correctCount / totalQuestions) * 100;
  
  // Show result
  if (confirm(`Bạn đã hoàn thành bài kiểm tra!\n\nĐiểm: ${score.toFixed(0)}/100 (${correctCount}/${totalQuestions} đúng)\n\nBạn có muốn xem đáp án?`)) {
    showAnswers();
  }
  
  setIsSubmitted(true);
}

/**
 * Show correct answers
 */
function showAnswers() {
  let results = 'ĐÁP ÁN:\n\n';
  questions.forEach((question, index) => {
    const userAnswer = selectedAnswers[index] || 'Chưa trả lời';
    const isCorrect = userAnswer === question.correctAnswer;
    const marker = isCorrect ? '✓' : '✗';
    
    results += `${index + 1}. ${question.question}\n`;
    results += `   Đáp án của bạn: ${userAnswer} ${marker}\n`;
    results += `   Đáp án đúng: ${question.correctAnswer}\n\n`;
  });
  
  alert(results);
}

/**
 * Navigation functions
 */
function goBack() {
  if (confirm('Bạn có chắc muốn rời khỏi bài kiểm tra? Tiến độ sẽ bị mất.')) {
    window.location.href = 'dashboard.html';
  }
}

function logout() {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    window.location.href = 'index.html';
  }
}

// Initialize page
window.onload = function() {
  // Get username from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  
  if (username) {
    document.getElementById('displayUsername').textContent = username;
  }
  
  // Initial render
  render();
  
  console.log('MockTest initialized with useState pattern');
};

