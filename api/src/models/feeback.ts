import mongoose from "mongoose";

const { Schema } = mongoose;

const feedbackSchema = new Schema({
    message: String,
    username: String,
    shopId: String,
});

export const Feedback = mongoose.model("feedback", feedbackSchema);