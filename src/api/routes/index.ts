import { Router } from 'express';
import userRouter from './user';
import reviewRouter from './review';

const router = Router();

router.use('/camps', reviewRouter);
router.use('/users', userRouter);

export default router;
