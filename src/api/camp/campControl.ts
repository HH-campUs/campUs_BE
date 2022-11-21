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
      const { date } = await req.body
      const ids: trip ={
        userId,
        campId:Number(campId),
        date
      }
      const a = await campServ.myTripSave(ids);
      res.status(201).json({a, message : "여행일정 등록"})
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


// 컨트롤러 ------------------------------------------------------------------------
// findByQna = async (req, res) => {
//   try {
//     // 조회수 기능을 위해 request 전달
//     await this.questionsService.qnaViewCheck(req);

//     const detail = await this.questionsService.findByQna(req, res);

//     res.status(200).json({ data: detail });
//   } catch (error) {
//     res
//       .status(error.status || 400)
//       .send({ ok: false, message: error.message });
//   }
// };


// 서비스 ------------------------------------------------------------------------
// qnaViewCheck = async (req) => {
//   // 현재 사용중인 유저의 ip를 가져온다.
//   const ipAdress = req.ip.split(':').pop();
  
//   const { questionId } = req.params;

//   const getTime = Date.now();

//   // 중복된 아이피가 있는지 검증하기위해 repository 요청
//   const existIp = await this.questionsRepository.qnaViewCheck({
//     ip: ipAdress,
//     questionId,
//   });

//   // 중복된 아이피가 없으면 DB에 추가
//   if (!existIp)
//     return await this.questionsRepository.createView({
//       questionId,
//       ip: ipAdress,
//       time: getTime,
//     });

//     // 조회수를 무작정 올리는것을 방지하기 위한 5초 간격
//   const intervalCount =
//     getTime.toString().substring(7) - existIp.time.substring(7) > 5000;

//     // 조회수를 올린지 5초가 지났으면 조회수 요청 및 시간 업데이트 요청
//   if (intervalCount)
//     await this.questionsRepository.qnaViewCount({
//       ip: ipAdress,
//       time: getTime,
//       questionId,
//     });
// };


// 레포 ------------------------------------------------------------------------
// 해당 아이피가 조회수를 올렸는지 확인
// qnaViewCheck = async ({ ip, questionId }) => {
//   const result = await this.qnaView.findOne({ where: { ip, questionId } });
//   return result;
// };

// // 게시글의 조회수를 올리고 아이피와 게시글ID, 시간을 DB에 저장
// createView = async ({ questionId, ip, time }) => {
//   await this.qnaView.create({ questionId, ip, time });
//   await this.Question.increment({ view: 1 }, { where: { questionId } });
// };

// // 게시글의 조회수를 올리고 시간을 DB에 업데이트
// qnaViewCount = async ({ ip, time, questionId }) => {
//   await this.qnaView.update({ time }, { where: { ip, questionId } });
//   await this.Question.increment({ view: 1 }, { where: { questionId } });
// };