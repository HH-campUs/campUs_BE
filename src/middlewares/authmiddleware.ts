import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../database/models/user';
import jwt from '../utils/jwt';

dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    //헤더
    console.log('미들 웨어요');
    const accesstoken = String(req.headers.accesstoken);
    const refreshtoken = String(req.headers.refreshtoken);
    //쿠키
    // const accessToken = req.cookies.accessToken;
    // const refreshToken = req.cookies.refreshToken;
    //토큰이 없다면~
    if (!accesstoken)
      return res.status(401).json({ message: 'AccessToken이 존재하지 않습니다.' });
    //에쎄스 토큰 검증하기
    const decodeAccessToken = await jwt.validateAccessToken(accesstoken);
    //인증된 에쎄스 토큰이 없을시
    if (decodeAccessToken === null) {
      //리프레쉬 토큰 없을시
      if (!refreshtoken)return res.status(401).json({ message: 'RefreshToken이 존재하지 않습니다..' });
      //리프레쉬 토큰 검증
      const decodeRefreshToken = await jwt.validateRefreshToken(refreshtoken);
      //리프레쉬 토큰 만료시
      if (decodeRefreshToken == false) return res.status(401).json({ message: 'RefreshToken이 일치하지 않거나 만료 되었습니다.' });
      let userId = decodeRefreshToken.userId;
      //리프레쉬 토큰이 있을때 유저정보로 찾아오기
      const findUser = await User.findByPk(userId);
      const findRefreshToken = findUser!.refreshToken;
      //암호화해서 저장된 리프레쉬 토큰이랑 같은지 검증
      const campareRefreshToken = bcrypt.compareSync(refreshtoken,findRefreshToken);
      if (campareRefreshToken == false)return res.status(401).json({ message: 'RefreshToken이 일치하지 않거나 만료 되었습니다.' });
      // 리프레쉬 정상에 AccessToken 만료시 재발급
      const AccessToken = await jwt.createAccessTokenRe(userId);
      //쿠키로 보내줌
      res.cookie('accessToken', AccessToken);
      //프론트에서 로컬 스토리지에 저장하기 위해 res에 보내줌
      User.findByPk(userId).then((user) => {
        console.log('재발급하고 지나갔네요');
        res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
        next();
      });
    } else {
      let userId = decodeAccessToken.userId;
      User.findByPk(userId).then((user) => {
        console.log('정상일때 지나갔네요 ');
        res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
        next();
      });
    }
  } catch (err) {
    next(err);
  }
};

// const { token } = req.cookies //쿠키에 있는 토큰을 받아옴
// console.log(!token)
// if (!token){ //토큰이 없을시 예외처리
// res.status(401).send({
// errorMessage : '로그인이 필요한 기능입니다.'
// })
// return;
// }
// try { //검증
// const { userId } = jwt.verify(token, process.env.SECRET_KEY);  //시크릿 키값으로 토큰을 검증함
// User.findByPk(userId).then((user) => {
// res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
// next();
// });
// } catch (error) {
// res.status(401).send({
// errorMessage: "로그인 후 이용 가능한 기능입니다.",
// });
// }
//리프레쉬 토큰 검증 api , 생성하고 디비에 저장, 암호화 해야함(해싱), 로그인할떄 디비 ㅡ 해싱한거 확인.

// z클라이언트에서 보내줄때 사용
//     const { authorization } = req.headers;
//     // console.log(req.headers,"미들")
//     const [authType, authToken] = (authorization || '').split(' ');
//     if (!authToken || authType !== 'Bearer') {
//       return res.status(401).send({
//         errorMessage: '로그인 후 이용 가능한 기능입니다.',
//       });
//     }

//     try {
//       const { userId } = jwt.verify(authToken, SECRET_KEY);
//       User.findByPk(userId).then((user) => {
//         res.locals.user = user;
//         next();
//       });
//     } catch (err) {
//       res.status(401).send({
//         errorMessage: '로그인 후 이용 가능한 기능입니다.',
//       });
//     }
//   };
