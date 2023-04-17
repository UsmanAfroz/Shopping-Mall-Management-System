import { AsyncRouter } from "express-async-router";
import { withAuth } from "../../middleware/withAuth";
import { getProducts, createProduct, updateProduct, delProduct, getProductByID, getProductwithPk, getUserProducts ,editProduct} from '../../controller/productController';
import multer from 'multer';
import { storage } from '../../middleware/imageuploader/imageuploader';

const upload = multer({ storage: storage });

const router = AsyncRouter();

router.get('/getProduct', withAuth, getProducts)
router.post('/createProduct', withAuth, upload.array('pictures', 10), createProduct);
router.put('/updateProduct', withAuth, upload.array('pictures', 10), updateProduct);
router.get('/getProductByID/:id', withAuth, getProductByID)
router.get('/getProductwithPk/:id', getProductwithPk)
router.delete('/deleteProduct', withAuth, delProduct);
router.get('/getUserProducts/:id', getUserProducts)
router.put('/editProduct/:id',upload.single('pictures'),editProduct)

export default router;