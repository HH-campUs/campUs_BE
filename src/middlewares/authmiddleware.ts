import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../database/models/user';
import jwt from '../utils/jwt';
import {Unauthorized} from '../utils/exceptions'
import { token } from '../interface/user';

dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { authorization , refreshtoken }:token = req.headers
  if(!authorization) throw new Unauthorized("인가 요청 정보가 잘 못 되었습니다.")
  const tokenType = authorization?.split(" ")[0]
  const accesstoken = authorization?.split(" ")[1]
  const refreshToken = refreshtoken?.split(" ")[0]
    if(tokenType !== "Bearer") throw new Unauthorized('토큰 타입이 다릅니다.')
    //토큰이 없다면~
    if (!accesstoken) throw new Unauthorized('AccessToken이 존재하지 않습니다.' );
    //에쎄스 토큰 검증하기
    const decodeAccessToken = await jwt.validateAccessToken(accesstoken);
    //인증된 에쎄스 토큰이 없을시
    if (decodeAccessToken === null) {
      //리프레쉬 토큰 없을시
      if (!refreshToken) throw new Unauthorized('RefreshToken이 존재하지 않습니다.');
      //리프레쉬 토큰 검증
      const decodeRefreshToken = await jwt.validateRefreshToken(refreshToken);
      //리프레쉬 토큰 만료시
      if (decodeRefreshToken == false) throw new Unauthorized('RefreshToken이 일치하지 않거나 만료 되었습니다.');
      let userId = decodeRefreshToken.userId;
      //리프레쉬 토큰이 있을때 유저정보로 찾아오기
      const findUser = await User.findByPk(userId);
      const findRefreshToken = findUser!.refreshToken;
      //암호화해서 저장된 리프레쉬 토큰이랑 같은지 검증
      const campareRefreshToken = bcrypt.compareSync(
        refreshToken,
        findRefreshToken
      );
      if (campareRefreshToken == false) throw new Unauthorized('RefreshToken이 일치하지 않거나 만료 되었습니다.');
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