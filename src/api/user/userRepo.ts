import { Users } from '../../interface/user';
import { User } from '../../database/models/user';

export default {
  signup: async ({email, nickname, password }: Users) => {
    await User.create({email, nickname, password });
  },
 
  findUser: async (email:string)=>{
    return await User.findOne({where:{email}})

  }
};
