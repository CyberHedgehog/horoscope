import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
});
