# Blog API Backend

Backend REST pour une application de blog avec Node.js, Express, MySQL et JWT.

## Stack Technologique

- Node.js
- Express.js
- MySQL avec `mysql2/promise`
- JWT (JSON Web Token)
- Helmet et CORS
- dotenv
- bcryptjs

## Structure du Projet

```text
Backend_article_BIAM_Kwami_Alfred/
├── src/
│   ├── config/          # Configuration (DB, env)
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middleware (auth, erreurs)
│   ├── models/          # Requêtes BD
│   ├── routes/          # Points d'entrée API
│   ├── app.js
│   └── server.js
├── sql/
│   └── schema.sql       # Schéma BD
├── tests/
│   └── blog-api.rest    # Tests API
├── package.json
└── README.md
```

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

Créer un fichier `.env` :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Initialiser la base de données

```bash
mysql -u root -p blog_db < sql/schema.sql
```

### 4. Démarrer le serveur

```bash
npm run dev    # Développement
npm start      # Production
```

Le serveur écoute sur `http://localhost:5000`

---

## Authentification JWT

L'API utilise JWT pour sécuriser les endpoints.

1. Se connecter → Recevoir un token
2. Inclure le token dans le header `Authorization: Bearer {token}`
3. Le token expire après 7 jours

Pour les requêtes protégées, ajouter :

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints

### Health Check

**GET /api/health**

Vérifier que l'API fonctionne.

Réponse :

```json
{
  "success": true,
  "message": "API operationnelle."
}
```

---

### Authentification

**POST /api/auth/register**

Créer un compte.

Corps :

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "SecurePassword123!"
}
```

Réponse :

```json
{
  "success": true,
  "message": "Utilisateur cree avec succes.",
  "data": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "created_at": "2026-04-07T10:30:00Z"
  }
}
```

---

**POST /api/auth/login**

Se connecter.

Corps :

```json
{
  "email": "jean@example.com",
  "password": "SecurePassword123!"
}
```

Réponse :

```json
{
  "success": true,
  "message": "Connexion reussie.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Jean Dupont",
      "email": "jean@example.com"
    }
  }
}
```

---

### Articles

**GET /api/articles**

Récupérer tous les articles.

Pas d'authentification requise.

---

**GET /api/articles/:id**

Récupérer un article.

Paramètres : id (number)

---

**POST /api/articles**

Créer un article.

Authentification requise.

Corps :

```json
{
  "title": "Titre",
  "content": "Contenu",
  "categoryId": 1
}
```

---

**PUT /api/articles/:id**

Modifier un article.

Authentification requise.

Note : Seul l'auteur peut modifier.

---

**DELETE /api/articles/:id**

Supprimer un article.

Authentification requise.

Note : Seul l'auteur peut supprimer.

---

### Catégories

**GET /api/categories**

Récupérer toutes les catégories.

Pas d'authentification requise.

---

**POST /api/categories**

Créer une catégorie.

Authentification requise.

Corps :

```json
{
  "name": "Nom Catégorie"
}
```

---

### Commentaires

**GET /api/comments/article/:articleId**

Récupérer les commentaires d'un article.

Pas d'authentification requise.

---

**POST /api/comments**

Ajouter un commentaire.

Pas d'authentification requise.

Corps :

```json
{
  "articleId": 1,
  "author": "Jean Dupont",
  "content": "Excellent article !"
}
```

---

## Codes HTTP

| Code | Signification    | Exemple               |
| ---- | ---------------- | --------------------- |
| 200  | Succès           | Article récupéré      |
| 201  | Créé             | Article créé          |
| 400  | Mauvaise requête | Paramètre manquant    |
| 401  | Non authentifié  | Token absent/invalide |
| 403  | Interdit         | Pas l'auteur          |
| 404  | Non trouvé       | Article n'existe pas  |
| 409  | Conflit          | Email déjà enregistré |
| 500  | Erreur serveur   | Erreur BD             |

---

## Tests avec Rest Client

Utiliser l'extension Rest Client de VS Code.

Fichier : `tests/blog-api.rest`

Ordre recommandé :

1. Health check
2. Register
3. Login (capture le token)
4. Create Category
5. Create Article
6. Get All Articles
7. Get Article by ID
8. Update Article
9. Add Comment
10. Get Comments
11. Delete Article

---

## Sécurité

Points implémentés :

- Mots de passe hashés (bcryptjs)
- Tokens JWT avec expiration
- Validation des inputs
- Headers de sécurité (Helmet)
- CORS configuré

À vérifier en production :

- JWT_SECRET robuste
- HTTPS obligatoire
- Rate limiting
- Variables d'environnement sécurisées

---

## Ressources

- Express : https://expressjs.com/
- JWT : https://jwt.io/
- MySQL 2 : https://github.com/sidorares/node-mysql2
- bcryptjs : https://github.com/dcodeIO/bcrypt.js
