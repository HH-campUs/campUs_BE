import { Router } from 'express';
import reviewRouter from './review';

const router = Router();

router.use('/camps', reviewRouter);
router.use('/users', reviewRouter);

export default router;
