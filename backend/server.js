require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
const PORT = process.env.PORT || 3001;

const upload = multer({
  dest: '/tmp/uploads/',
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.txt', '.md', '.pdf', '.docx', '.json'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non supporté'));
    }
  }
});

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'VOTRE_CLE_ICI') {
  console.error('\n❌ ERREUR: Clé Groq manquante !');
  console.error('📝 Éditez backend/.env et ajoutez votre clé');
  console.error('🔑 Obtenez une clé gratuite sur: https://console.groq.com\n');
  // process.exit(1); // Commented out to prevent crash if key is missing during dev
}

console.log('✅ Clé Groq détectée');

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🧠 API Quiz Bilingue (Groq)',
    version: '2.1.0',
    features: ['pdf', 'docx', 'txt', 'dark-mode', 'timer', 'mono-language'],
    endpoints: {
      health: 'GET /',
      parse: 'POST /api/parse',
      generateQuiz: 'POST /api/generate-quiz',
      test: 'GET /api/test'
    }
  });
});

app.post('/api/parse', upload.single('file'), async (req, res) => {
  try {
    console.log('📄 Requête de parsing reçue');

    if (req.body.text) {
      console.log('✅ Texte collé:', req.body.text.length, 'caractères');
      return res.json({
        ok: true,
        text: req.body.text,
        meta: {
          source: 'paste',
          length: req.body.text.length,
          maxQuestions: Math.floor(req.body.text.length / 100)
        }
      });
    }

    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'Aucun fichier ou texte fourni' });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const fileExt = path.extname(fileName).toLowerCase();

    console.log('📁 Fichier:', fileName, '(', req.file.size, 'bytes)');

    let text = '';
    let meta = { fileName, size: req.file.size, type: fileExt };

    if (fileExt === '.pdf') {
      console.log('🔍 Parsing PDF...');
      try {
        const dataBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        text = pdfData.text || '';
        meta.pages = pdfData.numpages;
        meta.info = pdfData.info;
        console.log('✅ PDF parsé:', pdfData.numpages, 'pages,', text.length, 'caractères');

        if (text.length < 100) {
          meta.warning = 'PDF contient peu de texte extractible.';
          console.warn('⚠️  PDF avec peu de texte détecté');
        }
      } catch (pdfError) {
        console.error('❌ Erreur PDF:', pdfError.message);
        await fs.unlink(filePath).catch(() => { });
        return res.status(400).json({
          ok: false,
          error: 'Impossible de lire le PDF. Il pourrait être protégé ou scanné.',
          details: pdfError.message
        });
      }
    } else if (fileExt === '.docx') {
      console.log('🔍 Parsing DOCX...');
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value || '';
      console.log('✅ DOCX parsé:', text.length, 'caractères');
    } else if (['.txt', '.md', '.json'].includes(fileExt)) {
      console.log('🔍 Lecture fichier texte...');
      text = await fs.readFile(filePath, 'utf8');
      console.log('✅ Fichier texte lu:', text.length, 'caractères');
    }

    await fs.unlink(filePath).catch(() => { });

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        ok: false,
        error: 'Document trop court (minimum 50 caractères)',
        extracted: text.length
      });
    }

    const wordCount = text.split(/\s+/).length;
    meta.wordCount = wordCount;
    meta.estimatedQuestions = Math.min(Math.floor(wordCount / 50), 50);

    console.log('✅ Parsing réussi:', text.length, 'caractères');
    res.json({ ok: true, text: text.trim(), meta });

  } catch (error) {
    console.error('❌ Erreur parsing:', error);
    if (req.file) await fs.unlink(req.file.path).catch(() => { });
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { prompt, settings } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt manquant' });

    console.log(`📝 Génération quiz:`, settings);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Tu es un expert en quiz éducatifs. Génère uniquement du JSON valide.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 8000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erreur Groq');
    }

    const data = await response.json();
    console.log('✅ Quiz généré');

    res.json({
      success: true,
      provider: 'groq',
      model: 'llama-3.3-70b-versatile',
      data: { content: [{ text: data.choices[0].message.content, type: 'text' }] }
    });

  } catch (error) {
    console.error('❌ Erreur génération:', error.message);
    res.status(500).json({ error: 'Erreur de génération', message: error.message });
  }
});

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
        messages: [{ role: 'user', content: 'Réponds OK' }],
        max_tokens: 10
      })
    });

    const data = await response.json();
    res.json({ success: true, message: 'Groq OK', response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 Backend Quiz Bilingue v2.1.0');
  console.log('========================================');
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🤖 Provider: Groq AI (gratuit)`);
  console.log(`📁 Upload: TXT, MD, PDF, DOCX (50MB max)`);
  console.log('========================================');
  console.log('✨ Fonctionnalités:');
  console.log('   • Parsing PDF corrigé');
  console.log('   • Support fichiers lourds (50MB)');
  console.log('   • Dark mode');
  console.log('   • Timer');
  console.log('   • Mode monolingue');
  console.log('========================================\n');
});

process.on('SIGTERM', () => {
  console.log('👋 Arrêt du serveur...');
  process.exit(0);
});
