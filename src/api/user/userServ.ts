import userRepo from './userRepo';
import { Users } from '../../interface/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Error from '../../utils/exceptions';
dotenv.config();

//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함
export default {
  signup: async ({ email, password }: Users) => {
    // try{
    const findUser = await userRepo.findUser(email!);
    if (email === findUser?.email) {
      throw new Error.ValidationErrors('중복된 이메일 입니다.');
    }
    const signUser = {
      email: email,
      nickname: email!.split('@')[0],
      password: await bcrypt.hash(password!, Number(process.env.SALT_ROUND)),
    };
    await userRepo.signup(signUser);
    // }catch(err){
    //   console.log(err ,"서비스에서 잡았어요")
    // }
  },
  login: async ({ email, password }: Users) => {
    // try{
    const findUser = await userRepo.findUser(email!);
    if (email === findUser?.email) {
      throw new Error.ValidationErrors('중복된 이메일 입니다.');
    }
    const signUser = {
      email: email,
      nickname: email!.split('@')[0],
      password: await bcrypt.hash(password!, Number(process.env.SALT_ROUND)),
    };
    await userRepo.login(signUser);
    // }catch(err){
    //   console.log(err ,"서비스에서 잡았어요")
    // }
  },
  updateUser: async ({ nickname, profileImg }: Users) => {
    const updateUser = { nickname, profileImg };
    await userRepo.updateUser(updateUser);
  },
  getmyPage: async (userId: number) => {
    console.log('서비스임', userId);
    const app = await userRepo.getmyPage(userId);
    console.log(app, 't서비스에서 찾은값');
    return app;
  },
};
