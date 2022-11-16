import { Router } from 'express';
import User from '../user/userControl';

const router = Router();

router.post('/signup', User.signup);
export default router;
