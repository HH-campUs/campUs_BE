import { Users } from '../../interface/user';
import { User } from '../../database/models/user';
import Review from '../../database/models/review';
import Pick from '../../database/models/pick';
import Trip from '../../database/models/trip';
import Camp from '../../database/models/camp';

export default {
  //회원가입
  signup: async ({ email, nickname, password }: Users) => {
    await User.create({ email, nickname, password });
  },
  //유저정보 찾기
  findUser: async (email: string) => {
    return await User.findOne({ where: { email } });
  },
  //로그인
  login: async ({ email, nickname, password }: Users) => {
    await User.create({ email, nickname, password });
  },
  //토큰 업데이트
  updaterefreshToken: async ({ email, refreshToken }: Users) => {
    await User.update({ refreshToken }, { where: { email } });
  },
  updateUser: async ({ nickname, profileImg }: Users) => {
    await User.update({ nickname, profileImg }, { where: {} });
  },
  getmyPage: async (userId: number) => {
    console.log(userId, '레포임');
    return await User.findAll({
      where: { userId },
      attributes: ['nickname', 'profileImg'],
      include: [
        {
          model: Review,
          as: 'Review',
          attributes: ['reviewImg', 'reviewComment'],
          order: [['createdAt', 'DESC']],
        },
        {
          model: Pick,
          as: 'Pick',
          attributes: ['pickId'],
          include: [
            {
              model: Camp,
              as: 'Camp',
              attributes: ['campId', 'campName', 'address', 'ImageUrl'],
            },
          ],
        },
        {
          model: Trip,
          as: 'Trip',
          attributes: ['date'],
          include: [
            {
              model: Camp,
              as: 'Camp',
              attributes: ['campId', 'campName', 'address', 'ImageUrl'],
            },
          ],
          order: [['createdAt', 'DESC']],
        },
      ],
    });
  },
};
// {model : Pick, as : "Pick"},
// {model: Trip , as :"Trip"}
