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
    password: {
        hash: { type: String, require: true },
        salt: { type: String, require: true }
    },
    personalPhoto: {
        type: String,
        require: true
    }
});

export const Passanger = mongoose.model('Passenger', passengerSchema);