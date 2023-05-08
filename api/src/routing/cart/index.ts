import { AsyncRouter } from "express-async-router";
import { withAuth } from "../../middleware/withAuth";
// import { getMall, createMall , mallUpdate , delMall } from '../../controller/mallController';
import { createCart, getCartlist, delCart, updateCart,createTemp,getTempData,deleteTempData } from "../../controller/cartController";
import chargeController from "../../controller/chargeController";
const router = AsyncRouter();

router.get('/getCartList', withAuth, getCartlist)
router.post('/createCart', withAuth, createCart);
router.put('/updateCart', withAuth, updateCart);
router.delete('/deleteCart', withAuth, delCart);
router.post('/addTemp',createTemp);
router.get('/getTemp/:id',getTempData);
router.delete('/deleteTemp/:id',deleteTempData)
router.post("/chargeStripe",withAuth,chargeController);
export default router;