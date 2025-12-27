// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  loginType: {
    type: String,
    enum: ['worker', 'workProvider'],
    required: true,
  },
  workId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workModel',
  }],
  address: {
    type: String,
    default: null,
  },
  workerType: {
    type: String,
    enum: ['electric', 'majdur', 'kariger'],
  },
  profile: [{
    profileImage: {
      type: String,
    },
    experience: {
      type: String,
    },
    charges: {
      type: Number,
    },
  }]
}, { timestamps: true });

export const UserModel = mongoose.model('UserModel', UserSchema);
