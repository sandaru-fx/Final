import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema({
    initiatorDogId: { type: Schema.Types.ObjectId, ref: 'Dog', required: true },
    receiverDogId: { type: Schema.Types.ObjectId, ref: 'Dog', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    initiatorOwnerId: { type: Schema.Types.ObjectId, ref: 'User' },
    receiverOwnerId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Match', MatchSchema);
