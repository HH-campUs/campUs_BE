import Weather from '../../database/models/weather';
import { weathers } from '../../interface/weather';

export default {
  findDate: async ({dt}:weathers )=>{
    return await Weather.findOne({where:{dt}})
  },
  getweather: async ({ pardo }: weathers) => {
    return await Weather.findAll({ where: { pardo } });
  },
};
