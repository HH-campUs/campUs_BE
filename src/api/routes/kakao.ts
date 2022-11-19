import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();
// ,'account_email'
//* 카카오로 로그인하기 라우터 ***********************
//? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
router.get('/',passport.authenticate('kakao', {scope: ['profile_nickname', 'profile_image'],})
); //scope 속성

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
//? 그리고 passport 로그인 전략// kakaoStrategy에서 실패한다면 실행

router.get('/callback',passport.authenticate('kakao', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // kakaoStrategy에서 성공한다면 콜백 실행
    res.redirect('/');
  }
);

export default router;
