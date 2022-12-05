import campRepo from './campRepo';
import { getCamp, trip, ip } from '../../interface/camp'
import { Camps } from '../../interface/openApi'
import { Request } from 'express';

export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async ({topicId, numOfRows, pageNo}: getCamp) => {
      console.time("서비스")
      // 0 이하의 페이지를 요청하면 pageNo 를 1로
      pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
      const topicCamp = await campRepo.getTopicCamp({topicId, pageNo, numOfRows});
      const topicid = await campRepo.getTopic({topicId})
      if(!topicid) throw new Error("존재하지 않는 주제입니다")
      console.timeEnd("서비스")

      return topicCamp;
  },

  // 지역별 캠핑장 조회
  getByRegionCamp: async ({doNm, numOfRows, pageNo}:getCamp) => {
    // 0 이하의 페이지를 요청하면 pageNo 를 1로
    pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
    const regionCamp = await campRepo.getByRegionCamp({doNm, numOfRows, pageNo})
    if(!regionCamp.regionCamp) throw new Error("지역에 맞는 캠핑장이 존재하지 않음")
    return regionCamp
  },

  // 캠핑장 상세 조회
  getDetailCamp: async ({campId}:getCamp) => {
    const detailCamp = await campRepo.getDetailCamp({campId})
    if(!detailCamp){ throw new Error("캠핑장이 존재하지 않음") }
    return detailCamp;    
  },

  // 조회수
  lookUp: async(req:Request<ip>)=>{
    const { campId } = req.params;
    let ip = req.connection.remoteAddress?.split(':').pop();
    const time = Date.now();

    // ip 유효성 검사 정규식
    const ipValidator = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    console.log(`${typeof ip}${ip}는 ip다 ${typeof campId}${campId}는 campId다 ${typeof time}${time}은 지금 이순간 마법처럼`)

    // 유효한 ip인지
    if(!ipValidator.test(ip!)) throw new Error("유효한 ip 주소가 아닙니다")

    // 조회수를 올린 ip가 있는지
    const existIp = await campRepo.getIpCamp({ip, campId})

    // 조회수를 올린 ip가 없다면 lookUp에 저장
    if(!existIp) return await campRepo.createLookUp({ip, campId, time})

    // 조회수를 올린지 1시간이 지났는지
    const dayInterval = time - existIp.time > 3600000;

    // 지났으면 조회수 요청 및 시간 업데이트 요청
    if(dayInterval) return await campRepo.updateLookUp({ip, campId, time})
  },

  // most 캠핑장 조회
  getMostCamp: async () => {
    const mostLook = {look : await campRepo.getMostLook()}
    const mostReview = {review : await campRepo.getMostReview()}
    const mostPick = {pick : await campRepo.getMostPick()}
    return [ mostLook, mostReview, mostPick ]
  },

  // 내 여행 일정 등록
  myTripSave: async({userId, date, campId}:trip)=>{
    const aa = await campRepo.myTripSave({userId, date, campId});
    if(!aa.campId) throw new Error("존재하지 않는 캠핑장")
    return aa
  },

  // 내 여행 일정 삭제
  myTripRemove: async({userId, tripId}:trip)=>{
    return await campRepo.myTripRemove({userId, tripId});
  },

  // 캠핑장 찜하기
  campPick: async(userId:number, campId:number)=>{
    const campPickFind = await campRepo.myPickFind(userId, campId);
    const getPickCamp = await campRepo.pickCamp({campId})
    
      if(!campPickFind){
        await campRepo.campPick(userId, campId)
        const data = getPickCamp.map( (element) => {
          return {
            ...element.dataValues,
            status : true
          }
      })
      return { camp:data, message: '찜 목록에 캠핑장을 추가하였습니다' }
      }else{
        await campRepo.campUnPick(userId, campId)
        const data = getPickCamp.map( (element) => {
          return {
            ...element.dataValues,
            status : false
          }
      })
        return { camp:data, message: "찜 목록에서 캠핑장을 삭제하였습니다" }
      }
    ;
  }
};