import { Router } from 'express';
import userRouter from './user';
import reviewRouter from './review';
import campRouter from './camp';
import Weather from './weather';
import kakao from './kakao';
import google from './google';

const router = Router();

router.use('/users', userRouter);
router.use('/kakao',kakao)
router.use('/google',google)
router.use('/', campRouter);
router.use('/weathers', Weather);
router.use('/reviews', reviewRouter);
router.use('/', reviewRouter);

export default router;
