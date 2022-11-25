import { Request, Response, NextFunction } from 'express';
import campServ from './campServ';
import { getCamp, trip } from '../../interface/camp'

export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async (req: Request<getCamp,{},{},getCamp>, res: Response, next: NextFunction) => {
    try {
      const {numOfRows, pageNo} = req.query;
      const {topicId} = req.params;
      // const topic = getCamp.topic
      // const numOfRows = getCamp.numOfRows
      // const pageNo = getCamp.pageNo
      // console.log(topic.valueOf, '값');
      // console.log(topic, '컨트롤러');
      // const topicCamp = 
      res.status(200).json(await campServ.getTopicCamp({topicId, numOfRows, pageNo}));
    } catch (err) {
      next(err);
    }
  },

  getByRegionCamp: async (req: Request<{},{},{},getCamp>, res: Response, next: NextFunction) => {
    try {
      const { address, numOfRows, pageNo } = req.query;
      const regionCamp = await campServ.getByRegionCamp({address, numOfRows, pageNo});
      res.status(200).json(regionCamp);
    } catch (err) {
      next(err);
    }
  },

  getDetailCamp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await campServ.getDetailCamp(req);
      res.status(200).send({'message':"캠핑장 상세 정보 조회"})
    } catch (err) {
      next(err);
    }
  },
  
  getMostCamp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await campServ.getMostCamp()
      res.status(200).json()
    } catch (err) {
      next(err);
    }
  },

  myTripSave: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId } = await res.locals.user;
      const { campId } = req.params; // await 불필요
      const { address, date } = await req.body;
      const ids: trip ={
        userId,
        campId:Number(campId),
        address,
        date
      };
      await campServ.myTripSave(ids);
      res.status(201).json({message : "여행일정 등록"});
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
      };
      await campServ.myTripRemove(ids);
      res.status(200).json({message : "여행일정 삭제"});
    }catch(err){
      next(err);
    }
  },

  campPick: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId } = res.locals.user;
      const { campId } = req.params;
      res.status(200).json(await campServ.campPick(userId, Number(campId)));
    }catch(err){
      next(err);
    }
  }
};