import { Request, Response, NextFunction } from 'express';
import campServ from './campServ';

interface top {
  topic: string;
}
export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic }: top = await req.body;
      // console.log(topic.valueOf, '값');
      // console.log(topic, '컨트롤러');
      res.status(200).json(await campServ.getTopicCamp(topic));
    } catch (err) {
      next(err);
    }
  },
};