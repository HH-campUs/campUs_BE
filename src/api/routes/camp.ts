import { Router } from 'express';
import Camp from '../camp/campControl';

const router = Router();

router.get('/camps', Camp.getTopicCamp);

export default router;
