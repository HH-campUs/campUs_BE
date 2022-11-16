import { Router } from 'express';
import campRouter from './camp'
import userRouter from './user';

const router = Router();

router.use('/users', userRouter);
router.use('/camps', campRouter);

export default router;