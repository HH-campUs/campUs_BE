//서비스로 불러와서 바로 사용가능 서비스도 인스턴스로 내보내기
import { Request, Response, NextFunction } from 'express';
import { Users } from '../../interface/user';
import userServ from './userServ';
import { signSchema } from '../../utils/validation';
import Token from '../../utils/jwt';
import Error from '../../utils/exceptions';
//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: Users = await signSchema.validateAsync(
        req.body
      );
      const signupUser = { email, password };
      await userServ.signup(signupUser);
      res.status(201).send({ message: '회원가입 성공' });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: Users = await signSchema.validateAsync(
        req.body
      );
      const loginUser = { email, password };
      const Tokens = await Token.createTokens(loginUser);
      res.cookie('accessToken', Tokens.AccessToken); // Access Token을 Cookie에 전달한다.
      res.cookie('refreshToken', Tokens.RefreshToken);
      res.status(200).send(Tokens);
    } catch (err) {
      next(err);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickname, profileImg }: Users = req.body;
      const updateUser = { nickname, profileImg };
      await userServ.updateUser(updateUser);
      res.status(201).send({ message: '수정 완료' });
    } catch (err) {
      next(err);
    }
  },
  getmyPage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId }: Users = res.locals.user;
      const myPage = await userServ.getmyPage(userId!);
      console.log(userId);
      res.status(200).json({ myPage });
    } catch (err) {
      next(err);
    }
  },
};
