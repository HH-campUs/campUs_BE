//^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3} ex) youwa65@dddd.dd.fd
//^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$  특수문자 대문자 소문사 숫자 하나이상 필요8-20사이
import Joi from 'joi';

export const signSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/)
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
    )
    .required(),
});
