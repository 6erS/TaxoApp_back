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
        hash: { type: String, require: true },
        salt: { type: String, require: true }
    },
    personalPhoto: String,
    techCert: {
        photo:[ { type: String, required: true } ],
        VIN: { type:String, require: true }
    },
    driverLic: {
        photo:[ { type: String, require: true } ],
        VIN: { type:String, require: true }
    }
});

export const Driver = mongoose.model('Driver', driverSchema);