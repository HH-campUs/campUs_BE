import userRepo from './userRepo';
import User from  '../../database/models/user'
import { SignUser } from '../../interface/user'
import bcrypt from 'bcrypt'

//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함

export default {
  signUp : async ({profileImg, email, nickname, password}:SignUser) => {
    const signUser = {
        profileImg: profileImg,
        email: email,
        nickname: nickname,
        password: await bcrypt.hash(password, 10),
    }
    await userRepo.SignUp(signUser);
    console.log('레포여');
  }
}
