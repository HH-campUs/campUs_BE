import { Router } from 'express';
import Camp from '../camp/campControl';
import authmiddleware from '../../middlewares/authmiddleware';

const router = Router();

router.get('/camps', Camp.getTopicCamp);
router.post('/users/:campId', authmiddleware, Camp.myTripSave)
router.delete('/users/:tripId', authmiddleware, Camp.myTripRemove)
router.put('/users/:campId/pick', authmiddleware, Camp.campPick)
// router.put('/users/:campId/pick', authmiddleware, Camp.campUnPick)

export default router;
