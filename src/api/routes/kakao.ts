import { Request, Response,NextFunction,Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import {User} from '../../database/models/user'
import { profile } from '../../interface/user';
const router = Router();
// ,'account_email'
//* 카카오로 로그인하기 라우터 ***********************
//? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
router.get('/',passport.authenticate('kakao', {scope: ['profile_nickname', 'profile_image'],})
); //scope 속성

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
//? 그리고 passport 로그인 전략// kakaoStrategy에서 실패한다면 실행

const kakaoCallback =(req:Request,res:Response,next:NextFunction)=>{
  try{
    passport.authenticate('kakao',{failureRedirect : "/login"}, //인증 실패시 콜백
    (err:Error, user:profile, info)=>{
    if(err) return next(err)
    console.log(user)
    })
    }catch(err){
      next(err);
    }
}

router.get('/callback', kakaoCallback);


export default router;
