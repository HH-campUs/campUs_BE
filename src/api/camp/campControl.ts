import { Request, Response, NextFunction } from 'express';
import campServ from './campServ';
import { topic, trip } from '../../interface/camp'

export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic }: topic = await req.body;
      // console.log(topic.valueOf, '값');
      // console.log(topic, '컨트롤러');
      res.status(200).json(await campServ.getTopicCamp({topic}));
    } catch (err) {
      next(err);
    }
  },

  myTripSave: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId } = await res.locals.user;
      const { campId } = req.params; // await 불필요
      const { address, date } = await req.body
      const ids: trip ={
        userId,
        campId:Number(campId),
        address,
        date
      }
      await campServ.myTripSave(ids);
      res.status(201).json({message : "여행일정 등록"})
    }catch(err){
      next(err);
    }
  },

  myTripRemove: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId } = res.locals.user;
      const { tripId } = req.params;
      const ids: trip ={
        userId,
        tripId:Number(tripId)
      }
      console.log(typeof tripId, "tripId다ㅏㅏㅏㅏㅏㅏㅏㅏㅏ")
      await campServ.myTripRemove(ids)
      res.status(200).json({message : "여행일정 삭제"})
    }catch(err){
      next(err);
    }
  },

  campPick: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId } = res.locals.user;
      const { campId } = req.params;
      res.status(200).json(await campServ.campPick(userId, Number(campId)))
    }catch(err){
      next(err);
    }
  }
};