import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);
