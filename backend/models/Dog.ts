import mongoose, { Schema } from 'mongoose';

const DogSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    weight: { type: Number },
    location: { type: String, required: true },

    // GeoJSON for geospatial queries
    coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },

    images: [{ type: String }],
    description: { type: String },

    // Owner
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Admin repo used 'owner', User used 'ownerId'. 
    // We will keep 'ownerId' as primary but can add virtual if needed.

    // Status
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

    // Extended Fields
    spayedNeutered: { type: Boolean, default: false },
    microchipped: { type: Boolean, default: false },
    breedingRights: { type: Boolean, default: false },
    lastRabiesShot: { type: Date },
    nextVaccinationDue: { type: Date },
    knownAllergies: { type: String },
    geneticConditions: [{ type: String }],

    healthStatus: {
        vaccinated: { type: Boolean, default: false },
        geneticScreening: { type: Boolean, default: false }
    }
}, { timestamps: true });

DogSchema.index({ coordinates: '2dsphere' }); // Geo index

export default mongoose.model('Dog', DogSchema);
