import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Error from '../utils/exceptions'
import {Users} from '../interface/user'
import UserRepo from '../api/user/userRepo'
dotenv.config()
export default {
  //리프레쉬 토큰 발급
  createTokens:async ({email, password}:Users)=>{ 
      //유저정보 확인
      const user = await UserRepo.findUser(email!);
      //유저확인
      if (!user) {
        throw new Error.ValidationErrors('유저가 없거나 비밀번호가 일치하지 않습니다.');
      }
      //비밀 번호 확인
      const encryptedPassword = bcrypt.compareSync(password!, user!.password);
      if(encryptedPassword === false){
        throw new Error.ValidationErrors('유저가 없거나 비밀번호가 일치하지 않습니다.');
      }
      //리프레쉬 발급
      const refreshToken = jwt.sign(
        { userId: user.userId },
        process.env.JWT_KEY!,
        { expiresIn: '7d' }
      ); // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
      //에세스 토큰 발급
      const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.JWT_KEY!,
            { expiresIn: '10s' }
          );
      //리프레쉬 암호화
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND!));
      const RefreshToken = bcrypt.hashSync(refreshToken, salt);
      //리프레쉬 저장
      await UserRepo.updaterefreshToken({email, RefreshToken});
      return {refreshToken,accessToken}
  },
  //  //에세스 토큰 검증
  //  validateAccessToken = async (accessToken) => {
  //   try {
  //     return jwt.verify(accessToken, process.env.SECRET_KEY); // JWT에서 Payload를 가져옵니다.
  //   } catch (error) {
  //     return null;
  //   }
  // };
  // //리프레쉬 토큰 검증
  // validateRefreshToken = async (refreshToken) => {
  //   try {
  //     return jwt.verify(refreshToken, process.env.SECRET_KEY); // JWT를 검증합니다.
  //   } catch (error) {
  //     return false;
  //   }
  // };
  // //에세스 토큰 재발급
  // createAccessTokenRe = async (userId) => {
  //   return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
  //     expiresIn: '10s',
  //   }); // JWT에서 Payload를 가져옵니다.
  // };
}

