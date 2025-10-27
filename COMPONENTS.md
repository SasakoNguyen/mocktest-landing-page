# MockTest - Components with useState Pattern

## 📋 Tổng quan

Dự án MockTest bao gồm 3 components chính được triển khai với vanilla JavaScript và pattern `useState` để quản lý state giống React.

## 🎯 Components Đã Tạo

### 1. **QuestionCard** (`components/QuestionCard.js`)

Component hiển thị thông tin câu hỏi hiện tại.

**Props:**
- `question` (object): Thông tin câu hỏi
- `questionNumber` (number): Số thứ tự câu hỏi
- `totalQuestions` (number): Tổng số câu hỏi

**Features:**
- Hiển thị số câu hỏi hiện tại
- Hiển thị nội dung câu hỏi
- Hiển thị type nếu có

### 2. **Choices** (`components/Choices.js`)

Component hiển thị danh sách các lựa chọn và cho phép người dùng chọn đáp án.

**Props:**
- `choices` (array): Mảng các lựa chọn
- `selectedAnswer` (string): Đáp án đã chọn
- `questionIndex` (number): Index của câu hỏi

**Features:**
- Radio button cho mỗi lựa chọn
- Highlight đáp án đã chọn
- Click để chọn đáp án
- Hover effect
- sử dụng onClick event handlers

### 3. **NavBar** (`components/NavBar.js`)

Component điều hướng giữa các câu hỏi.

**Props:**
- `currentQuestion` (number): Câu hỏi hiện tại
- `totalQuestions` (number): Tổng số câu hỏi
- `onPrevQuestion` (function): Callback khi click "Trước"
- `onNextQuestion` (function): Callback khi click "Sau"
- `isLastQuestion` (boolean): Có phải câu hỏi cuối không
- `onSubmit` (function): Callback khi submit bài

**Features:**
- Nút "Trước" (disable ở câu đầu)
- Hiển thị tiến độ (1/3)
- Nút "Sau" hoặc "Nộp bài" (ở câu cuối)
- Disable buttons khi cần thiết

## 🎨 useState Pattern

### Implementation

```javascript
function useState(initialValue) {
  let state = initialValue;
  
  function setState(newValue) {
    state = typeof newValue === 'function' ? newValue(state) : newValue;
    render();
  }
  
  return [state, setState];
}
```

### Usage

```javascript
// Declare state
let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
let [selectedAnswers, setSelectedAnswers] = useState({});

// Update state
setCurrentQuestionIndex(currentQuestionIndex + 1);
setSelectedAnswers({
  ...selectedAnswers,
  [currentQuestionIndex]: choiceLetter
});
```

## 📁 Cấu trúc File

```
components/
├── QuestionCard.js      # Vanilla JS component cho câu hỏi
├── QuestionCard.css     # CSS cho QuestionCard
├── Choices.js          # Vanilla JS component cho lựa chọn
├── Choices.css         # CSS cho Choices
├── NavBar.js           # Vanilla JS component cho navigation
└── NavBar.css          # CSS cho NavBar

mocktest.html           # Trang demo
mocktest.js             # Logic với useState pattern và demo
test-tienganh.html     # Trang test Tiếng Anh (45 câu hỏi)
test-tienganh.js       # Logic cho test Tiếng Anh
```

## 🚀 Cách Sử dụng

### 1. Mở trang Demo với useState Pattern
```bash
# Mở mocktest.html trong trình duyệt
# Hoặc chạy với live server:
# npx live-server
```

### 2. Sử dụng Components trong Code

#### QuestionCard
```javascript
const questionCard = QuestionCard({
  question: currentQuestion,
  questionNumber: currentQuestionIndex + 1,
  totalQuestions: totalQuestions
});

document.getElementById('app').innerHTML = questionCard;
```

#### Choices
```javascript
const choices = Choices({
  choices: currentQuestion.choices,
  selectedAnswer: selectedAnswers[currentQuestionIndex],
  questionIndex: currentQuestionIndex
});
```

#### NavBar
```javascript
const navBar = NavBar({
  currentQuestion: currentQuestionIndex + 1,
  totalQuestions: totalQuestions,
  onPrevQuestion: handlePrevQuestion,
  onNextQuestion: handleNextQuestion,
  isLastQuestion: currentQuestionIndex === totalQuestions - 1,
  onSubmit: handleSubmit
});
```

### 3. Demo với useState Pattern
```javascript
// Tạo state với useState
const [getCurrentIndex, setCurrentIndex] = useState(0);
const [getSelected, setSelected] = useState({});

// Sử dụng state
setCurrentIndex(1); // Update state
const current = getCurrentIndex(); // Get state
```

## ✅ Requirements Checklist

- [x] Create `QuestionCard` component
- [x] Create `Choices` component
- [x] Create `NavBar` component
- [x] Use `useState` to manage selected answers
- [x] Components work correctly
- [x] No console errors
- [x] State updates accurately with user actions
- [x] Clear folder structure (`components/`)

## 🧪 Testing

### Test State Management

1. Mở trang `mocktest.html`
2. Chọn một đáp án
3. Xem console - state được update
4. Click "Sau" để chuyển câu hỏi
5. Chọn đáp án khác
6. Click "Trước" để quay lại - đáp án đã chọn được giữ nguyên
7. Click "Nộp bài" - hiển thị kết quả

### Console Output

```
State updated: {
  currentQuestion: 1,
  selectedAnswer: "C",
  totalQuestions: 3
}
```

## 🎯 Features

### State Management
- Sử dụng `useState` pattern để quản lý state
- State được update đúng với hành động của user
- Không có console errors

### User Experience
- Smooth transitions khi chọn đáp án
- Highlight đáp án đã chọn
- Disable buttons khi cần thiết
- Progress indicator
- Responsive design

### Code Quality
- Clean component structure
- Separation of concerns
- Reusable components
- Clear naming conventions

## 📊 Demo

Xem demo tại: [mocktest.html](mocktest.html)

**Features:**
- 3 câu hỏi toán học
- Chọn đáp án bằng cách click
- Navigate giữa các câu hỏi
- Submit để xem kết quả
- Hiển thị đáp án đúng

---

© 2025 MockTest. All rights reserved.

