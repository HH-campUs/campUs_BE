import { Router } from 'express';
import User from '../api/user/userControl';

const router = Router();

router.use('/', User.signup);
export default router;
