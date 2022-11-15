import { Router } from 'express';
import User from '../user/userco';

const router = Router();

router.use('/', User.signup);
export default router;
