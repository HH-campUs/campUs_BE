import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Users } from "../interface/user";
import bcrypt from 'bcrypt';
import User from "../database/models/user";

export default(req:Request, res:Response, next:NextFunction) => {
  try {
    console.log("test");
    passport.authenticate(
      "kakao",
      { failureRedirect: "/login" }, // 실패하면 '/user/login''로 돌아감.
      async (err:Error, user:Users) => {
        console.log(user)
        if (err) return next(err);
        const { userId } = user;
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
        // result = { userId, accessToken, refreshToken, nickname };
        res.status(200).json({
          message: "로그인 성공",
          accesstoken: AccessToken,
          refreshtoken: RefreshToken,
        })
        // res.redirect(
        // );
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};