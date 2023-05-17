import { AsyncRouter } from "express-async-router";
import { withAuth } from "../../middleware/withAuth";
import { CreateOrder,GetOrders,deleteOrder,updateOrders } from "../../controller/OrderController";
const router = AsyncRouter();

router.get('/getCart', withAuth)
router.post('/createCart', withAuth);
router.put('/updateCart', withAuth);
router.delete('/deleteCart', withAuth);
router.post('/createOrder',withAuth, CreateOrder);
router.get('/getOrders',withAuth,GetOrders);
router.patch('/updateOrders/:id',withAuth,updateOrders);
router.delete('/deleteOrder/:id',withAuth),deleteOrder;

export default router;