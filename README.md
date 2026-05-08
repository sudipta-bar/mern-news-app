# News App

A simple full-stack news aggregator built with an Express.js backend and a React frontend. The app scrapes stories, stores them in a MongoDB database, and provides user authentication and bookmarking.

**Status:** Prototype

**Tech stack:** Node.js, Express, MongoDB, React

**Contents**

- **Overview** — What the project does.
- **Quick Start** — How to run backend and frontend locally.
- **Environment** — Required environment variables.
- **API** — High-level endpoints.
- **Contributing** — How to contribute.

## Overview

This project provides a minimal news app that can scrape news stories, persist them, and expose them via an API consumed by a React frontend. It includes user authentication, bookmarking, and a story feed.

The repository is split into two main folders:

- [backend/package.json](backend/package.json#L1) — Express API, data models, and scraping logic.
- [frontend/package.json](frontend/package.json#L1) — React app that consumes the API.

## Quick Start

Prerequisites:

- Node.js (16+ recommended)
- npm or yarn
- MongoDB URI (local or cloud)

1. Clone the repo and install dependencies for both projects.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

2. Create environment variables (see next section).

3. Run the backend and frontend in development:

Backend (in `backend`):

```bash
npm run dev
# or
npm start
```

Frontend (in `frontend`):

```bash
npm start
```

Open the frontend at http://localhost:3000 (default CRA port) and the API at the backend port (see backend `.env`).

### Backend starter (if missing)

The repository expects a `server.js` entry script in `backend/` (see `backend/package.json`). If `backend/server.js` is not present you can create it with the following content to wire up the app and MongoDB connection:

```js
// backend/server.js
const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
```

Save that file as `backend/server.js` and then run the backend with `npm run dev` or `npm start` as shown below.

## Environment example

Create a `.env` file in the `backend` folder (or copy from `.env.example`) with these values:

```
MONGO_URI=mongodb://localhost:27017/news-app
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

If you want to add an `.env.example` file to the repo, include the same keys but leave values blank or with placeholders.

## Run locally (commands)

Backend (from repo root):

```bash
cd backend
# install dependencies (only once)
npm install

# create .env (or copy .env.example) and fill values

# start in development (auto-reloads via nodemon)
npm run dev

# or start production
npm start
```

Frontend (from repo root):

```bash
cd frontend
npm install

# set API URL (Create React App example)
# in .env: REACT_APP_API_URL=http://localhost:5000/api

npm start
```

Run the backend and frontend in separate terminals. The frontend will proxy requests to the API using `REACT_APP_API_URL` if configured.

## Environment Variables

Create a `.env` file in the `backend` folder with values similar to:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — backend port (e.g. 5000)
- `NODE_ENV` — `development` or `production`

For the frontend, set the API base URL in your environment (example for Create React App):

- `REACT_APP_API_URL` — e.g. `http://localhost:5000/api`

## API (high-level)

The backend exposes REST endpoints for authentication, stories, and scraping. See the route handlers in `backend/src/routes` for details.

Common endpoints:

- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/stories` — list stories
- `GET /api/stories/:id` — story details
- `POST /api/bookmarks` — bookmark a story (requires auth)
- `POST /api/scrape` — trigger scraping (may be protected)

Refer to the route files in [backend/src/routes](backend/src/routes/index.js#L1) for the precise routes and controllers.

## Development notes

- Use nodemon or the provided `dev` script to reload the backend on changes.
- Scraping logic lives under `backend/src/utils/scrapeStories.js` and can be adapted to different sources.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Run tests / lint (if available)
4. Open a pull request with a clear description

## License

This project is provided under the MIT License. See the `LICENSE` file if present.

## Acknowledgements

- Built as a small demo to show full-stack scraping, persistence, and a React frontend.
