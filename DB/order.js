import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    driverPhoneNumber: { type: String, unique: true, require: true },
    passengerPhoneNumber: { type: String, unique: true, require: true },
    driverFirstName: { type: String, require: true },
    passengerFirstName: { type: String, require: true },
    orderStatus: { type: String, require: true },
    coordinates: [{  latitude: { type: Number, require: true, default: 0 },
                longitude: { type: Number, require: true, default: 0 } }],
    distance: { type: Number, require: true }
});

export const Order = mongoose.model('Order', orderSchema);