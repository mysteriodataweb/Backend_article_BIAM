# Blog API Backend

Backend REST pour une application de blog moderne avec Node.js, Express, MySQL et JWT.

## Stack

- Node.js
- Express.js
- MySQL avec `mysql2/promise`
- dotenv
- CORS
- JWT
- Helmet

## Structure

```text
src/
├── config/
│   ├── db.js
│   └── env.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
└── server.js
```

## Installation

1. Installer les dependances :

```bash
npm install
```

2. Verifier le fichier `.env`

Le projet contient deja un `.env` de developpement local.

3. Initialiser la base :

```bash
# Executer le contenu de sql/schema.sql dans MySQL
```

4. Demarrer le serveur :

```bash
npm run dev
```

## Tests manuels avec Rest Client

Le fichier [tests/blog-api.rest] permet de tester l'API depuis VS Code avec l'extension Rest Client.

Ordre conseillé :

1. `GET /api/health`
2. `POST /api/auth/register`
3. `POST /api/auth/login`
4. Requetes protegees avec le token JWT capture automatiquement

## Endpoints implementes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/comments/article/:articleId`
- `POST /api/comments`
