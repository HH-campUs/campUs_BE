import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Users } from "../interface/user";
import bcrypt from 'bcrypt';
import User from "../database/models/user";
import axios from "axios";
import { Unauthorized } from "./exceptions";

export default async (req:Request, res:Response, next:NextFunction) => {
  try{
    //토큰 생성 및 토큰 전달 함수
  const kakaojwt = async (userId:number)=>{
    const AccessToken = jwt.sign(
      { userId: userId },
      process.env.JWT_KEY!,
      { expiresIn: "3h" }
    );
    const RefreshToken = jwt.sign(
      { userId: userId },
      process.env.JWT_KEY!,
      { expiresIn: "7d" }
    );
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND!));
    const refreshToken = bcrypt.hashSync(RefreshToken, salt);
    await User.update({refreshToken}, {where : {userId}})
    res.cookie("refreshToken", RefreshToken);
    res.cookie("accessToken", AccessToken);
    res.status(200).json({
              message: "로그인 성공",
              accesstoken: AccessToken,
              refreshtoken: RefreshToken,
            })
          }

    const {authorization}=req.headers;
    if(!authorization) throw new Unauthorized("토큰 정보가 없습니다.")
    const kakaoAccessToken = authorization
  const { data: kakaoUser }  = await axios('https://kapi.kakao.com/v2/user/me', {
    headers: {
    Authorization: `Bearer ${kakaoAccessToken}`,
    },
  }); //유저 정보를 받아온다
console.log(kakaoUser,"<=카카오 에서 받아옴")

const profileImg:string = kakaoUser.properties.profile_image
const kakaoId:number = kakaoUser.id
const nickname:string = kakaoUser.properties.nickname
const provider:string = 'kakao'
const email:string = kakaoUser.kakao_account.email
const exUser = await User.findOne({
  where : {kakaoId, provider}
})
if(!exUser){
  const newUser = await User.create({kakaoId,nickname,provider,profileImg,email});
  console.log(newUser,"<================================저장한 값")
  const { userId } = newUser;
  console.log("회원가입 했어여~")
  kakaojwt(userId)
}else{
const { userId } = exUser
console.log("회원가입 되어있어여~")
  kakaojwt(userId)
}
}catch(err){
  console.log(err)
  next(err)
}
}

  // console.log(data.data)
  // try{
  //   console.log("test");
  //   passport.authenticate(
  //     "kakao",
  //     { failureRedirect: "/login" }, // 실패하면 '/user/login''로 돌아감.
  //     async (err:Error, user:Users) => {
  //       console.log(user)
  //       if (err) return next(err);
  //       const { userId } = user;
  //       const AccessToken = jwt.sign(
  //         { userId: userId },
  //         process.env.JWT_KEY!,
  //         { expiresIn: "3h" }
  //       );
  //       const RefreshToken = jwt.sign(
  //         { userId: userId },
  //         process.env.JWT_KEY!,
  //         { expiresIn: "7d" }
  //       );
  //       const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND!));
  //       const refreshToken = bcrypt.hashSync(RefreshToken, salt);
  //       await User.update({refreshToken}, {where : {userId}})
  //       res.cookie("refreshToken", RefreshToken);
  //       res.cookie("accessToken", AccessToken);
  //       // result = { userId, accessToken, refreshToken, nickname };
  //       res.status(200).json({
  //         message: "로그인 성공",
  //         accesstoken: AccessToken,
  //         refreshtoken: RefreshToken,
  //       })
  //       res.redirect('/');
  //     }
  //   )(req, res, next);
  // } catch (error) {
  //   next(error);
  // }
// }
