import { Request, Response } from "express";
import { Feedbacks, addFeedback } from "../services/feeback_Service";

export const getFeedbacks = async (req: Request, res: Response) => {
    try {
        const feedbackData = await Feedbacks();
        return res.send({ statusCode: 200, data: feedbackData })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}

export const createFeedbacks = async (req: Request, res: Response) => {
    const feedbackData = req.body;
    try {
        const feedback = await addFeedback(feedbackData);
        return res.send({ statusCode: 200, data: feedback })
    }
    catch (err: any) {
        return res.send({ statusCode: 500, message: err?.message })
    }
}
