# 🧠 AI Quiz Generator - Bilingue

## 🌟 Description
Application web intelligente pour générer des quiz bilingues interactifs à partir de documents texte, PDF, Word et autres formats. Utilise l'IA Groq pour créer des questions personnalisées automatiquement.

**Version:** 2.1.0  
**Statut:** 🟢 Production Ready

## ✨ Fonctionnalités Principales

### 🎯 Génération Intelligente
- **IA Groq intégrée** - Génération gratuite et rapide de quiz
- **Support multilingue** - Français, Espagnol, Anglais
- **Mode bilingue ou monolingue** au choix
- **Analyse de documents** - TXT, PDF, DOCX, MD, JSON

### 🎮 Expérience Quiz
- **3 types de questions**:
  - ✅ QCM (Choix multiples)
  - 🔀 Vrai/Faux
  - 💬 Questions ouvertes
- **Timer configurable** - 15s à 90s par question
- **Système d'indices** - Aide contextuelle
- **Feedback immédiat** - Corrections détaillées

### ⚙️ Personnalisation Avancée
- **Difficulté ajustable** - Facile, Moyen, Avancé
- **Nombre de questions** - 5 à 50 questions
- **Langues configurables** - ES↔FR, EN↔FR, etc.
- **Interface dark/light mode**

## 🏗 Architecture Technique

```
quiz-bilingue-app/
├── 📁 backend/                 # API Node.js + Express
│   ├── server.js              # Serveur principal
│   ├── routes/                # Routes API
│   ├── services/              # Services métier
│   └── config/                # Configuration
├── 📁 frontend/               # Application React
│   ├── src/
│   │   ├── App.jsx            # Composant principal (v2.1.0)
│   │   └── styles/            # Styles CSS
│   └── package.json
└── 🚀 deploy.sh               # Script de déploiement
```

## 🛠 Stack Technologique

### Frontend
- **React 18** - Interface utilisateur
- **Lucide React** - Icônes modernes
- **CSS3** - Styles personnalisés
- **Vite** - Build tool rapide

### Backend
- **Node.js + Express** - Serveur API
- **Multer** - Gestion des uploads
- **Groq AI SDK** - Génération IA
- **CORS** - Sécurité cross-origin

### Features Techniques
- **Responsive Design** - Mobile & Desktop
- **Local Storage** - Sauvegarde des préférences
- **API RESTful** - Architecture modulaire
- **Error Handling** - Gestion robuste des erreurs

## 🚀 Installation & Déploiement

### Prérequis
- Node.js 16+
- npm ou yarn
- Clé API Groq (gratuite)

### 1. Cloner le projet
```bash
git clone https://github.com/CaptainA10/quiz-bilingue-app.git
cd quiz-bilingue-app
```

### 2. Configuration Backend
```bash
cd backend
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec votre clé Groq
```

### 3. Configuration Frontend
```bash
cd ../frontend
npm install

# Configurer l'URL de l'API
cp .env.example .env
```

### 4. Démarrage
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Déploiement Rapide
```bash
# Utiliser le script de déploiement
chmod +x deploy.sh
./deploy.sh
```

## 📖 Guide d'Utilisation

### 1. Importation de Contenu
- **Upload de fichier** (jusqu'à 50MB) : PDF, DOCX, TXT, MD, JSON
- **Collage direct** de texte dans la zone dédiée
- **Estimation automatique** du nombre de questions possibles

### 2. Configuration du Quiz
```javascript
// Options disponibles
{
  numQuestions: 10,           // 5-50 questions
  sourceLang: 'ES',           // Langue source
  targetLang: 'FR',           // Langue cible  
  difficulty: 'moyen',        // facile/moyen/avance
  monolingue: false,          // Mode bilingue
  timer: 30,                  // Timer en secondes
  types: {                    // Types de questions
    qcm: true,
    vf: true, 
    open: false
  }
}
```

### 3. Déroulement du Quiz
- **Interface immersive** avec progression visuelle
- **Indices disponibles** en un clic
- **Timer optionnel** pour plus de challenge
- **Corrections détaillées** après chaque réponse

### 4. Résultats & Analyse
- **Score final** avec pourcentage
- **Récapitulatif détaillé** question par question
- **Possibilité de recommencer** ou nouveau quiz

## 🔧 API Endpoints

### Backend Routes
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Health check du serveur |
| `POST` | `/api/parse` | Analyse de document |
| `POST` | `/api/generate-quiz` | Génération de quiz IA |

### Exemple d'Appel API
```javascript
// Génération de quiz
const response = await fetch('/api/generate-quiz', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Texte à analyser...",
    settings: { /* configuration */ }
  })
});
```

## 🎨 Personnalisation

### Thèmes Couleurs
```css
:root {
  --primary: #4f46e5;
  --secondary: #8b5cf6;
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
}
```

### Ajout de Langues
Modifier les tableaux de langues dans `App.jsx` :
```javascript
// Dans la configuration des selects
<option value="DE">🇩🇪 Deutsch</option>
<option value="IT">🇮🇹 Italiano</option>
```

## 📊 Performances

### Optimisations
- **Chargement lazy** des composants
- **Cache intelligent** des réponses
- **Compression** des assets
- **Optimisation** des appels API

### Métriques
- ⏱ Génération quiz : 5-15 secondes
- 📱 Support mobile : 100% responsive  
- 🚀 Temps chargement : < 2 secondes
- 🗜 Taille bundle : < 500KB

## 🐛 Dépannage

### Problèmes Courants

**Backend non connecté**
```bash
# Vérifier le port 3001
netstat -tulpn | grep 3001
# Redémarrer le serveur
cd backend && npm restart
```

**Erreur Groq API**
- Vérifier la clé API dans `.env`
- S'assurer des quotas disponibles
- Vérifier la connexion internet

**Upload échoue**
- Vérifier taille fichier < 50MB
- Format supporté (PDF, DOCX, TXT, MD, JSON)
- Permissions d'écriture serveur

### Logs & Debug
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs  
cd frontend && npm run dev
# Ouvrir console navigateur F12
```

## 🤝 Contribution

### Structure de Code
- **ESLint** pour la qualité de code
- **Composants modulaires**
- **Documentation inline**
- **Tests unitaires** (à venir)

### Guidelines
1. Fork le projet
2. Créer une feature branch
3. Commiter les changements
4. Push et Pull Request

## 📄 Licence

**MIT License** - Libre utilisation, modification et distribution.

## 👨‍💻 Auteur

**NGUETTE FANE Gad**  
- 📧 Email: [nguettefanegad@gmail.com]
- 🌐 GitHub: [Captainea10]
- 💼 LinkedIn: [NGUETTE FANE GAD]

## 🙏 Remerciements

- **Groq AI** pour l'accès gratuit à leur API
- **Communauté Open Source** pour les librairies utilisées
- **Contributeurs** pour les améliorations continues

---

<div align="center">

**⭐ N'oubliez pas de star le projet si vous l'aimez !**

*Dernière mise à jour: Version 2.1.0 - Décembre 2024*

</div>
```
