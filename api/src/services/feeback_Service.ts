import { Feedback } from "../models/feeback";
import { IFeedback } from "../interfaces/feeback";

export const Feedbacks = async () => {
    const feedBacks = await Feedback.find();
    return feedBacks;
}

export const addFeedback = async (feedBackData: IFeedback) => {
    const feedBacks = new Feedback(feedBackData);
    await feedBacks.save();
    return feedBacks;
}