import mongoose from 'mongoose';

const { Schema } = mongoose;

const floorSchema = new Schema({
  totalFloors: { type: Number, required: true },
  totalShops: { type: Number, required: true },
  AvailableShops: { type: Number },
});

export const Floor = mongoose.model('floor', floorSchema);
