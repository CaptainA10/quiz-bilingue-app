# 🧠 AI Quiz Generator Bilingue v2.1.0

Application web pour générer des quiz éducatifs bilingues à partir de documents avec IA Groq (gratuite).

## ✨ Fonctionnalités

- 📁 **Upload fichiers** : TXT, MD, PDF, DOCX, JSON (max 50MB)
- 🌍 **Multilingue** : ES/FR/EN avec mode bilingue ou monolingue
- 🎨 **Dark Mode complet**
- ⏱️ **Timer par question** (15s à 90s)
- 📊 **Types variés** : QCM, Vrai/Faux, Questions ouvertes
- 🎯 **Jusqu'à 50 questions par quiz**
- 🤖 **IA Groq gratuite** (LLaMA 3.3 70B)

## 🚀 Installation

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Éditez .env et ajoutez votre clé Groq
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Obtenir une clé Groq (gratuit)

1. [https://console.groq.com](https://console.groq.com)
2. Créer compte (gratuit, sans CB)
3. API Keys → Create API Key
4. Copier la clé dans `backend/.env`

## 🎯 Utilisation

1. Charger un document ou coller du texte
2. Configurer : langues, nb questions, timer, types
3. Générer le quiz avec Groq AI
4. Répondre aux questions
5. Voir les résultats avec explications

## 👤 Auteur
NGUETTE FANE Gad • v2.1.0 • 2025
