import { Request, Response, NextFunction } from 'express';
import campServ from './campServ';
import { getCamp, trip, pick } from '../../interface/camp'
import jwt from '../../utils/jwt';

export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async (req: Request<getCamp,{},{},getCamp>, res: Response, next: NextFunction) => {
    try {
      const {numOfRows, pageNo, sort} = req.query;
      const {topicId} = req.params;
      const { authorization } = req.headers;
      // 조회하는 유저 정보에서 userId 구하기
      const accesstoken = authorization?.split(" ")[1]
      const decodeAccessToken = await jwt.validateAccessToken(accesstoken!);
      if(decodeAccessToken == null){
        console.log("일로지나감")
        res.status(200).json(await campServ.nonGetTopicCamp({topicId, numOfRows, pageNo, sort}));
      }else {
        const userId = decodeAccessToken!.userId;
        res.status(200).json(await campServ.getTopicCamp({topicId, numOfRows, pageNo, userId, sort}));
      }
    } catch (err) {
      next(err);
    }
  },

  // 지역별 캠핑장 조회
  getByRegionCamp: async (req: Request<{},{},{},getCamp>, res: Response, next: NextFunction) => {
    try {
      const { doNm, numOfRows, pageNo, sort } = req.query;
      const { authorization } = req.headers;
      console.log(typeof doNm,'doNm다', typeof numOfRows,'numOfRows다', typeof pageNo,'pageNo다','컨트롤러')
      // 조회하는 유저 정보에서 userId 구하기
      const accesstoken = authorization?.split(" ")[1]
      const decodeAccessToken = await jwt.validateAccessToken(accesstoken!);
      if(decodeAccessToken == null){
        res.status(200).json(await campServ.nonGetByRegionCamp({doNm, numOfRows, pageNo, sort}));
      }else {
        const userId = decodeAccessToken!.userId;
        res.status(200).json(await campServ.getByRegionCamp({doNm, numOfRows, pageNo, sort, userId}));
      }
    } catch (err) {
      next(err);
    }
  },

  // 캠핑장 상세 정보 조회
  getDetailCamp: async (req: Request<getCamp>, res: Response, next: NextFunction) => {
    try {
      const { campId } = req.params;
      await campServ.lookUp(req)
      const { authorization } = req.headers;

      // 조회하는 유저 정보에서 userId 구하기
      const accesstoken = authorization?.split(" ")[1]
      const decodeAccessToken = await jwt.validateAccessToken(accesstoken!);
      if(decodeAccessToken == null){
        res.status(200).json(await campServ.nonGetDetailCamp({campId}));
      }else {
        const userId = decodeAccessToken!.userId;
        res.status(200).json(await campServ.getDetailCamp({campId, userId}));
      }
    } catch (err) {
      next(err);
    }
  },
  
  // most 캠핑장 조회
  getMostCamp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      // 조회하는 유저 정보에서 userId 구하기
      const accesstoken = authorization?.split(" ")[1]
      const decodeAccessToken = await jwt.validateAccessToken(accesstoken!);
      if(decodeAccessToken == null){
        res.status(200).json(await campServ.nonGetMostCamp());
      }else {
        const userId = decodeAccessToken!.userId;
        res.status(200).json({ MostList : await campServ.getMostCamp({userId}) });
      }
    } catch (err) {
      next(err);
    }
  },

  // 내 여행 일정 등록
  myTripSave: async(req:Request<trip,{},trip>, res:Response, next:NextFunction)=>{
    try{
      const { userId }:trip = res.locals.user;
      const { campId } = req.params;
      const { memo, date } = req.body;
      await campServ.myTripSave({userId, campId, memo, date});
      res.status(201).json({message : "여행일정 등록"});
    }catch(err){
      next(err);
    }
  },

  // 내 여행 일정 조회
  myTripGet: async(req:Request<trip>, res:Response, next:NextFunction)=>{
    try{
      const { userId }:trip = res.locals.user; 
      res.status(201).json({trip : await campServ.myTripGet({userId})});
    }catch(err){
      next(err);
    }
  },

  // 내 여행 일정 수정
  myTripUpdate: async(req:Request<trip,{},trip>, res:Response, next:NextFunction)=>{
    try{
      const { userId }:trip = res.locals.user;
      const { tripId } = req.params;
      const { memo, date } = req.body;
      await campServ.myTripUpdate({userId, tripId, memo, date});
      res.status(201).json({message : "여행일정 수정"});
    }catch(err){
      next(err);
    }
  },

  // 내 여행 일정 삭제
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

  // 캠핑장 찜하기
  campPick: async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const { userId }:pick = res.locals.user;
      const { campId }:pick = req.params;
      res.status(200).json(await campServ.campPick({userId, campId}));
    }catch(err){
      next(err);
    }
  }
};