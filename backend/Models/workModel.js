import mongoose from 'mongoose';

export const workSchema = new mongoose.Schema({
  workerType: {
    type: String,
    enum: ['electric', 'majdur', 'kariger'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  PyMeant: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel', // Must match model name
    required: true,
  },
  workDescription: {
    type: String,
  },
  workPostData: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export const workModel = mongoose.model('workModel', workSchema);
