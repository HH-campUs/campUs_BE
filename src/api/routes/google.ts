import { Router } from 'express';
import google from '../../utils/googlejwt'
const router = Router();

router.post('/',google);

export default router;
