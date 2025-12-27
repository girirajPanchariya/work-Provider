// Models/ApplicationModel.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    workId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workModel",
        required: true
    },
    states: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    message: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export const ApplicationModel = mongoose.model('ApplicationModel', ApplicationSchema);
