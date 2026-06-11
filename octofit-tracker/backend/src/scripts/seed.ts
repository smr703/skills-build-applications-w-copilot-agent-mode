import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const description = 'Seed the octofit_db database with test data';

const teams = [
  { _id: 't1', name: 'OctoSprinters', mascot: 'Lightning Octopus', memberCount: 2 },
  { _id: 't2', name: 'Tentacle Titans', mascot: 'Iron Octopus', memberCount: 1 },
];

const users = [
  { _id: 'u1', username: 'octo-ada', displayName: 'Ada Lovelace', email: 'ada@example.com', teamId: 't1' },
  { _id: 'u2', username: 'octo-grace', displayName: 'Grace Hopper', email: 'grace@example.com', teamId: 't1' },
  { _id: 'u3', username: 'octo-katherine', displayName: 'Katherine Johnson', email: 'katherine@example.com', teamId: 't2' },
];

const activities = [
  { userId: 'u1', activityType: 'run', durationMinutes: 35, points: 120, completedAt: new Date('2026-06-08T13:00:00Z') },
  { userId: 'u2', activityType: 'cycle', durationMinutes: 50, points: 160, completedAt: new Date('2026-06-09T14:30:00Z') },
  { userId: 'u3', activityType: 'strength', durationMinutes: 40, points: 140, completedAt: new Date('2026-06-10T12:15:00Z') },
];

const leaderboardEntries = [
  { userId: 'u2', username: 'octo-grace', displayName: 'Grace Hopper', points: 160, rank: 1 },
  { userId: 'u3', username: 'octo-katherine', displayName: 'Katherine Johnson', points: 140, rank: 2 },
  { userId: 'u1', username: 'octo-ada', displayName: 'Ada Lovelace', points: 120, rank: 3 },
];

const workouts = [
  { title: 'Morning Cardio Builder', activityType: 'run', durationMinutes: 30, difficulty: 'beginner' },
  { title: 'Core Strength Circuit', activityType: 'strength', durationMinutes: 25, difficulty: 'intermediate' },
  { title: 'Recovery Ride', activityType: 'cycle', durationMinutes: 45, difficulty: 'beginner' },
];

async function seedDatabase() {
  console.log(description);

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Team.insertMany(teams);
  await User.insertMany(users);
  await Activity.insertMany(activities);
  await LeaderboardEntry.insertMany(leaderboardEntries);
  await Workout.insertMany(workouts);

  console.log('Seeded users, teams, activities, leaderboard entries, and workouts.');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void disconnectDatabase();
  });