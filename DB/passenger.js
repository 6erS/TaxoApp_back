import mongoose from "mongoose";
const { Schema } = mongoose;

const passengerSchema = new Schema({
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
    
    personalPhoto: String
});

export const Passanger = mongoose.model('Passenger', passengerSchema);