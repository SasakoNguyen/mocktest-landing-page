# MockTest Landing Page - Project Documentation

## 📋 Tổng quan

MockTest là một nền tảng trực tuyến cung cấp các bài kiểm tra mô phỏng với hệ thống FAQ hoàn chỉnh.

## 🎯 Yêu cầu đã hoàn thành

### 1. **Data Fetching** ✅
- Tạo file `questions.json` chứa 10 câu hỏi thường gặp về MockTest
- Fetch dữ liệu từ `questions.json` bằng async/await
- Xử lý lỗi khi fetch thất bại

### 2. **Rendering** ✅
- Render danh sách câu hỏi với HTML động
- Hiển thị tiêu đề câu hỏi và nội dung trả lời
- Toggle show/hide cho câu trả lời

### 3. **State Handling** ✅
- **Loading state**: Hiển thị spinner và "Đang tải..." khi fetch dữ liệu
- **Empty state**: Hiển thị icon và message khi không có dữ liệu
- **Error state**: Hiển thị cảnh báo và nút "Thử lại" khi có lỗi
- **Success state**: Hiển thị danh sách câu hỏi khi fetch thành công

### 4. **Unit Tests** ✅
Đã viết 5 unit tests trong `questions.test.js`:
- ✅ Test 1: Render questions correctly - Kiểm tra render đúng số lượng và nội dung
- ✅ Test 2: Show error state when data fetch fails - Kiểm tra hiển thị error state
- ✅ Test 3: Show empty state when no data - Kiểm tra hiển thị empty state
- ✅ Test 4: Show loading state during fetch - Kiểm tra hiển thị loading state
- ✅ Test 5: Toggle answer visibility - Kiểm tra toggle show/hide câu trả lời

## 📁 Cấu trúc thư mục

```
mocktest-landing-page/
├── index.html              # Trang chủ với modal đăng nhập
├── dashboard.html          # Trang dashboard sau khi đăng nhập
├── questions.html          # Trang FAQ/Questions với data fetching
├── test-runner.html        # Trang để chạy unit tests
├── questions.json          # Dữ liệu 10 câu hỏi thường gặp
├── questions.js            # Logic fetch data và state handling
├── questions.test.js       # 5 unit tests
├── style.css               # CSS cho trang chủ
├── dashboard.css           # CSS cho dashboard và questions
└── README.md              # Tài liệu này
```

## 🚀 Cách sử dụng

### 1. **Trang chủ (index.html)**
- Mở file `index.html` trong trình duyệt
- Click nút "Đăng Nhập" ở header
- Nhập tên đăng nhập và mật khẩu
- Click "Đăng Nhập" để chuyển đến dashboard

### 2. **Dashboard (dashboard.html)**
- Hiển thị thống kê: bài đã hoàn thành, điểm trung bình, xếp hạng
- Danh sách 6 môn học: Toán, Vật Lý, Hóa, Sinh, Địa Lý, Tiếng Anh
- Nút "❓ FAQs" để xem câu hỏi thường gặp
- Nút "← Quay lại" để về trang chủ

### 3. **Questions/FAQ (questions.html)**
- Fetch dữ liệu từ `questions.json`
- Hiển thị 4 states:
  - **Loading**: Spinner khi đang tải
  - **Empty**: Icon 📭 khi không có dữ liệu
  - **Error**: Icon ⚠️ khi có lỗi
  - **Success**: Danh sách 10 câu hỏi
- Click dấu "+" để mở rộng câu trả lời, "-" để thu gọn

### 4. **Chạy Tests (test-runner.html)**
- Mở file `test-runner.html` trong trình duyệt
- Click nút "Chạy Tests"
- Xem kết quả 5 unit tests trong console và trên màn hình

## 🎨 Tính năng đặc biệt

1. **Smooth Animations**: Tất cả các chuyển đổi state đều có animation mượt mà
2. **Responsive Design**: Hoạt động tốt trên mọi thiết bị
3. **Error Recovery**: Có nút "Thử lại" khi fetch thất bại
4. **User Experience**: Loading state giả lập delay để demo
5. **Accessibility**: Sử dụng semantic HTML và ARIA labels

## 🧪 Unit Tests

File `questions.test.js` chứa 5 unit tests:

```javascript
// Test 1: Kiểm tra render đúng số lượng questions
testRenderQuestions();

// Test 2: Kiểm tra hiển thị error state
testErrorState();

// Test 3: Kiểm tra hiển thị empty state
testEmptyState();

// Test 4: Kiểm tra hiển thị loading state
testLoadingState();

// Test 5: Kiểm tra toggle answer visibility
testToggleAnswer();
```

## 📝 Chạy Tests

### Cách 1: Sử dụng test-runner.html
```bash
# Mở test-runner.html trong trình duyệt và click "Chạy Tests"
```

### Cách 2: Sử dụng Node.js
```bash
# Cài đặt (nếu chưa có)
npm install -g http-server

# Chạy server
http-server

# Mở test-runner.html trong trình duyệt
```

### Cách 3: Sử dụng Python (nếu có)
```bash
python -m http.server 8000
# Mở http://localhost:8000/test-runner.html
```

## 🎯 Demo

1. **Demo đăng nhập**: index.html → Click "Đăng Nhập" → Nhập bất kỳ → Chuyển đến dashboard
2. **Demo Questions**: dashboard.html → Click "❓ FAQs" → Xem states: Loading → Success
3. **Demo Error**: Xóa hoặc đổi tên `questions.json` → Reload page → Xem Error state
4. **Demo Empty**: Sửa `questions.json` thành `[]` → Reload → Xem Empty state

## 📧 Liên hệ

- Email: support@mocktest.com
- Phone: +84 123 456 789
- Website: [www.mocktest.com](http://www.mocktest.com)

---

© 2025 MockTest. All rights reserved.

