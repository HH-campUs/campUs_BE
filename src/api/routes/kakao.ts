import { Request,NextFunction, Response, Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv'
import kakao from '../../utils/kakaojwt'
// import passportCogfig from '../../passport/index';

//패스포트 임포트 해줘야 가능하다.
// passportCogfig();
dotenv.config()
const router = Router();

// kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
/* router.get('/',passport.authenticate('kakao', {scope: ['profile_nickname', 'profile_image'],})); //scope 속성
 router.post('/', (req,res,next)=>{
  let {authorization} = req.headers;
  console.log(req.headers)
  console.log(authorization)
  res.send("ddd")
}) */

router.post('/',kakao);

export default router;
