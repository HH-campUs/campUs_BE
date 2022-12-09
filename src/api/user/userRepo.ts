import { coordinate, Users } from '../../interface/user';
import { User } from '../../database/models/user';
import Review from '../../database/models/review';
import Pick from '../../database/models/pick';
import Trip from '../../database/models/trip';
import Camp from '../../database/models/camp';
import { sequelize } from '../../database/models/sequlize';
import { QueryTypes } from 'sequelize';


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
  //토큰 업데이트
  updaterefreshToken: async ({ email, refreshToken }: Users) => {
    await User.update({ refreshToken }, { where: { email } });
  },
  //유저정보 수정
  updateUser: async ({ nickname, profileImg, userId }: Users) => {
    await User.update({ nickname, profileImg }, { where: { userId } });
  },
  //비밀번호 변경
  changePW: async ({ email, newPassword }: Users) => {
    await User.update({password:newPassword }, { where: { email } });
  },
  //가까운 캠핑장 찾기
  nearCamp: async ({campX,campY}:coordinate) => {
    const query = `SELECT camp.*,
    ( 6371 * acos( cos( radians( ${campX} ) ) * cos( radians( camp.X) ) * cos( radians( camp.Y ) - radians(${campY}) ) + sin( radians( ${campX}) ) * sin( radians( camp.X ) ) ) )as distance
    FROM camp HAVING distance < 30 ORDER BY distance LIMIT 0,2`
    return await sequelize.query(query, {type: QueryTypes.SELECT})
   },
  //찜 목록 조회 
  getMyPick: async({userId}:Users)=>{
  return await User.findAll({
    where:{userId},
    attributes:['nickname', 'profileImg','email'],
    include:[
      {
        model:Pick,
        as: 'Pick',
        attributes:['userId'],
        include:[
          {
            model:Camp,
            as : 'Camp',
           attributes:['campId', 'campName', 'address', 'ImageUrl','induty']
          }
        ]
      }
    ],
    order : [[Pick, 'createdAt', 'DESC']],
  })
  },
  //마이 페이지 조회
  getmyPage: async ({userId}:Users) => {
    return await User.findAll({
      where: { userId },
      attributes: ['nickname', 'profileImg','email'],
      include: [
        {
          model: Review,
          as: 'Review',
          attributes: ['reviewImg', 'reviewComment'],
          include:[{model: Camp, as: 'Camp',attributes:['campName']}]
        },
        {
          model: Pick,
          as: 'Pick',
          attributes: ['userId'],
          include: [
            {
              model: Camp,
              as: 'Camp',
              attributes: ['campId', 'campName', 'address', 'ImageUrl','induty'],
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
