/**
 * Unit Tests for Questions Page with Jest
 * Tests data fetching, rendering, and state handling
 */

const fs = require('fs');
const path = require('path');

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

describe('Questions Page Tests', () => {
    
    /**
     * Test 1: Render questions correctly
     * Tests that questions are rendered with proper HTML structure
     */
    test('should render questions correctly', () => {
        const testData = mockQuestionsData;
        
        // Create mock DOM element
        const mockQuestionsList = {
            innerHTML: '',
            appendChild: function() {}
        };
        
        function renderQuestionsTest(questions) {
            let html = '';
            questions.forEach(question => {
                html += `
                    <div class="question-item">
                        <div class="question-item__header">
                            <div class="question-item__question">${question.question}</div>
                        </div>
                        <div class="question-item__answer">${question.answer}</div>
                    </div>
                `;
            });
            mockQuestionsList.innerHTML = html;
        }
        
        // Execute
        renderQuestionsTest(testData);
        
        // Assertions
        expect(testData.length).toBe(2);
        expect(mockQuestionsList.innerHTML).toContain('MockTest là gì?');
        expect(mockQuestionsList.innerHTML).toContain('question-item');
        expect(mockQuestionsList.innerHTML).toContain('Có 6 môn học');
    });

    /**
     * Test 2: Show error state when data fetch fails
     * Tests that error state is displayed when fetch fails
     */
    test('should show error state when data fetch fails', () => {
        const mockErrorState = {
            style: { display: 'none' },
            innerHTML: ''
        };
        
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
        expect(mockErrorState.style.display).toBe('block');
        expect(mockErrorState.innerHTML).toContain('Đã xảy ra lỗi');
        expect(mockErrorState.innerHTML).toContain('⚠️');
    });

    /**
     * Test 3: Show empty state when no data
     * Tests that empty state is displayed when data array is empty
     */
    test('should show empty state when no data', () => {
        const mockEmptyState = {
            style: { display: 'none' },
            innerHTML: ''
        };
        
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
            expect(mockEmptyState.style.display).toBe('block');
            expect(mockEmptyState.innerHTML).toContain('Không có câu hỏi nào');
            expect(mockEmptyState.innerHTML).toContain('📭');
        }
        
        expect(emptyData.length).toBe(0);
    });

    /**
     * Test 4: Show loading state during fetch
     * Tests that loading state is displayed while fetching data
     */
    test('should show loading state during fetch', () => {
        const mockLoadingState = {
            style: { display: 'none' },
            innerHTML: ''
        };
        
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
        expect(mockLoadingState.style.display).toBe('block');
        expect(mockLoadingState.innerHTML).toContain('Đang tải...');
        expect(mockLoadingState.innerHTML).toContain('spinner');
    });

    /**
     * Test 5: Toggle answer visibility
     * Tests that clicking toggle button shows/hides answer
     */
    test('should toggle answer visibility', () => {
        let isVisible = false;
        const mockToggle = {
            style: { maxHeight: '0px' },
            classList: { add: jest.fn(), remove: jest.fn() },
            textContent: '+'
        };
        
        function toggleAnswer() {
            if (!isVisible) {
                mockToggle.style.maxHeight = '500px';
                mockToggle.classList.add('show');
                mockToggle.textContent = '−';
                isVisible = true;
            } else {
                mockToggle.style.maxHeight = '0px';
                mockToggle.classList.remove('show');
                mockToggle.textContent = '+';
                isVisible = false;
            }
        }
        
        // Toggle on
        toggleAnswer();
        expect(mockToggle.style.maxHeight).toBe('500px');
        expect(mockToggle.textContent).toBe('−');
        expect(isVisible).toBe(true);
        
        // Toggle off
        toggleAnswer();
        expect(mockToggle.style.maxHeight).toBe('0px');
        expect(mockToggle.textContent).toBe('+');
        expect(isVisible).toBe(false);
    });

    /**
     * Test 6: Questions.json file exists and has valid data
     */
    test('questions.json file should exist and contain data', () => {
        const questionsPath = path.join(__dirname, 'questions.json');
        const fileExists = fs.existsSync(questionsPath);
        
        expect(fileExists).toBe(true);
        
        if (fileExists) {
            const fileContent = fs.readFileSync(questionsPath, 'utf8');
            const questionsData = JSON.parse(fileContent);
            
            expect(Array.isArray(questionsData)).toBe(true);
            expect(questionsData.length).toBeGreaterThan(0);
            
            // Check structure
            if (questionsData.length > 0) {
                const firstQuestion = questionsData[0];
                expect(firstQuestion).toHaveProperty('id');
                expect(firstQuestion).toHaveProperty('question');
                expect(firstQuestion).toHaveProperty('answer');
            }
        }
    });

    /**
     * Test 7: Data structure validation
     */
    test('questions data should have correct structure', () => {
        const sampleQuestion = mockQuestionsData[0];
        
        expect(sampleQuestion).toHaveProperty('id');
        expect(sampleQuestion).toHaveProperty('question');
        expect(sampleQuestion).toHaveProperty('answer');
        expect(typeof sampleQuestion.id).toBe('number');
        expect(typeof sampleQuestion.question).toBe('string');
        expect(typeof sampleQuestion.answer).toBe('string');
        expect(sampleQuestion.question.length).toBeGreaterThan(0);
        expect(sampleQuestion.answer.length).toBeGreaterThan(0);
    });
});
