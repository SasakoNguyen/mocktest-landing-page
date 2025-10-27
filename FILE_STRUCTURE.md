# 📁 CẤU TRÚC THƯ MỤC ĐÃ ĐƯỢC TỔ CHỨC LẠI

## ✨ Cấu trúc mới - Gọn gàng và rõ ràng

```
mocktest-landing-page/
│
├── 📄 index.html              # Landing page chính
├── 📄 README.md               # Tài liệu tổng quan
├── 📄 COMPONENTS.md           # Tài liệu components
├── 📄 SUMMARY.md              # Tóm tắt implementation
├── 📄 HOW_TO_VIEW.md         # Hướng dẫn xem demo
├── 📄 FILE_STRUCTURE.md       # File này
│
├── 📂 components/             # Tất cả components
│   ├── QuestionCard.js       # Component hiển thị câu hỏi
│   ├── QuestionCard.css      
│   ├── Choices.js            # Component chọn đáp án
│   ├── Choices.css           
│   ├── NavBar.js             # Component điều hướng
│   └── NavBar.css            
│
├── 📂 pages/                 # Tất cả HTML pages
│   ├── dashboard.html        # Dashboard page
│   ├── test-tienganh.html    # Test Tiếng Anh page
│   ├── questions.html        # FAQs page
│   ├── test-runner.html      # Test runner
│   └── mocktest.html         # Demo với useState
│
├── 📂 styles/                # Tất cả CSS files
│   ├── style.css             # Main styles
│   └── dashboard.css         # Dashboard styles
│
├── 📂 scripts/               # Tất cả JavaScript files
│   ├── test-tienganh.js     # Test Tiếng Anh logic
│   ├── questions.js          # FAQs logic
│   ├── questions.test.js     # Test files
│   └── mocktest.js           # Demo logic với useState
│
├── 📂 data/                  # Data files
│   └── questions.json        # Questions data
│
└── 📂 node_modules/          # Dependencies
    └── ...
```

## 📋 Giải thích từng folder:

### `pages/` - HTML Pages
Tất cả các file HTML của ứng dụng:
- `dashboard.html` - Trang chủ dashboard
- `test-tienganh.html` - Trang test Tiếng Anh
- `questions.html` - Trang FAQs
- `mocktest.html` - Demo components với useState

### `styles/` - CSS Files  
Tất cả các file CSS:
- `style.css` - CSS chính cho landing page
- `dashboard.css` - CSS cho dashboard

### `scripts/` - JavaScript Files
Tất cả các file JavaScript:
- `test-tienganh.js` - Logic cho test Tiếng Anh
- `questions.js` - Logic cho FAQs
- `mocktest.js` - Demo với useState pattern
- `questions.test.js` - Test files

### `components/` - React-like Components
Các components được tạo với useState pattern:
- `QuestionCard.js/css` - Hiển thị câu hỏi
- `Choices.js/css` - Chọn đáp án
- `NavBar.js/css` - Điều hướng

### `data/` - Data Files
- `questions.json` - Dữ liệu câu hỏi cho FAQs

## 🔗 Cách link files:

### Từ HTML trong `pages/` → CSS trong `styles/`:
```html
<link rel="stylesheet" href="../styles/style.css">
```

### Từ HTML trong `pages/` → JS trong `scripts/`:
```html
<script src="../scripts/test-tienganh.js"></script>
```

### Từ HTML trong `pages/` → Components:
```html
<link rel="stylesheet" href="../components/QuestionCard.css">
<script src="../components/QuestionCard.js"></script>
```

### Từ JS trong `scripts/` → Data:
```javascript
const response = await fetch('../data/questions.json');
```

## ✅ Lợi ích của cấu trúc mới:

1. **Rõ ràng** - Dễ tìm files
2. **Tổ chức** - Phân loại theo chức năng
3. **Scalable** - Dễ thêm files mới
4. **Professional** - Theo best practices
5. **Maintainable** - Dễ maintain

## 🎯 Components với useState:

Các components trong `components/` folder:
- ✅ QuestionCard
- ✅ Choices  
- ✅ NavBar

Tất cả sử dụng useState pattern như yêu cầu!

## 📝 Cách sử dụng:

1. Mở `index.html` - Landing page
2. Login để vào dashboard
3. Click vào "Tiếng Anh" để làm test
4. Hoặc mở `pages/mocktest.html` để xem demo components

