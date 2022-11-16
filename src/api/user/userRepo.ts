import User from '../../database/models/user';
import { SignUser } from '../../interface/user'

export default {
  SignUp : async ({profileImg, email, nickname, password}:SignUser) => {
    await User.create({profileImg, email, nickname, password});
  }
}
