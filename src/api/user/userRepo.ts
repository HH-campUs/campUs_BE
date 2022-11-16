import User from '../../database/models/user';
import { Users } from '../../interface/user';

export default {
  signup: async ({ profileImg, email, nickname, password }: Users) => {
    await User.create({ profileImg, email, nickname, password });
  },
};
