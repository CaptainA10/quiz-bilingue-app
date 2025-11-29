require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Vérifier la clé Groq
if (!process.env.GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY manquante ! Consultez .env.example');
  process.exit(1);
}

console.log('✅ Clé Groq détectée');

// Route principale
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: '🧠 API Quiz Bilingue GRATUITE',
    version: '2.0.0',
    provider: 'Groq (gratuit)'
  });
});

// Génération de quiz
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { prompt, settings } = req.body;

    if (!prompt || !settings) {
      return res.status(400).json({ 
        error: 'Données manquantes'
      });
    }

    console.log(`📝 Génération: ${settings.numQuestions} questions`);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en création de quiz éducatifs bilingues. Tu génères uniquement du JSON valide.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erreur Groq API');
    }

    const data = await response.json();
    console.log('✅ Quiz généré');

    res.json({
      success: true,
      provider: 'groq',
      data: {
        content: [{
          text: data.choices[0].message.content,
          type: 'text'
        }]
      }
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ 
      error: 'Erreur de génération',
      message: error.message
    });
  }
});

// Test Groq
app.get('/api/test', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'Réponds juste OK' }],
        max_tokens: 10
      })
    });

    const data = await response.json();
    res.json({ success: true, response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Démarrage
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 Serveur démarré !');
  console.log('========================================');
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log('========================================\n');
});

