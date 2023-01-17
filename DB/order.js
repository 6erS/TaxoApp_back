import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    driverID: { type: String, require: true },
    passangerID: { type: String, require: true },
    driverFirstName: { type: String, require: true },
    passengerFirstName: { type: String, require: true },
    orderStatus: { type: String, require: true },
    startAddress: { type: String, require: true },
    endAddress: { type: String, require: true },
    distance: { type: Number, require: true },
    price: { type: Number, require: true },
});

export const Order = mongoose.model('Order', orderSchema);