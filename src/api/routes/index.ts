import { Router } from 'express';
import userRouter from './user';
import reviewRouter from './review';
import campRouter from './camp';
import Weather from './weather';
import kakao from './kakao';


const router = Router();

router.use('/users', userRouter);
router.use('/kakao',kakao)
router.use('/', campRouter);
router.use('/weathers', Weather);
router.use('/camps', reviewRouter);
router.use('/users', reviewRouter);
router.use('/search', reviewRouter);

export default router;
