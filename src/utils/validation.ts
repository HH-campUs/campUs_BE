//^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3} ex) youwa65@dddd.dd.fd
//^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$  특수문자 대문자 소문사 숫자 하나이상 필요8-20사이
import { validateOrReject ,IsEmail, IsString, Matches} from 'class-validator'
import { plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

export default async (req:Request,res:Response,next:NextFunction)=>{
  class userDto{

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

    @IsString()
    @Matches(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,{
      message : "비밀번호 형식이 틀렸습니다."
    })
    changePassword?: string
  }

 /* 
    plainToClass <= plain object를 class object로 변환(DTO)
    validateOrReject <= 반환값이 프로미스이며 유효성 검증 실패시 에러발생
    skipMissingProperties <= true일시 누락된건 스킵하고 검사
    DTO <=  로직을 가지지 않는 순수한 데이터 객체 
 */
  const target = plainToClass(userDto, req.body)
  try{ 
  await validateOrReject(target,{ skipMissingProperties: true })
  next()
  }catch(err){
  res.status(400).send(err)
  console.log(err)
  }
}

