import { weathers } from '../../interface/weather';
import weatherRepo from './weatherRepo';

export default {
  getweather: async ({ pardo, dt }: weathers) => {
    const findWeather = await weatherRepo.getweather({pardo});
    //날씨 가공 함수
    const fomatReturnData = (data: weathers) => {
      return {
        dt: data.dt,
        pardo: data.pardo,
        date: data.date,
        sunrise: data.sunrise,
        sunset: data.sunset,
        humidity: data.humidity,
        wind_speed: data.wind_speed,
        clouds: data.clouds,
        uvi: data.uvi,
        pop: data.pop,
        day: data.day,
        min: data.min,
        max: data.max,
        night: data.night,
        eve: data.eve,
        morn: data.morn,
        rain: data.rain,
        snow: data.snow,
      };
    };
    const weather = findWeather.map((data) => {
      if (dt === data.dt) {
        const weather = fomatReturnData(data);
        return weather;
      } else if (data.date === '토') {
        const weather = fomatReturnData(data);
        return weather;
      }
    });
    return weather.filter((element) => element !== undefined && element !== null
    );
  },
};
