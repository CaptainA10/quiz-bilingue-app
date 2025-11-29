#!/bin/bash
echo "🚀 Déploiement du projet..."
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
echo "✅ Installation terminée. Prêt à déployer !"
