import Weather from '../../database/models/weather';
import { weathers } from '../../interface/weather';

export default {
  //저장된 날짜 찾기
  findDate: async ({dt}:weathers )=>{
    return await Weather.findOne({where:{dt}})
  },
  //저장된 날씨 찾기
  getweather: async ({ pardo }: weathers) => {
    return await Weather.findAll({ where: { pardo } });
  },
  //저장된 토요일 날씨 찾기
  getReCommend: async () => {
    return await Weather.findAll({});
  },
};
