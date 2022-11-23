import userRepo from './userRepo';
import { Users } from '../../interface/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Error from '../../utils/exceptions';
import S3 from '../../utils/multer'
dotenv.config();

//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함
export default {
  //회원가입
  signup: async ({ email, password }: Users) => {
    try{
    const findUser = await userRepo.findUser({email});
    if (email === findUser?.email) {
      throw new Error.ValidationErrors('중복된 이메일 입니다.');
    }
    const signUser = {
      email: email,
      nickname: email!.split('@')[0],
      password: await bcrypt.hash(password!, Number(process.env.SALT_ROUND)),
    };
    await userRepo.signup(signUser);
    }catch(err){
      return err
    }
  },
  //로그인
  login: async ({ email, password }: Users) => {
    // try{
    const findUser = await userRepo.findUser({email});
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
  //유저 정보 수정
  updateUser: async ({ nickname, profileImg, userId }: Users) => {
    const findUser = await userRepo.findByPk({userId});
    if (findUser?.userId !== userId) {
      throw new Error.ValidationErrors('유저가 일치 하지 않습니다');
    }
    const findImage = await userRepo.findImage({userId})
    const fileName = findImage?.profileImg.slice(54)
    const fileDir = findImage?.profileImg.slice(49,53)
    const url = findImage?.profileImg.slice(0,48)
    if(process.env.S3_URL! === url){
      //S3사진 삭제 로직
      S3.deleteFile(fileDir!,fileName!)
    }
    await userRepo.updateUser({nickname, profileImg, userId});
  },
  //마이페이지 요청
  getmyPage: async ({userId}:Users) => {
    const findUser = await userRepo.findByPk({userId});
    if (findUser?.userId !== userId) {
      throw new Error.ValidationErrors('유저가 일치 하지 않습니다');
    }
    return await userRepo.getmyPage({userId});
  },
};
