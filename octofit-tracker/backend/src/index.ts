import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const users = [
  { id: 'u1', username: 'octo-ada', displayName: 'Ada Lovelace', teamId: 't1' },
  { id: 'u2', username: 'octo-grace', displayName: 'Grace Hopper', teamId: 't1' },
  { id: 'u3', username: 'octo-katherine', displayName: 'Katherine Johnson', teamId: 't2' },
];

const teams = [
  { id: 't1', name: 'OctoSprinters', memberCount: 2 },
  { id: 't2', name: 'Tentacle Titans', memberCount: 1 },
];

const activities = [
  { id: 'a1', userId: 'u1', activityType: 'run', durationMinutes: 35, points: 120 },
  { id: 'a2', userId: 'u2', activityType: 'cycle', durationMinutes: 50, points: 160 },
  { id: 'a3', userId: 'u3', activityType: 'strength', durationMinutes: 40, points: 140 },
];

const workouts = [
  { id: 'w1', title: 'Morning Cardio Builder', activityType: 'run', durationMinutes: 30 },
  { id: 'w2', title: 'Core Strength Circuit', activityType: 'strength', durationMinutes: 25 },
  { id: 'w3', title: 'Recovery Ride', activityType: 'cycle', durationMinutes: 45 },
];

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', (_req, res) => {
  res.json(users);
});

app.get('/api/teams/', (_req, res) => {
  res.json(teams);
});

app.get('/api/activities/', (_req, res) => {
  res.json(activities);
});

app.get('/api/leaderboard/', (_req, res) => {
  const leaderboard = users
    .map((user) => ({
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      points: activities
        .filter((activity) => activity.userId === user.id)
        .reduce((total, activity) => total + activity.points, 0),
    }))
    .sort((firstUser, secondUser) => secondUser.points - firstUser.points);

  res.json(leaderboard);
});

app.get('/api/workouts/', (_req, res) => {
  res.json(workouts);
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
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
