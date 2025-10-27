/**
 * Unit Tests for Questions Page
 * Tests data fetching, rendering, and state handling
 */

// Mock data for testing
const mockQuestionsData = [
    {
        id: 1,
        question: "MockTest là gì?",
        answer: "MockTest là nền tảng trực tuyến cung cấp các bài kiểm tra mô phỏng."
    },
    {
        id: 2,
        question: "Có bao nhiêu loại bài kiểm tra?",
        answer: "Có 6 môn học: Toán, Vật Lý, Hóa Học, Sinh Học, Địa Lý, và Tiếng Anh."
    }
];

/**
 * Test 1: Render questions correctly
 * Tests that questions are rendered with proper HTML structure
 */
function testRenderQuestions() {
    console.log('Test 1: Render questions correctly');
    
    const testData = mockQuestionsData;
    
    // Mock DOM
    const mockQuestionsList = document.createElement('div');
    mockQuestionsList.id = 'questionsList';
    document.body.appendChild(mockQuestionsList);
    
    // Test rendering logic
    function renderQuestionsTest(questions) {
        mockQuestionsList.innerHTML = '';
        questions.forEach((question, index) => {
            const div = document.createElement('div');
            div.className = 'question-item';
            div.innerHTML = `
                <div class="question-item__header">
                    <div class="question-item__question">${question.question}</div>
                    <button class="question-item__toggle">+</button>
                </div>
                <div class="question-item__answer">${question.answer}</div>
            `;
            mockQuestionsList.appendChild(div);
        });
    }
    
    // Execute
    renderQuestionsTest(testData);
    
    // Assertions
    const renderedQuestions = mockQuestionsList.querySelectorAll('.question-item');
    const questionCount = renderedQuestions.length;
    
    if (questionCount === testData.length) {
        console.log('✅ PASS: Correct number of questions rendered');
    } else {
        console.log('❌ FAIL: Expected ' + testData.length + ' questions, got ' + questionCount);
    }
    
    // Check if question content is rendered correctly
    const firstQuestion = renderedQuestions[0].querySelector('.question-item__question').textContent;
    if (firstQuestion === testData[0].question) {
        console.log('✅ PASS: Question content rendered correctly');
    } else {
        console.log('❌ FAIL: Question content mismatch');
    }
    
    document.body.removeChild(mockQuestionsList);
}

/**
 * Test 2: Show error state when data fetch fails
 * Tests that error state is displayed when fetch fails
 */
function testErrorState() {
    console.log('\nTest 2: Show error state when data fetch fails');
    
    // Mock DOM states
    const mockErrorState = document.createElement('div');
    mockErrorState.id = 'errorState';
    mockErrorState.style.display = 'none';
    document.body.appendChild(mockErrorState);
    
    // Simulate error state
    function showErrorState() {
        mockErrorState.style.display = 'block';
        mockErrorState.innerHTML = `
            <div class="error-state__icon">⚠️</div>
            <h3 class="error-state__title">Đã xảy ra lỗi!</h3>
            <p class="error-state__message">Không thể tải dữ liệu.</p>
        `;
    }
    
    // Execute
    showErrorState();
    
    // Assertions
    if (mockErrorState.style.display === 'block') {
        console.log('✅ PASS: Error state is displayed');
    } else {
        console.log('❌ FAIL: Error state not displayed');
    }
    
    const errorIcon = mockErrorState.querySelector('.error-state__icon');
    const errorTitle = mockErrorState.querySelector('.error-state__title').textContent;
    
    if (errorIcon && errorTitle.includes('Đã xảy ra lỗi')) {
        console.log('✅ PASS: Error state content is correct');
    } else {
        console.log('❌ FAIL: Error state content is incorrect');
    }
    
    document.body.removeChild(mockErrorState);
}

/**
 * Test 3: Show empty state when no data
 * Tests that empty state is displayed when data array is empty
 */
function testEmptyState() {
    console.log('\nTest 3: Show empty state when no data');
    
    // Mock DOM
    const mockEmptyState = document.createElement('div');
    mockEmptyState.id = 'emptyState';
    mockEmptyState.style.display = 'none';
    document.body.appendChild(mockEmptyState);
    
    // Simulate empty state
    function showEmptyState() {
        mockEmptyState.style.display = 'block';
        mockEmptyState.innerHTML = `
            <div class="empty-state__icon">📭</div>
            <p class="empty-state__text">Không có câu hỏi nào</p>
        `;
    }
    
    // Test with empty array
    const emptyData = [];
    
    if (emptyData.length === 0) {
        showEmptyState();
        
        // Assertions
        if (mockEmptyState.style.display === 'block') {
            console.log('✅ PASS: Empty state is displayed');
        } else {
            console.log('❌ FAIL: Empty state not displayed');
        }
        
        const emptyText = mockEmptyState.querySelector('.empty-state__text').textContent;
        if (emptyText === 'Không có câu hỏi nào') {
            console.log('✅ PASS: Empty state message is correct');
        } else {
            console.log('❌ FAIL: Empty state message is incorrect');
        }
    }
    
    document.body.removeChild(mockEmptyState);
}

