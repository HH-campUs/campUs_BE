import { Request, Response, NextFunction } from 'express';
import { weathers } from '../../interface/weather';
import weatherServ from './weatherServ';
import errer from '../../utils/exceptions'
export default {
  getweather: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pardo, dt }:weathers = req.query
      if(!pardo && !dt) throw new errer.InvalidParamsError("입력하신 정보가 없습니다.")
      const Weather = { pardo, dt };
      const weather = await weatherServ.getweather(Weather);
      res.status(200).json(weather);
    } catch (err) {
      next(err);
    }
  },
};
