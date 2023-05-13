import { AsyncRouter } from 'express-async-router';
import { withAuth } from '../../middleware/withAuth';
import { getFloors, createFloor, delFloor } from '../../controller/floorController';

const router = AsyncRouter();

router.get('/getFloors', getFloors);
router.post('/create', withAuth, createFloor);
router.delete('/delete', withAuth, delFloor);

export default router;
