import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    quantity: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    FirstName : String,
    LastName : String,
    Address : String,
    City: String, 
    state: String,
    phoneNumber: String,
    country: String,
    postalCode : String,
    DeliveryMethod:String,
    CVC : String,
    Amount: String,
});

export const Order = mongoose.model("order", orderSchema);