# Guide de Déploiement Backend (Render)

Pour que votre site fonctionne publiquement, vous devez héberger le backend (Node.js). Nous allons utiliser **Render** (gratuit).

## 1. Créer un compte Render
1.  Allez sur [dashboard.render.com](https://dashboard.render.com/register).
2.  Inscrivez-vous avec votre compte **GitHub**.

## 2. Déployer le Backend
1.  Cliquez sur **"New +"** et sélectionnez **"Web Service"**.
2.  Choisissez **"Build and deploy from a Git repository"**.
3.  Connectez votre dépôt `quiz-bilingue-app`.
4.  Render va détecter le fichier `render.yaml` que j'ai créé et configurer le service automatiquement.
5.  **Important** : Vous devrez peut-être confirmer la création.
6.  Une fois le service créé, allez dans l'onglet **"Environment"** du service sur Render.
7.  Ajoutez une variable d'environnement manquante (si elle n'est pas déjà là) :
    *   **Key**: `GROQ_API_KEY`
    *   **Value**: `votre_clé_api_groq_ici` (celle qui commence par `gsk_`)
8.  Lancez le déploiement (si ce n'est pas automatique).

## 3. Récupérer l'URL du Backend
Une fois déployé, Render vous donnera une URL qui ressemble à :
`https://quiz-bilingue-backend.onrender.com`

Copiez cette URL.

## 4. Connecter le Frontend
Maintenant que le backend est en ligne, il faut dire au frontend de l'utiliser.

1.  Sur votre ordinateur, créez un fichier `frontend/.env.production` :
    ```env
    VITE_API_URL=https://votre-backend.onrender.com
    ```
    *(Remplacez par votre vraie URL Render)*

2.  Poussez ce changement sur GitHub :
    ```bash
    git add frontend/.env.production
    git commit -m "Config: Add production API URL"
    git push
    ```

3.  GitHub Actions va automatiquement redéployer votre site.
4.  Dans quelques minutes, votre site public fonctionnera !
