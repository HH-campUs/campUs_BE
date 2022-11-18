import { Router } from 'express';
import weather from '../weather/weatherControl';
const router = Router();

router.get('/', weather.getweather);

export default router;