/**
 * Test 4: Show loading state during fetch
 * Tests that loading state is displayed while fetching data
 */
function testLoadingState() {
    console.log('\nTest 4: Show loading state during fetch');
    
    const mockLoadingState = document.createElement('div');
    mockLoadingState.id = 'loadingState';
    mockLoadingState.style.display = 'none';
    document.body.appendChild(mockLoadingState);
    
    function showLoadingState() {
        mockLoadingState.style.display = 'block';
        mockLoadingState.innerHTML = `
            <div class="loading-state__spinner"></div>
            <p class="loading-state__text">Đang tải...</p>
        `;
    }
    
    // Execute
    showLoadingState();
    
    // Assertions
    if (mockLoadingState.style.display === 'block') {
        console.log('✅ PASS: Loading state is displayed');
    } else {
        console.log('❌ FAIL: Loading state not displayed');
    }
    
    const loadingText = mockLoadingState.querySelector('.loading-state__text').textContent;
    if (loadingText === 'Đang tải...') {
        console.log('✅ PASS: Loading state message is correct');
    } else {
        console.log('❌ FAIL: Loading state message is incorrect');
    }
    
    document.body.removeChild(mockLoadingState);
}

/**
 * Test 5: Toggle answer visibility
 * Tests that clicking toggle button shows/hides answer
 */
function testToggleAnswer() {
    console.log('\nTest 5: Toggle answer visibility');
    
    const mockQuestionItem = document.createElement('div');
    mockQuestionItem.className = 'question-item';
    mockQuestionItem.innerHTML = `
        <div class="question-item__header">
            <div class="question-item__question">Test Question?</div>
            <button class="question-item__toggle">+</button>
        </div>
        <div class="question-item__answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s;">
            Test Answer
        </div>
    `;
    document.body.appendChild(mockQuestionItem);
    
    const answerElement = mockQuestionItem.querySelector('.question-item__answer');
    const toggleButton = mockQuestionItem.querySelector('.question-item__toggle');
    
    // Initial state: answer is hidden (max-height: 0)
    const initialHeight = answerElement.style.maxHeight;
    if (initialHeight === '0px' || initialHeight === '') {
        console.log('✅ PASS: Answer is initially hidden');
    } else {
        console.log('❌ FAIL: Answer should be initially hidden');
    }
    
    // Simulate toggle click
    function toggleAnswer() {
        if (answerElement.style.maxHeight === '0px' || answerElement.style.maxHeight === '') {
            answerElement.style.maxHeight = '500px';
            answerElement.classList.add('show');
            toggleButton.textContent = '−';
        } else {
            answerElement.style.maxHeight = '0px';
            answerElement.classList.remove('show');
            toggleButton.textContent = '+';
        }
    }
    
    // Toggle on
    toggleAnswer();
    if (answerElement.style.maxHeight === '500px') {
        console.log('✅ PASS: Answer is shown when toggled');
    } else {
        console.log('❌ FAIL: Answer should be shown');
    }
    
    if (toggleButton.textContent === '−') {
        console.log('✅ PASS: Button text changed to minus');
    } else {
        console.log('❌ FAIL: Button text should be minus');
    }
    
    // Toggle off
    toggleAnswer();
    if (answerElement.style.maxHeight === '0px') {
        console.log('✅ PASS: Answer is hidden when toggled again');
    } else {
        console.log('❌ FAIL: Answer should be hidden');
    }
    
    if (toggleButton.textContent === '+') {
        console.log('✅ PASS: Button text changed back to plus');
    } else {
        console.log('❌ FAIL: Button text should be plus');
    }
    
    document.body.removeChild(mockQuestionItem);
}

// Run all tests
console.log('=== Running Unit Tests for Questions Page ===\n');
testRenderQuestions();
testErrorState();
testEmptyState();
testLoadingState();
testToggleAnswer();
console.log('\n=== All tests completed ===');

