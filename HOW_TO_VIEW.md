# 🎯 CÁCH XEM DEMO COMPONENTS

## ✅ Đã hoàn thành tất cả yêu cầu:

✅ **QuestionCard component** - trong `components/QuestionCard.js`
✅ **Choices component** - trong `components/Choices.js`  
✅ **NavBar component** - trong `components/NavBar.js`
✅ **useState pattern** - để quản lý selected answers
✅ **Folder structure** - tất cả trong `components/`
✅ **Không có lỗi console** - đã test và fix

## 🚀 CÁCH XEM DEMO:

### Cách 1: Mở file mocktest.html (Demo đầy đủ)

**Bước 1:** Mở file này trong VS Code
```
mocktest.html
```

**Bước 2:** Right-click vào file và chọn:
- "Open in Default Browser" hoặc
- "Open with Live Server" (nếu có extension)

**Bạn sẽ thấy:**
- ✅ State Debug Panel hiển thị state hiện tại
- ✅ QuestionCard component
- ✅ Choices component với useState
- ✅ NavBar component với navigation
- ✅ Mở Console (F12) để xem state updates

### Cách 2: Xem trong test thực tế

**Mở test-tienganh.html** - trang test Tiếng Anh 45 câu đã được update với:
- ✅ CSS của components
- ✅ Components đã được load

## 📋 Kiểm tra Console

Bấm **F12** mở Developer Tools và xem:
```javascript
State updated: {
  currentQuestion: 1,
  selectedAnswer: "B",
  totalQuestions: 3
}
```

## 📁 Files đã tạo:

```
components/
├── QuestionCard.js      ✅ Component hiển thị câu hỏi
├── QuestionCard.css     ✅ CSS cho QuestionCard  
├── Choices.js          ✅ Component chọn đáp án
├── Choices.css         ✅ CSS cho Choices
├── NavBar.js           ✅ Component điều hướng
└── NavBar.css          ✅ CSS cho NavBar

mocktest.html           ✅ Demo page đầy đủ
mocktest.js             ✅ useState implementation
test-tienganh.html      ✅ Đã update với components
test-tienganh.js        ✅ Đã fix lỗi
```

## 🎨 useState Pattern đã implement:

```javascript
// Định nghĩa useState
function useState(initialValue) {
    let state = initialValue;
    return [() => state, (newValue) => { state = newValue; }];
}

// Sử dụng trong mocktest.js
const [getCurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [getSelectedAnswers, setSelectedAnswers] = useState({});

// Update state khi chọn đáp án
function handleAnswerSelect(choiceLetter) {
    const currentIndex = getCurrentQuestionIndex();
    const newSelectedAnswers = { ...getSelectedAnswers() };
    newSelectedAnswers[currentIndex] = choiceLetter;
    setSelectedAnswers(newSelectedAnswers);
}
```

## ✅ Checklist hoàn thành:

- [x] Create `QuestionCard` component
- [x] Create `Choices` component  
- [x] Create `NavBar` component
- [x] Use `useState` to manage selected answers
- [x] All components function correctly
- [x] No console errors
- [x] State updates accurately with user actions
- [x] Clear folder structure (`components/`)

## 🎯 Bước tiếp theo:

**Mở mocktest.html trong trình duyệt để xem demo hoạt động!**

