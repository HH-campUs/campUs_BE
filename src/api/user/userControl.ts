//서비스로 불러와서 바로 사용가능 서비스도 인스턴스로 내보내기
import { Request, Response, NextFunction } from 'express';
import { User } from '../../database/models/user';
import { SignUser } from '../../interface/user'
import userServ from './userServ';

//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함

export default {

  signup : async (req: Request, res: Response, next: NextFunction) => {
      const { profileImg, email, nickname, password }:SignUser = req.body;
    try {
      const signUser = { profileImg, email, nickname, password }
      // console.log(profileImg, email, nickname, password); 
      await userServ.signUp(signUser);
      res.status(200).send({ message: '회원가입 성공' });
    } catch (err) {
      console.log(err);
      console.trace(err);
      res.status(400).send({ errorMessage: '회원가입 실패' });
    }
  }
}

