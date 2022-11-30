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
  findUser: async ({email}: Users) => {
    return await User.findOne({ where: { email } });
  },
  findByPk: async ({userId}:Users) => {
    return await User.findByPk(userId);
  },
  //로그인
  login: async ({ email, nickname, password }: Users) => {
    await User.create({ email, nickname, password });
  },
  //토큰 업데이트
  updaterefreshToken: async ({ email, refreshToken }: Users) => {
    await User.update({ refreshToken }, { where: { email } });
  },
  //유저정보 수정
  updateUser: async ({ nickname, profileImg, userId }: Users) => {
    await User.update({ nickname, profileImg }, { where: { userId } });
  },
  //마이 페이지 조회
  getmyPage: async ({userId}:Users) => {
    return await User.findAll({
      where: { userId },
      attributes: ['nickname', 'profileImg'],
      include: [
        {
          model: Review,
          as: 'Review',
          attributes: ['reviewImg', 'reviewComment'],
        },
        {
          model: Pick,
          as: 'Pick',
          attributes: ['userId'],
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
        },
      ],
      order: [
        [Trip, 'createdAt', 'DESC'],
        [Pick, 'createdAt', 'DESC'],
        [Review, 'createdAt', 'DESC'],
      ],
    });
  },
};
