import { Router } from 'express';
import campRouter from './camp'
import userRouter from '../routes/user';

const router = Router();

router.use('/users', userRouter);
router.use('/camps', campRouter);

export default router;