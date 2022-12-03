import { Router } from 'express';
import weather from '../weather/weatherControl';
const router = Router();

//날씨 조회
router.get('/', weather.getweather);
//토요일 날씨만 받기
router.get('/recommend', weather.getReCommend)
export default router;
