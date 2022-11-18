import { Request, Response, NextFunction } from 'express';
import { weathers } from '../../interface/weather';
import weatherServ from './weatherServ';

export default {
  getweather: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pardo, dt }: weathers = req.body;
      const Weather = { pardo, dt };
      const weather = await weatherServ.getweather(Weather);
      res.status(200).json(weather);
    } catch (err) {
      next(err);
    }
  },
};
