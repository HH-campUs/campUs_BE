import { Users } from '../../interface/user';
import { User } from '../../database/models/user';

export default {
  //회원가입
  signup: async ({email, nickname, password }: Users) => {
    await User.create({email, nickname, password });
  },
  //유저정보 찾기
  findUser: async (email:string)=>{
    return await User.findOne({where:{email}})

  },
  //로그인
  login: async ({email, nickname, password }: Users) => {
    await User.create({email, nickname, password });
  },
  //토큰 업데이트
  updaterefreshToken: async ({email, RefreshToken}:Users)=>{
    const refreshToken = RefreshToken
    await User.update({refreshToken},{where : {email}})
  },
  updateUser: async ({nickname , profileImg}:Users)=>{
    await User.update({nickname,profileImg},{where : {}})
  }
};
