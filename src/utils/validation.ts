//^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3} ex) youwa65@dddd.dd.fd
//^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$  특수문자 대문자 소문사 숫자 하나이상 필요8-20사이
import Joi from 'joi';
import { validate, validateOrReject ,IsEmail, IsString, Matches} from 'class-validator'
//회원가입 검사
export const signSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
    .message("이메일 형식이 틀렸습니다.")
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
    .message("비밀번호 형식이 틀렸습니다!.")
    .required(),
});
//이메일 중복검사
export const emailSchema = Joi.object({
  email: Joi.string()
  .pattern(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
  .message("이메일 형식이 틀렸습니다.")
  .required()
})

export class Email{

  @IsString()
  @IsEmail()
  @Matches(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
  email?:string
   
  @IsString()
  @Matches(/^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
  password?: string
}
