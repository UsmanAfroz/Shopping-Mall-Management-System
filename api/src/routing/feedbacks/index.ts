import { AsyncRouter } from "express-async-router";
import { withAuth } from "../../middleware/withAuth";
import { getFeedbacks, createFeedbacks } from "../../controller/feedbackControllers";

const router = AsyncRouter();

router.get('/getfeedbacks', getFeedbacks);
router.post('/createFeedback', withAuth, createFeedbacks);

export default router;