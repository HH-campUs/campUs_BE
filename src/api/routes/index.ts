import { Router } from 'express';

import userRouter from './user';
import reviewRouter from './review';
import campRouter from './camp';
import Weather from '../routes/weather';

const router = Router();

router.use('/camps', reviewRouter);
router.use('/users', userRouter);
router.use('/camps', campRouter);
router.use('/weathers', Weather);
export default router;
