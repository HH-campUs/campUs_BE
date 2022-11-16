import { Users } from '../../interface/user';
import User from '../../database/models/user';

export default {
  signup: async ({ profileImg, email, nickname, password }: Users) => {
    await User.create({ profileImg, email, nickname, password });
  },
};
