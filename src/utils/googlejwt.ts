import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import User from "../database/models/user";
import { Unauthorized } from "./exceptions";

export default async (req:Request, res:Response, next:NextFunction) => {
  try{
    //토큰 생성 및 토큰 전달 함수
  const googlejwt = async (userId:number)=>{
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
          console.log(authorization,"<============구글 헤더")
    if(!authorization) throw new Unauthorized("토큰 정보가 없습니다.")
    const GoogleAccessToken = authorization
  const googleUser = await axios
    .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${GoogleAccessToken}`, {
      headers: {
        Authorization: `Bearer ${GoogleAccessToken}`,
        accept: 'application/json' 
      },		
        })
const profileImg:string = googleUser.data.picture
const googleId:string = googleUser.data.id
const nickname:string = googleUser.data.name
const provider:string = 'google'
const email:string = googleUser.data.email
const exUser = await User.findOne({
  where : {googleId, provider}
})
if(!exUser){
  const newUser = await User.create({googleId,nickname,provider,profileImg,email});
  console.log(newUser,"<================================저장한 값")
  const { userId } = newUser;
  console.log("회원가입 했어여~")
  googlejwt(userId)
}else{
const { userId } = exUser
console.log("회원가입 되어있어여~")
  googlejwt(userId)
}
}catch(err){
  console.log(err)
  next(err)
}
}