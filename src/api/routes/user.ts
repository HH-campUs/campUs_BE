import { Router } from 'express';
import authmiddleware from '../../middlewares/authmiddleware';
import { upload } from '../../utils/multer';
import User from '../user/userControl';
import {validateBody} from '../../utils/validation'; 
import {createUserDto} from '../../utils/validation'

const router = Router();
//회원가입 중복체크
router.post('/signup/check',validateBody(createUserDto),User.signupcheck)
//회원가입
router.post('/signup', validateBody(createUserDto),User.signup);
//로그인
router.post('/login', validateBody(createUserDto),User.login);
//유저정보 수정
router.put('/myPage', authmiddleware, upload.single('profileImg') , User.updateUser);
//마이페이지 조회
router.get('/myPage', authmiddleware, User.getmyPage);

export default router;
