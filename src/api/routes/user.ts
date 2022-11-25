import { Router } from 'express';
import authmiddleware from '../../middlewares/authmiddleware';
import { upload } from '../../utils/multer';
import User from '../user/userControl';

const router = Router();
//회원가입 중복체크
router.post('/signup/check',User.signupcheck)
//회원가입
router.post('/signup', User.signup);
//로그인
router.post('/login', User.login);
//유저정보 수정
router.put('/myPage', authmiddleware, upload.single('profileImg') ,User.updateUser);
//사진 여러장
router.put('/mypages',authmiddleware, upload.array('profileImg'),User.updatesUser)
//마이페이지 조회
router.get('/myPage', authmiddleware, User.getmyPage);

export default router;
