import campRepo from './campRepo';
import { getCamp, trip, ip } from '../../interface/camp'
import { Request } from 'express';

export default {
  getTopicCamp: async ({topicId, numOfRows, pageNo}: getCamp) => {
    try{
      // let start = 0;
      // 0 이하의 페이지를 요청하면 pageNo 를 1로
      // 미완성 고쳐야 됨
      // pageNo<=0 ? pageNo= 1 : start = (pageNo -1) * numOfRows!;
      return await campRepo.getTopicCamp({topicId, pageNo, numOfRows});
    }catch(err){
      console.log('캠핑장 정보 불러오기 실패', err)
      throw err;
    }
  },

  getByRegionCamp: async ({doNm, numOfRows, pageNo}:getCamp) => {
    // let start = 0;
    // 0 이하의 페이지를 요청하면 pageNo 를 1로
    // 개똥같이 짰다 고쳐라
    // pageNo<=0 ? pageNo= 1 : start = (pageNo -1) * numOfRows!;
    return await campRepo.getByRegionCamp({doNm, numOfRows, pageNo})
  },

  getDetailCamp: async (req:Request<ip>) => {
    let ip = req.connection.remoteAddress?.split(':').pop();
    console.log(ip)

    const { campId } = req.params;
    const time = Date.now();
    console.log(`${typeof ip}${ip}는 ip다 ${typeof campId}${campId}는 campId다 ${typeof time}${time}은 지금 이순간 마법처럼`)
    const existIp = await campRepo.getIpCamp({ip, campId})

    if(!existIp) return await campRepo.createLookUp({ip, campId, time})
    // 조회수를 올린지 1시간이 지났는지
    const dayInterval = time - existIp.time > 3600000;
    // 지났으면 조회수 요청 및 시간 업데이트 요청
    if(dayInterval) return await campRepo.updateLookUp({ip, campId, time})
  },
  
  getMostCamp: async () => {
    
  },

  myTripSave: async({userId, date, address, campId}:trip)=>{
    return await campRepo.myTripSave({userId, date, address, campId});
  },

  myTripRemove: async({userId, tripId}:trip)=>{
    return await campRepo.myTripRemove({userId, tripId});
  },

  campPick: async(userId:number, campId:number)=>{
    const campPickFind = await campRepo.campPickFind(userId, campId);
    if(!campPickFind){
      await campRepo.campPick(userId, campId)
      return { message: '찜 목록에 캠핑장을 추가하였습니다' }
    }else{
      await campRepo.campUnPick(userId, campId)
      return { message: "찜 목록에서 캠핑장을 삭제하였습니다" }
    }
  }
};