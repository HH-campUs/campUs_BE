import userRepo from './userRepo';
import { Users } from '../../interface/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함

export default {
  signup: async ({ profileImg, email, nickname, password }: Users) => {
    const signUser = {
      profileImg: profileImg,
      email: email,
      nickname: nickname,
      password: await bcrypt.hash(password, Number(process.env.SALT_ROUND)),
    };

    await userRepo.signup(signUser);
    console.log('레포여');
  },
};
