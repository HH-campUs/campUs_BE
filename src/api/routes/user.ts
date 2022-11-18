import { Router } from 'express';
import User from '../user/userControl';

const router = Router();

router.post('/signup', User.signup);
router.post('/login', User.login)
router.get('/logout',User.logout )
router.put('/myPage',User.updateUser)
export default router;
