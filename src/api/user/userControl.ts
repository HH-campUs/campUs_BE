//서비스로 불러와서 바로 사용가능 서비스도 인스턴스로 내보내기
import { Request, Response, NextFunction } from 'express';
import { Users } from '../../interface/user';
import userServ from './userServ';
import {signSchema} from '../../utils/validation'
//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함

export default {

  signup: async (req: Request, res: Response, next: NextFunction) => {
    try
    {
      const { email, password }: Users = await signSchema.validateAsync(req.body);
      const signupUser = { email, password };
      await userServ.signup(signupUser)
      res.status(200).send({ message: '회원가입 성공' });
    } catch (err)
    {
      next(err)
    }
  },
}

