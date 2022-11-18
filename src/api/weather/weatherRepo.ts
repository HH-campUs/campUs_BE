import Weather from '../../database/models/weather';
import { weathers } from '../../interface/weather';

export default {
  getweather: async ({ pardo }: weathers) => {
    return await Weather.findAll({ where: { pardo } });
  },
};
