/* 
import passport from 'passport';
import User from '../database/models/user';
import kakao from './kakaoSrategy';

export default () => {
  // serializeUser => 사용자 정보 객체를 세션에 아이디로 저장
  passport.serializeUser((user,done)=>{
    console.log(user,"sdafsdafsdafdasfdsa")
    // const userId = user.id
    // done(null, user); //user.id 가능
  })

  //deserializeUser => 세션에 저장한 아이디를 통해서 사용자 정보 객체를 불러옴
  passport.deserializeUser((id, done) => {
    //? 두번 inner 조인해서 나를 팔로우하는 followerid와 내가 팔로우 하는 followingid를 가져와 테이블을 붙인다
    User.findOne({ where: { id } })
       .then(user => done(null, user))
       .catch(err => done(err));
  });
  kakao(); //카카오 실행
};
 */