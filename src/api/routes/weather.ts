import { Router } from 'express';
import weather from '../weather/weatherControl';
const router = Router();

//날씨 조회
router.get('/', weather.getweather);

export default router;
