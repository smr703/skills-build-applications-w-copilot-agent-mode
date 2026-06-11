import express from 'express';
import { connectDatabase, mongoUri } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', (_req, res) => {
  void User.find().lean().then((users) => res.json(users));
});

app.get('/api/teams/', (_req, res) => {
  void Team.find().lean().then((teams) => res.json(teams));
});

app.get('/api/activities/', (_req, res) => {
  void Activity.find().lean().then((activities) => res.json(activities));
});

app.get('/api/leaderboard/', (_req, res) => {
  void LeaderboardEntry.find().sort({ rank: 1 }).lean().then((leaderboard) => res.json(leaderboard));
});

app.get('/api/workouts/', (_req, res) => {
  void Workout.find().lean().then((workouts) => res.json(workouts));
});

async function startServer() {
  try {
    await connectDatabase();
    console.log(`Connected to MongoDB at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
}

void startServer();
