//^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3} ex) youwa65@dddd.dd.fd
//^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$  특수문자 대문자 소문사 숫자 하나이상 필요8-20사이
import { validateOrReject ,IsEmail, IsString, Matches} from 'class-validator'
import { plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
// import Joi from 'joi';
// //회원가입 검사
// export const signSchema = Joi.object({
//   email: Joi.string()
//     .pattern(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
//     .message("이메일 형식이 틀렸습니다.")
//     .required(),
//   password: Joi.string()
//     .pattern(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
//     .message("비밀번호 형식이 틀렸습니다!.")
//     .required(),
// });
// //이메일 중복검사
// export const emailSchema = Joi.object({
//   email: Joi.string()
//   .pattern(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
//   .message("이메일 형식이 틀렸습니다.")
//   .required()
// })

export class createUserDto{

  @IsString()
  @IsEmail()
  @Matches(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,{
    message : "이메일 형식이 틀렸습니다."
  })
  email?:string
   
  @IsString()
  @Matches(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,{
    message : "비밀번호 형식이 틀렸습니다."
  })
  password?: string
}

export function validateBody(schema:{new() : object}){
  return async function (req:Request,res:Response,next:NextFunction){
    const target:object = plainToClass(schema, req.body)
    try{
      await validateOrReject(target,{ skipMissingProperties: true })
      next()
    }catch(err){
      res.status(400).send(err)
      next(err)
    }
  }
}
