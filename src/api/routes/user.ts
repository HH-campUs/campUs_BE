import { Router } from 'express';
import authmiddleware from '../../middlewares/authmiddleware';
import { upload } from '../../utils/multer';
import User from '../user/userControl';
import userDto from '../../utils/validation'; 

const router = Router();
//회원가입 중복체크
router.post('/signup/check',userDto,User.signupcheck)
//회원가입
router.post('/signup', userDto,User.signup);
//로그인
router.post('/login', userDto,User.login);
//비밀번호 재설정
router.put('/changePW',userDto,User.changePW)
//유저정보 수정
router.put('/myPage', authmiddleware, upload.single('profileImg'), User.updateUser);
//마이페이지 조회
router.get('/myPage', authmiddleware, User.getmyPage);
//내가 찜한 캠핑장 조회
router.get('/myPage/myPick',authmiddleware, User.getMyPick)
//나와 가까운 캠핑장 조회
router.get('/nearCamp', User.nearCamp)

export default router;
