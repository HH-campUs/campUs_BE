import { Camp } from '../../database/models/camp';
import { Op } from 'sequelize';
import { QueryTypes, Sequelize } from 'sequelize';

export default {
  getTopicCamp: async (topic: string) => {
    // console.log(topic, '레포');
    // console.log(Camp);
    return await Camp.findAll({
      // campName, induty, doNm, sigunguNm, manageSttus, themaEnvrnCl, eqpmnLendCl
      where: {
        [Op.or]: [
          {
            campName: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            induty: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            doNm: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            sigunguNm: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            address: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            operPdCl: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            operDeCl: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            animal: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            sbrsCl: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            posblFcltyCl: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            themaEnvrnCl: {
              [Op.like]: `%${topic}%`,
            },
          },
          {
            eqpmnLendCl: {
              [Op.like]: `%${topic}%`,
            },
          },
        ],
      },
    });
  },
};
