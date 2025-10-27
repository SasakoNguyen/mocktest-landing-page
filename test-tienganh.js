/**
 * MockTest English Test - 45 Questions
 * Includes Reading (15), Listening (15), and Writing (15) sections
 */

// Timer setup
let timeRemaining = 55 * 60; // 55 minutes in seconds
let timerInterval;
let isPaused = false;

// State management
let currentQuestionIndex = 0;
let selectedAnswers = {};
let currentSection = 'reading'; // reading, listening, writing

// All 45 questions organized by section
const questions = {
    reading: [
        // Reading Questions 1-15
        {id: 1, question: "Read the passage and answer: The Internet has revolutionized communication.", choices: [
            {letter: "A", text: "Changed completely"},
            {letter: "B", text: "Made worse"},
            {letter: "C", text: "Stopped"},
            {letter: "D", text: "Created"}
        ], passage: "The Internet has revolutionized communication. It allows people to connect instantly across vast distances."},
        
        {id: 2, question: "What does 'vast' mean in the passage?", choices: [
            {letter: "A", text: "Small"},
            {letter: "B", text: "Large"},
            {letter: "C", text: "Beautiful"},
            {letter: "D", text: "Empty"}
        ], passage: "The Internet has revolutionized communication. It allows people to connect instantly across vast distances."},
        
        {id: 3, question: "According to the text, the Internet:", choices: [
            {letter: "A", text: "Is expensive"},
            {letter: "B", text: "Allows instant communication"},
            {letter: "C", text: "Is difficult to use"},
            {letter: "D", text: "Has no benefits"}
        ], passage: "The Internet has revolutionized communication. It allows people to connect instantly across vast distances."},
        
        {id: 4, question: "Complete: He ____ to the store yesterday.", choices: [
            {letter: "A", text: "go"},
            {letter: "B", text: "goes"},
            {letter: "C", text: "went"},
            {letter: "D", text: "going"}
        ]},
        
        {id: 5, question: "What is the synonym of 'happy'?", choices: [
            {letter: "A", text: "Sad"},
            {letter: "B", text: "Angry"},
            {letter: "C", text: "Joyful"},
            {letter: "D", text: "Tired"}
        ]},
        
        {id: 6, question: "Choose the correct form: She ____ English every day.", choices: [
            {letter: "A", text: "study"},
            {letter: "B", text: "studies"},
            {letter: "C", text: "studied"},
            {letter: "D", text: "studying"}
        ]},
        
        {id: 7, question: "What does 'morning' mean?", choices: [
            {letter: "A", text: "Evening"},
            {letter: "B", text: "Afternoon"},
            {letter: "C", text: "Early part of the day"},
            {letter: "D", text: "Night"}
        ]},
        
        {id: 8, question: "Complete: I ____ hungry.", choices: [
            {letter: "A", text: "am"},
            {letter: "B", text: "is"},
            {letter: "C", text: "are"},
            {letter: "D", text: "be"}
        ]},
        
        {id: 9, question: "What is the plural of 'child'?", choices: [
            {letter: "A", text: "childs"},
            {letter: "B", text: "children"},
            {letter: "C", text: "childes"},
            {letter: "D", text: "childen"}
        ]},
        
        {id: 10, question: "Which is correct?", choices: [
            {letter: "A", text: "I go to school"},
            {letter: "B", text: "I am go to school"},
            {letter: "C", text: "I go school"},
            {letter: "D", text: "I going school"}
        ]},
        
        {id: 11, question: "Read: 'The cat is on the table.' Where is the cat?", choices: [
            {letter: "A", text: "Under the table"},
            {letter: "B", text: "On the table"},
            {letter: "C", text: "Next to the table"},
            {letter: "D", text: "Behind the table"}
        ]},
        
        {id: 12, question: "Choose the article: I have ___ apple.", choices: [
            {letter: "A", text: "a"},
            {letter: "B", text: "an"},
            {letter: "C", text: "the"},
            {letter: "D", text: "none"}
        ]},
        
        {id: 13, question: "What time is it when we say 'noon'?", choices: [
            {letter: "A", text: "12:00 AM"},
            {letter: "B", text: "12:00 PM"},
            {letter: "C", text: "6:00 AM"},
            {letter: "D", text: "6:00 PM"}
        ]},
        
        {id: 14, question: "Complete: They ____ playing soccer.", choices: [
            {letter: "A", text: "am"},
            {letter: "B", text: "is"},
            {letter: "C", text: "are"},
            {letter: "D", text: "be"}
        ]},
        
        {id: 15, question: "What does 'library' mean?", choices: [
            {letter: "A", text: "A place to borrow books"},
            {letter: "B", text: "A restaurant"},
            {letter: "C", text: "A school"},
            {letter: "D", text: "A hospital"}
        ]}
    ],
    
    listening: [
        // Listening Questions 16-30
        {id: 16, question: "Listen to the audio: 'Hello, how are you?' What is the greeting?", choices: [
            {letter: "A", text: "Goodbye"},
            {letter: "B", text: "Hello"},
            {letter: "C", text: "Thanks"},
            {letter: "D", text: "Sorry"}
        ], audioText: "Audio: Hello, how are you? I am fine, thank you."},
        
        {id: 17, question: "Listen and choose: 'My name is John.'", choices: [
            {letter: "A", text: "The name is Mary"},
            {letter: "B", text: "The name is John"},
            {letter: "C", text: "The name is Peter"},
            {letter: "D", text: "The name is Lisa"}
        ], audioText: "Audio: My name is John. I am from England."},
        
        {id: 18, question: "Listen to the time: 'It is three o'clock.' What time is it?", choices: [
            {letter: "A", text: "2:00"},
            {letter: "B", text: "3:00"},
            {letter: "C", text: "4:00"},
            {letter: "D", text: "5:00"}
        ], audioText: "Audio: What time is it? It is three o'clock."},
        
        {id: 19, question: "Listen: 'The weather is sunny today.'", choices: [
            {letter: "A", text: "Rainy"},
            {letter: "B", text: "Sunny"},
            {letter: "C", text: "Cloudy"},
            {letter: "D", text: "Windy"}
        ], audioText: "Audio: Look outside. The weather is sunny today. Let's go to the park."},
        
        {id: 20, question: "Listen to the number: 'I have five apples.'", choices: [
            {letter: "A", text: "Three"},
            {letter: "B", text: "Four"},
            {letter: "C", text: "Five"},
            {letter: "D", text: "Six"}
        ], audioText: "Audio: How many apples? I have five apples."},
        
        {id: 21, question: "Listen and identify the color: 'The sky is blue.'", choices: [
            {letter: "A", text: "Blue"},
            {letter: "B", text: "Green"},
            {letter: "C", text: "Red"},
            {letter: "D", text: "Yellow"}
        ], audioText: "Audio: Look at the sky. The sky is blue."},
        
        {id: 22, question: "Listen: 'I like to read books.'", choices: [
            {letter: "A", text: "Read books"},
            {letter: "B", text: "Watch TV"},
            {letter: "C", text: "Play games"},
            {letter: "D", text: "Cook food"}
        ], audioText: "Audio: What do you like to do? I like to read books."},
        
        {id: 23, question: "Listen to the direction: 'Turn left at the corner.'", choices: [
            {letter: "A", text: "Go straight"},
            {letter: "B", text: "Turn right"},
            {letter: "C", text: "Turn left"},
            {letter: "D", text: "Go back"}
        ], audioText: "Audio: To get to the store, turn left at the corner."},
        
        {id: 24, question: "Listen: 'I am hungry. Let's eat.'", choices: [
            {letter: "A", text: "Play"},
            {letter: "B", text: "Sleep"},
            {letter: "C", text: "Eat"},
            {letter: "D", text: "Run"}
        ], audioText: "Audio: I am hungry. Let's eat lunch together."},
        
        {id: 25, question: "Listen to the day: 'Today is Monday.'", choices: [
            {letter: "A", text: "Sunday"},
            {letter: "B", text: "Monday"},
            {letter: "C", text: "Tuesday"},
            {letter: "D", text: "Wednesday"}
        ], audioText: "Audio: What day is it today? Today is Monday."},
        
        {id: 26, question: "Listen: 'The cat is sleeping.'", choices: [
            {letter: "A", text: "Playing"},
            {letter: "B", text: "Sleeping"},
            {letter: "C", text: "Eating"},
            {letter: "D", text: "Running"}
        ], audioText: "Audio: Look at the cat. The cat is sleeping on the sofa."},
        
        {id: 27, question: "Listen and count: 'There are seven chairs.'", choices: [
            {letter: "A", text: "Five"},
            {letter: "B", text: "Six"},
            {letter: "C", text: "Seven"},
            {letter: "D", text: "Eight"}
        ], audioText: "Audio: Count the chairs. There are seven chairs in the room."},
        
        {id: 28, question: "Listen: 'I go to school by bus.'", choices: [
            {letter: "A", text: "By car"},
            {letter: "B", text: "By bus"},
            {letter: "C", text: "By bike"},
            {letter: "D", text: "By walking"}
        ], audioText: "Audio: How do you go to school? I go to school by bus."},
        
        {id: 29, question: "Listen to the emotion: 'I am happy today.'", choices: [
            {letter: "A", text: "Happy"},
            {letter: "B", text: "Sad"},
            {letter: "C", text: "Angry"},
            {letter: "D", text: "Tired"}
        ], audioText: "Audio: How are you feeling? I am happy today because it's my birthday."},
        
        {id: 30, question: "Listen: 'Please close the door.'", choices: [
            {letter: "A", text: "Open the door"},
            {letter: "B", text: "Close the door"},
            {letter: "C", text: "Clean the door"},
            {letter: "D", text: "Paint the door"}
        ], audioText: "Audio: It's cold. Please close the door."}
    ],
    
    writing: [
        // Writing Questions 31-45
        {id: 31, question: "Choose the correct spelling:", choices: [
            {letter: "A", text: "Recieve"},
            {letter: "B", text: "Recieive"},
            {letter: "C", text: "Receive"},
            {letter: "D", text: "Receieve"}
        ]},
        
        {id: 32, question: "Complete the sentence: I ____ to the beach yesterday.", choices: [
            {letter: "A", text: "go"},
            {letter: "B", text: "went"},
            {letter: "C", text: "gone"},
            {letter: "D", text: "going"}
        ]},
        
        {id: 33, question: "Correct the sentence: 'She don't like coffee.'", choices: [
            {letter: "A", text: "She doesn't like coffee."},
            {letter: "B", text: "She not like coffee."},
            {letter: "C", text: "She don't likes coffee."},
            {letter: "D", text: "She no like coffee."}
        ]},
        
        {id: 34, question: "Choose the correct punctuation:", choices: [
            {letter: "A", text: "Hello, how are you."},
            {letter: "B", text: "Hello how are you?"},
            {letter: "C", text: "Hello, how are you?"},
            {letter: "D", text: "Hello. how are you?"}
        ]},
        
        {id: 35, question: "Fix: 'He eat breakfast every morning.'", choices: [
            {letter: "A", text: "He eats breakfast every morning."},
            {letter: "B", text: "He is eat breakfast every morning."},
            {letter: "C", text: "He eating breakfast every morning."},
            {letter: "D", text: "He eat breakfasts every morning."}
        ]},
        
        {id: 36, question: "Spelling: Which is correct?", choices: [
            {letter: "A", text: "Beautiful"},
            {letter: "B", text: "Beutiful"},
            {letter: "C", text: "Beautifull"},
            {letter: "D", text: "Beautiiful"}
        ]},
        
        {id: 37, question: "Complete: 'Can you ____ me the book?'", choices: [
            {letter: "A", text: "give"},
            {letter: "B", text: "gave"},
            {letter: "C", text: "giving"},
            {letter: "D", text: "given"}
        ]},
        
        {id: 38, question: "Correct: 'The dogs is playing.'", choices: [
            {letter: "A", text: "The dogs are playing."},
            {letter: "B", text: "The dogs was playing."},
            {letter: "C", text: "The dog is playing."},
            {letter: "D", text: "The dogs being playing."}
        ]},
        
        {id: 39, question: "Spelling: Which is wrong?", choices: [
            {letter: "A", text: "Tomorrow"},
            {letter: "B", text: "Tommorow"},
            {letter: "C", text: "Yesterday"},
            {letter: "D", text: "Today"}
        ]},
        
        {id: 40, question: "Complete: 'She ____ to music every day.'", choices: [
            {letter: "A", text: "listen"},
            {letter: "B", text: "listens"},
            {letter: "C", text: "listened"},
            {letter: "D", text: "listening"}
        ]},
        
        {id: 41, question: "Fix: 'They was happy yesterday.'", choices: [
            {letter: "A", text: "They were happy yesterday."},
            {letter: "B", text: "They was happy yesterday."},
            {letter: "C", text: "They is happy yesterday."},
            {letter: "D", text: "They are happy yesterday."}
        ]},
        
        {id: 42, question: "Spelling: Which is correct?", choices: [
            {letter: "A", text: "Exercise"},
            {letter: "B", text: "Excersise"},
            {letter: "C", text: "Exersice"},
            {letter: "D", text: "Excerise"}
        ]},
        
        {id: 43, question: "Complete: 'I ____ my homework last night.'", choices: [
            {letter: "A", text: "do"},
            {letter: "B", text: "did"},
            {letter: "C", text: "done"},
            {letter: "D", text: "doing"}
        ]},
        
        {id: 44, question: "Correct: 'He have a big house.'", choices: [
            {letter: "A", text: "He has a big house."},
            {letter: "B", text: "He have a big houses."},
            {letter: "C", text: "He having a big house."},
            {letter: "D", text: "He is have a big house."}
        ]},
        
        {id: 45, question: "Spelling: Choose the correct word:", choices: [
            {letter: "A", text: "Separation"},
            {letter: "B", text: "Seperation"},
            {letter: "C", text: "Separasion"},
            {letter: "D", text: "Separashion"}
        ]}
    ]
};

// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            updateTimerDisplay();
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert('Hết giờ! Bài kiểm tra kết thúc.');
                submitTest();
            }
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById('timer');
    
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Change color based on time
    if (timeRemaining <= 300) { // Less than 5 minutes
        timerElement.className = 'timer timer-danger';
    } else if (timeRemaining <= 600) { // Less than 10 minutes
        timerElement.className = 'timer timer-warning';
    }
}

// Get current question based on index
function getCurrentQuestion() {
    const qIndex = currentQuestionIndex;
    
    if (qIndex < 15) {
        currentSection = 'reading';
        return questions.reading[qIndex];
    } else if (qIndex < 30) {
        currentSection = 'listening';
        return questions.listening[qIndex - 15];
    } else {
        currentSection = 'writing';
        return questions.writing[qIndex - 30];
    }
}

// Render question
function renderQuestion() {
    const question = getCurrentQuestion();
    const contentDiv = document.getElementById('testContent');
    
    // Create section header
    let sectionHTML = '';
    if (currentQuestionIndex === 0 || currentQuestionIndex === 15 || currentQuestionIndex === 30) {
        const sectionName = currentSection === 'reading' ? '📖 Reading (Đọc)' :
                           currentSection === 'listening' ? '🎧 Listening (Nghe)' : '✍️ Writing (Viết)';
        
        sectionHTML = `<div class="section-header">${sectionName}</div>`;
    }
    
    // Build question HTML
    let passageHTML = '';
    if (question.passage) {
        passageHTML = `<div class="question-card__passage">${question.passage}</div>`;
    }
    
    let audioHTML = '';
    if (question.audioText) {
        audioHTML = `
            <div class="audio-player">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">🎧 Audio:</div>
                <div style="font-size: 0.9rem; color: #555;">${question.audioText}</div>
                <audio controls>
                    <source src="#" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    }
    
    // Build choices HTML
    let choicesHTML = '';
    const currentAnswer = selectedAnswers[currentQuestionIndex];
    
    question.choices.forEach((choice, index) => {
        const choiceId = `${currentQuestionIndex}-${index}`;
        const isSelected = currentAnswer === choice.letter;
        
        choicesHTML += `
            <li class="choices__item ${isSelected ? 'selected' : ''}" onclick="selectAnswer('${choice.letter}')">
                <div class="choices__radio">
                    ${isSelected ? '<span class="choices__radio-check">✓</span>' : ''}
                </div>
                <span class="choices__letter">${choice.letter}.</span>
                <span class="choices__text">${choice.text}</span>
            </li>
        `;
    });
    
    contentDiv.innerHTML = `
        ${sectionHTML}
        <div class="question-card">
            <div class="question-card__header">
                <span class="question-card__number">Câu ${currentQuestionIndex + 1}/45</span>
                <span class="question-card__type">${currentSection.toUpperCase()}</span>
            </div>
            <h3 class="question-card__question">${question.question}</h3>
            ${passageHTML}
            ${audioHTML}
        </div>
        
        <div class="choices">
            <h4 class="choices__title">Chọn đáp án:</h4>
            <ul class="choices__list">
                ${choicesHTML}
            </ul>
        </div>
        
        <nav class="navbar">
            <button class="navbar__button navbar__button--prev ${currentQuestionIndex === 0 ? 'disabled' : ''}" 
                    onclick="goToPreviousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                ← Trước
            </button>
            
            <div class="navbar__info">
                <span class="navbar__progress">${currentQuestionIndex + 1}/45</span>
            </div>
            
            ${currentQuestionIndex === 44 ? `
                <button class="navbar__button navbar__button--submit" onclick="submitTest()">
                    Nộp bài ✓
                </button>
            ` : `
                <button class="navbar__button navbar__button--next" onclick="goToNextQuestion()">
                    Sau →
                </button>
            `}
        </nav>
    `;
}

// Select answer
function selectAnswer(choiceLetter) {
    selectedAnswers[currentQuestionIndex] = choiceLetter;
    renderQuestion();
    console.log(`Answer selected: ${choiceLetter} for question ${currentQuestionIndex + 1}`);
}

// Navigate
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < 44) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

// Submit test
function submitTest() {
    clearInterval(timerInterval);
    
    // Calculate score
    let correctCount = 0;
    for (let i = 0; i < 45; i++) {
        const question = i < 15 ? questions.reading[i] : 
                        i < 30 ? questions.listening[i - 15] : 
                        questions.writing[i - 30];
        
        // For demo purposes, assume some answers are correct
        if (selectedAnswers[i]) correctCount++;
    }
    
    const score = Math.round((correctCount / 45) * 100);
    
    // Show results
    const results = `Kết quả bài kiểm tra!\n\n` +
                    `Điểm: ${score}/100\n` +
                    `Số câu trả lời: ${Object.keys(selectedAnswers).length}/45\n` +
                    `Thời gian còn lại: ${Math.floor(timeRemaining / 60))}:${String(timeRemaining % 60).padStart(2, '0')}\n\n` +
                    `Bạn đã hoàn thành bài kiểm tra Tiếng Anh!`;
    
    alert(results);
    
    // Navigate back to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Navigation
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

// Initialize
window.onload = function() {
    // Get username
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    if (username) {
        document.getElementById('displayUsername').textContent = username;
    }
    
    // Start timer
    startTimer();
    
    // Render first question
    renderQuestion();
    
    console.log('English Test initialized - 45 questions loaded');
};

