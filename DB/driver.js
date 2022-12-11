import mongoose from "mongoose";
const { Schema } = mongoose;

const driverSchema = new Schema({
    phoneNumber: {
        type: String,
        unique: true,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    secondName: {
        type: String,
        require: true,
    },
    passwordHash: { type: String, require: true },

    VIN: { type: String, require: true },

    driverLicID: { type: String, require: true },

    tariff: { type: Number, require: true },

    isAvailable: { type: Boolean, require:true, default: false },
    
    coordinates: {
        latitude: { type: Number, require: true, default: 0 },
        longitude: { type: Number, require: true, default: 0 }
    }
});

export const Driver = mongoose.model('Driver', driverSchema);