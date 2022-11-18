import { Router } from 'express';
import authmiddleware from '../../middlewares/authmiddleware';
import User from '../user/userControl';
const router = Router();

router.post('/signup', User.signup);
router.post('/login', User.login);
//유저정보 수정
router.put('/myPage', authmiddleware, User.updateUser);
//마이페이지 조회
router.get('/myPage', authmiddleware, User.getmyPage);

export default router;
