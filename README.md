# 🎬 StreamFlix - Unlimited Movies & TV Shows

A premium, full-featured streaming web application built with React, Node.js/Express, Sequelize (SQLite), and Firebase Authentication. This project replicates a modern media browsing experience, including dynamically fetched movie rows, trailer popups, user authentication, and persistent personalized watchlists.

---

## 🚀 Features

- **Dynamic Hero Banner**: Showcases popular trending movies with a description and action buttons.
- **Categorized Movie Rows**: Powered by **TMDB API** (Trending, StreamFlix Originals, Top Rated, Action, Comedy, Horror, Romance, Documentaries, and more).
- **Trailer Playback**: Clicking on any movie poster fetches and plays its YouTube trailer dynamically.
- **Firebase Authentication**: Secure user sign-up and login capabilities.
- **Personalized Watchlist**: Save or remove movies from a custom database connected to a Node/Express backend.
- **Concurrent Local Dev Environment**: Run both front and backend services simultaneously with a single command.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Libraries / Services |
|---|---|---|
| **Frontend** | React | React Router Dom, Axios, Styled Components, React YouTube, Movie Trailer |
| **Backend** | Node.js / Express | Sequelize ORM, SQLite3, Cors, Dotenv |
| **Authentication** | Firebase Auth | Google Firebase SDK |
| **Database** | Relational Database | SQLite (Dev) / Extensible to PostgreSQL (Prod) |
| **API Source** | TMDB | The Movie Database API |

---

## 📂 Project Structure

```text
streamflix/
├── package.json         # Root package (runs frontend and backend concurrently)
├── frontend/            # React Client Application
│   ├── package.json     # Client-side scripts and dependencies
│   ├── public/          # Public assets
│   └── src/             # React components, routing, and hooks
└── backend/             # Node.js Express API Server
    ├── package.json     # Server-side scripts and dependencies
    ├── config/          # Database configuration (Sequelize)
    ├── controllers/     # Controller logic (TMDB fetching, search)
    ├── models/          # Sequelize schemas (User, Watchlist)
    ├── routes/          # Express API endpoints
    └── server.js        # Server entry point
```

---

## 💻 Local Quick Start

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Clone and Install Dependencies
Install dependencies for both frontend and backend using the root orchestrator:
```bash
npm run install:all
```

### 3. Environment Configuration
Create environment configuration files for both services:

#### Backend Configuration (`backend/.env`):
```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key_here
```

#### Frontend Configuration (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Application
Run both the React development server and Express server concurrently:
```bash
npm start
```
- **Frontend** runs on: `http://localhost:3000`
- **Backend** runs on: `http://localhost:5000`

---

## ☁️ Deployment Guide

Detailed deployment instructions for deploying this app:

### 1. Frontend on Vercel
**Vercel** is the recommended host for static React frontends.

1. Push your repository to **GitHub / GitLab / Bitbucket**.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. In the project configure settings:
   - **Framework Preset**: Choose `Create React App`
   - **Root Directory**: Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add **Environment Variables** in Vercel settings:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://streamflix-backend.onrender.com`)
5. Click **Deploy**.

---

### 2. Backend on Render
**Render** is the recommended host for running your continuous Express server.

1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. In the Web Service configuration settings:
   - **Name**: `streamflix-backend`
   - **Language**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables** in Render settings:
   - `TMDB_API_KEY`: Your TMDB API key.
   - `PORT`: `5000` (Render overrides this internally, but setting it ensures Express connects properly).
5. Click **Create Web Service**.

---

### ⚠️ SQLite Production Database Warning
SQLite uses a local file (`database.sqlite`). Render free tier instances are ephemeral, meaning **every time the backend container restarts, your SQLite file resets and all user watchlists are wiped**.

#### Recommended Solution: Switch to Render PostgreSQL (Free Tier)
1. In Render, click **New** -> **PostgreSQL** to spin up a free database instance. Copy the **External Database URL**.
2. Update your backend dependencies to support PostgreSQL:
   ```bash
   cd backend
   npm install pg pg-hstore
   ```
3. Update `backend/config/db.js` to automatically switch dialect based on whether `DATABASE_URL` exists:
   ```javascript
   const { Sequelize } = require('sequelize');

   const isProduction = process.env.DATABASE_URL;

   const sequelize = isProduction
     ? new Sequelize(process.env.DATABASE_URL, {
         dialect: 'postgres',
         protocol: 'postgres',
         dialectOptions: {
           ssl: {
             require: true,
             rejectUnauthorized: false // Required for Render PostgreSQL SSL
           }
         },
         logging: false
       })
     : new Sequelize({
         dialect: 'sqlite',
         storage: './database.sqlite',
         logging: false
       });

   const connectDB = async () => {
     try {
       await sequelize.authenticate();
       console.log(isProduction ? 'PostgreSQL connected successfully' : 'SQLite connected successfully');
       await sequelize.sync();
     } catch (error) {
       console.error('Database connection failed:', error);
       process.exit(1);
     }
   };

   module.exports = sequelize;
   module.exports.connectDB = connectDB;
   ```
4. Add `DATABASE_URL` to your backend **Environment Variables** in Render, pasting the External Database URL. Sequelize will automatically connect to Postgres in production and continue to use SQLite on your local computer.
