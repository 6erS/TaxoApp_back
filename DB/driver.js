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
    password: {
        type: String,
        require: true
    },
    personalPhoto: String,
    docPhotos: [String],
    carPhotos: [String]
});

export const Driver = mongoose.model('Driver', driverSchema);