import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String, required: true },
  },
);

const teamSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberCount: { type: Number, required: true },
  },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
  },
);

export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = models.Workout || model('Workout', workoutSchema);