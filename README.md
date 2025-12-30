# AI Quiz Generator - Bilingual Edition

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://captaina10.github.io/quiz-bilingue-app/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org)

**Live Demo**: [https://captaina10.github.io/quiz-bilingue-app/](https://captaina10.github.io/quiz-bilingue-app/)

An intelligent, AI-powered quiz generator that creates educational quizzes from your documents in multiple languages. Upload a PDF, Word document, or paste text, and get instant bilingual quizzes powered by Groq's LLaMA 3.3 70B model.

## Features

- Multi-format Support: Upload TXT, MD, PDF, DOCX, JSON files (up to 50MB)
- Trilingual: Spanish, French, and English support
- Smart Quiz Generation: AI-powered questions with explanations
- Dark Mode: Eye-friendly interface with theme toggle
- Customizable Timer: 15s to 90s per question
- Multiple Question Types: Multiple choice, True/False, Open-ended
- Hint System: Get help when you need it
- Detailed Results: Track your performance with comprehensive feedback
- 100% Free: No credit card required

## Demo

**Live Application**: [https://captaina10.github.io/quiz-bilingue-app/](https://captaina10.github.io/quiz-bilingue-app/)

### How to Use

1. Upload a document or paste your text
2. Configure language pair, difficulty, quiz length, and timer
3. Generate a personalized quiz in seconds
4. Take the quiz with instant feedback and explanations
5. Review your results and learn from mistakes

**Note**: First load may take up to 50 seconds due to free-tier backend cold start on Render.

## Tech Stack

### Frontend

- React 18.2.0 - UI framework
- Vite 7.x - Build tool
- Lucide React - Icon library
- Vanilla CSS - Styling with CSS variables

### Backend

- Node.js 18+ with Express
- Groq SDK - AI API integration
- Multer - File upload handling
- PDF Parse - PDF text extraction
- Mammoth - DOCX parsing
- Helmet - Security headers
- CORS - Cross-origin resource sharing

### Deployment

- Frontend: GitHub Pages
- Backend: Render (Free tier)
- CI/CD: GitHub Actions

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A free Groq API key ([Get it here](https://console.groq.com))

### Installation

**Clone the repository**

```bash
git clone https://github.com/CaptainA10/quiz-bilingue-app.git
cd quiz-bilingue-app
```

**Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

**Frontend Setup**

```bash
cd ../frontend
npm install
```

### Running Locally

**Terminal 1 - Backend**

```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend**

```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## Configuration

### Environment Variables

**Backend** (`backend/.env`)

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`)

```env
VITE_API_URL=http://localhost:3001
```

**Frontend Production** (`frontend/.env.production`)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## API Limits (Free Tier)

### Groq API

- 14,400 requests/day
- 30 requests/minute
- Sufficient for personal and educational use

### Render Backend

- 750 hours/month (enough for 24/7)
- Sleeps after 15 minutes of inactivity
- Cold start: ~50 seconds (first request after sleep)

### GitHub Pages

- 100 GB bandwidth/month
- 10 builds/hour

## Deployment

### Deploy Your Own Instance

#### 1. Fork this Repository

#### 2. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new Web Service from your GitHub repo
3. Render will auto-detect `render.yaml`
4. Add environment variable: `GROQ_API_KEY` with your Groq API key
5. Deploy and copy your backend URL

#### 3. Update Frontend Configuration

1. Create `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
2. Commit and push to GitHub

#### 4. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. GitHub Actions will auto-deploy on push

## Contributing

Contributions are welcome! Feel free to report bugs, suggest new features, or submit pull requests.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**NGUETTE FANE Gad**

- GitHub: [@CaptainA10](https://github.com/CaptainA10)
- Project: [quiz-bilingue-app](https://github.com/CaptainA10/quiz-bilingue-app)
- Live Demo: [https://captaina10.github.io/quiz-bilingue-app/](https://captaina10.github.io/quiz-bilingue-app/)

## Acknowledgments

- Groq for providing free AI API access
- Render for free backend hosting
- GitHub for Pages and Actions
- React and Vite communities

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/CaptainA10/quiz-bilingue-app/issues) page
2. Create a new issue with detailed information
3. Star the repository if you find it useful!

## Links

- Repository: [https://github.com/CaptainA10/quiz-bilingue-app](https://github.com/CaptainA10/quiz-bilingue-app)
- Live Demo: [https://captaina10.github.io/quiz-bilingue-app/](https://captaina10.github.io/quiz-bilingue-app/)
- Groq Console: [https://console.groq.com](https://console.groq.com)
- Render Dashboard: [https://dashboard.render.com](https://dashboard.render.com)
