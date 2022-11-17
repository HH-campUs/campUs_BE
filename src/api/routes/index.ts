import { Router } from 'express';

import userRouter from './user';
import reviewRouter from './review';
import campRouter from './camp';

const router = Router();

router.use('/camps', reviewRouter);
router.use('/users', reviewRouter);

router.use('/users', userRouter);
router.use('/camps', campRouter);

export default router;
