# VisionAI - AI Image Analyzer

VisionAI is a modern AI-powered web application that analyzes images using Google's Gemini AI. Users can upload any image, and the application generates an intelligent description, identifies objects, extracts text (OCR), and provides a concise summary.

---

## Features

- Upload any image (JPG, PNG, JPEG)
- Drag & Drop image upload
- AI-powered image analysis using Gemini
- Object Detection
- OCR (Text Extraction)
- Image Description
- AI Summary
- Image Preview
- Modern Glassmorphism UI
- Responsive Design
- Dark Mode
- Copy Analysis
- Download Analysis Report
- Chat Interface
- Local Analysis History

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

### Backend

- Node.js
- Express.js
- CORS
- dotenv
- Google Gemini API

---

## Folder Structure

image-analyser/

├── backend/

│ ├── routes/

│ │ └── analyze.js

│ ├── .env

│ ├── package.json

│ └── server.js

│

├── frontend/

│ ├── images/

│ │ └── hero.png

│ ├── index.html

│ ├── style.css

│ └── script.js

│

└── README.md

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/visionai.git
```

---

### 2. Open Project

```bash
cd visionai
```

---

### 3. Install Backend Dependencies

```bash
cd backend

npm install
```

---

### 4. Create Environment File

Create a file named

```
.env
```

Inside it add

```env
GEMINI_API_KEY=YOUR_API_KEY
PORT=5000
```

---

### 5. Start Backend

```bash
npm start
```

Server will run at

```
http://localhost:5000
```

---

### 6. Run Frontend

Open

```
frontend/index.html
```

or use VS Code Live Server.

---

## How It Works

1. User uploads an image.

2. JavaScript converts image to Base64.

3. Image is sent to Express backend.

4. Backend calls Gemini Vision API.

5. Gemini analyzes the image.

6. JSON response is returned.

7. Frontend displays

- Title
- Description
- Objects
- Extracted Text
- Summary

---

## API Endpoint

### Analyze Image

```
POST /api/analyze
```

Request

```json
{
  "image": "Base64 Image",
  "mimeType": "image/png"
}
```

Response

```json
{
  "title": "Office Desk",
  "description": "Laptop on a wooden desk.",
  "objects": [
    "Laptop",
    "Keyboard",
    "Coffee Mug"
  ],
  "text_found": "Meeting at 2 PM",
  "summary": "The image shows a modern office workspace."
}
```

---

## Future Improvements

- User Authentication
- PDF Report Export
- Image History
- AI Chat with Image Context
- Multi-language Support
- Voice Commands
- Cloud Storage
- Dashboard Analytics

---

## Screenshots

### Home Page

- Hero Section
- Feature Cards
- Upload Image
- AI Loading
- Result Dashboard
- Chat Section

---

## Author

**Name:** Your Name

**Project:** VisionAI - AI Image Analyzer

**Course:** Computer Engineering Project (CEP)

---

## License

This project is developed for educational purposes.

---

## Acknowledgements

- Google Gemini AI
- Node.js
- Express.js
- Font Awesome
- Google Fonts

---

# Thank You