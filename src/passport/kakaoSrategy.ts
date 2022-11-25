import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../database/models/user';
import { profile } from '../interface/user';
dotenv.config();
const KakaoPassport = require('passport-kakao').Strategy;
//Strategy => 카카오톡 스토리지 안에있는 클래스 적용
//KakaoPassport => 인터페이스 및 클래스 사용

export default () => {
  //passport 카카오가 정한 인터페이스
  passport.use(
    new KakaoPassport(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: process.env.KAKAO_URL!,
      },
      async (accessToken: string, refreshToken: string, profile:profile, done: any) => {
        try {
          const profileImg = profile._json.properties.profile_image;
          const kakaoId = profile._json.id;
          const nickname = profile._json.properties.nickname;
          const exUser = await User.findOne({
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            where: { kakaoId, provider: 'kakao' },
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              kakaoId: kakaoId,
              nickname: nickname,
              provider: 'kakao',
              profileImg: profileImg,
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};

