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
        const accessToken = jwt.sign(
          { userId: userId },
          process.env.JWT_KEY!,
          { expiresIn: "3h" }
        );
        const refreshToken = jwt.sign(
          { userId: userId },
          process.env.JWT_KEY!,
          { expiresIn: "7d" }
        );
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND!));
        const RefreshToken = bcrypt.hashSync(refreshToken, salt);
        await User.update({RefreshToken}, {where : {userId}})
        res.cookie("refreshToken", refreshToken);
        res.cookie("accessToken", accessToken);
        // result = { userId, accessToken, refreshToken, nickname };
        res.status(200).json({
          message: "로그인 성공",
          accesstoken: accessToken,
          refreshtoken: refreshToken,
        });
        // res.redirect(
        // );
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};