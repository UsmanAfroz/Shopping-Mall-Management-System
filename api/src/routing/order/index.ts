import { AsyncRouter } from "express-async-router";
import { withAuth } from "../../middleware/withAuth";
import { CreateOrder } from "../../controller/OrderController";
const router = AsyncRouter();

router.get('/getCart', withAuth)
router.post('/createCart', withAuth);
router.put('/updateCart', withAuth);
router.delete('/deleteCart', withAuth);
router.use('/create',withAuth, CreateOrder);

export default router;