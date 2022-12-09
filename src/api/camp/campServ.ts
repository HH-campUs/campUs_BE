import campRepo from './campRepo';
import { getCamp, trip, ip, pick } from '../../interface/camp'
import { Camps } from '../../interface/openApi'
import { Request } from 'express';

export default {
  // 회원 주제별 캠핑장 조회
  getTopicCamp: async ({topicId, numOfRows, pageNo, userId, sort}: getCamp,) => {
      console.time("서비스")
      // 0 이하의 페이지를 요청하면 pageNo 를 1로
      pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
      const topicCamp = await campRepo.getTopicCamp({topicId, pageNo, numOfRows, sort});
      const TopicCamp:any[] = topicCamp.topicCamp
      
      const topicid = await campRepo.getTopic({topicId})
      if(!topicid) throw new Error("존재하지 않는 주제입니다")

      // 해당 유저가 찜한 캠프 정보 불러오기
      const campPickFind = await campRepo.myPickAllFind({userId});

      // 해당 유저가 찜한 campId 구하기
      const myPick = campPickFind.map((e)=>{
        return  e.dataValues.campId
      })
      console.log(myPick,'내가 찜한 campId')

      // 조회되는 campId 구하기
      const getCamps = TopicCamp.map((a:Camps)=>{
        return a.campId
      })
      console.log(getCamps,'조회되는 campId')

      // 조회되는 campId와 유저가 찜한 campId 중 일치하는 값 구하기
      const sameId = getCamps.filter(x => myPick.includes(x))
      console.log(sameId,'조회되는 campId와 내가 찜한 campId 중 일치하는 값')

      // 일치하는 campId의 캠프 정보 구하기
      const sameCamp = TopicCamp.filter((x:Camps) => sameId.includes(x.campId))
      console.log('TopicCamp입니다',TopicCamp)
      console.log('일치하는 값의 캠프 정보',sameCamp)

      const pickCampidSet = new Set(campPickFind.map(x => x.campId));
      const res1 = TopicCamp.map(o => ({ ...o, PickCamp:pickCampidSet.has(o.campId) ? { ...o, status: true}: { ...o, status: false} }));
      const camp = res1.map((x)=>{
      return x.PickCamp
      })
      console.timeEnd("서비스")
      return {topicCamp : camp, total : topicCamp.total}
  },

  // 비회원 주제별 캠핑장 조회
  nonGetTopicCamp: async ({topicId, numOfRows, pageNo, sort}: getCamp) => {
      console.time("서비스")
      // 0 이하의 페이지를 요청하면 pageNo 를 1로
      pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
      const topicCamp = await campRepo.getTopicCamp({topicId, pageNo, numOfRows, sort});
      
      const topicid = await campRepo.getTopic({topicId})
      if(!topicid) throw new Error("존재하지 않는 주제입니다")

      console.timeEnd("서비스")
      return topicCamp;
  },

  // 지역별 캠핑장 조회
  getByRegionCamp: async ({doNm, numOfRows, pageNo, sort, userId}:getCamp) => {
    // 0 이하의 페이지를 요청하면 pageNo 를 1로
    pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
    console.log(typeof doNm,'doNm다', typeof numOfRows,'numOfRows다', typeof pageNo,'pageNo다','서비스')
    const regionCamp = await campRepo.getByRegionCamp({doNm, numOfRows, pageNo, sort})
    const RegionCamp:any[] = regionCamp.regionCamp
    if(!RegionCamp) throw new Error("지역에 맞는 캠핑장이 존재하지 않음")


    // 해당 유저가 찜한 캠프 정보 불러오기
    const campPickFind = await campRepo.myPickAllFind({userId});

    // 해당 유저가 찜한 campId 구하기
    const myPick = campPickFind.map((e)=>{
      return  e.dataValues.campId
    })
    console.log(myPick,'내가 찜한 campId')

    // 조회되는 campId 구하기
    const getCamps = RegionCamp.map((a:Camps)=>{
      return a.campId
    })
    console.log(getCamps,'조회되는 campId')

    // 조회되는 campId와 유저가 찜한 campId 중 일치하는 값 구하기
    const sameId = getCamps.filter(x => myPick.includes(x))
    console.log(sameId,'조회되는 campId와 내가 찜한 campId 중 일치하는 값')
    // 일치하는 campId의 캠프 정보 구하기
    const sameCamp = RegionCamp.filter((x:Camps) => sameId.includes(x.campId))
    console.log('일치하는 값의 캠프 정보',sameCamp)

    const pickCampidSet = new Set(campPickFind.map(x => x.campId));
    const res1 = RegionCamp.map(o => ({ ...o, PickCamp:pickCampidSet.has(o.campId) ? { ...o, status: true}: { ...o, status: false} }));
    const camp = res1.map((x)=>{
    return x.PickCamp
    })
    console.timeEnd("서비스")
    return { regionCamp : camp, total : regionCamp.total }
  },

  // 비회원 지역별 캠핑장 조회
  nonGetByRegionCamp: async ({doNm, numOfRows, pageNo, sort}:getCamp) => {
    // 0 이하의 페이지를 요청하면 pageNo 를 1로
    pageNo!<=0 ? pageNo= 1 : pageNo = (pageNo! -1) * numOfRows!;
    console.log(typeof doNm,'doNm다', typeof numOfRows,'numOfRows다', typeof pageNo,'pageNo다','서비스')
    const regionCamp = await campRepo.getByRegionCamp({doNm, numOfRows, pageNo, sort})
    if(!regionCamp.regionCamp) throw new Error("지역에 맞는 캠핑장이 존재하지 않음")
    return regionCamp
  },

  // 캠핑장 상세 조회
  getDetailCamp: async ({campId, userId}:getCamp) => {
    const detailCamp = await campRepo.getDetailCamp({campId})
    if(!detailCamp){ throw new Error("캠핑장이 존재하지 않음") }

    const detailPick = await campRepo.getDetailPick({userId, campId})
    const status = detailPick.length ? true : false

    const result = detailCamp.map((x)=>{
      return {
        ...x.dataValues,
        status
      }
    })
    return result;    
  },

  // 비회원 캠핑장 상세 조회
  nonGetDetailCamp: async ({campId}:getCamp) => {
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
  getMostCamp: async ({userId}:getCamp) => {
    const mostLook = {look : await campRepo.getMostLook()}
    const mostReview = {review : await campRepo.getMostReview()}
    const mostPick = {pick : await campRepo.getMostPick()}
    return [ mostLook, mostReview, mostPick ]
  },

  // 비회원 most 캠핑장 조회
  nonGetMostCamp: async () => {
    const mostLook = {look : await campRepo.getMostLook()}
    const mostReview = {review : await campRepo.getMostReview()}
    const mostPick = {pick : await campRepo.getMostPick()}
    return [ mostLook, mostReview, mostPick ]
  },

  // 내 여행 일정 등록
  myTripSave: async({userId, campId, memo, date}:trip)=>{
    const tripSave = await campRepo.myTripSave({userId, campId, memo, date});
    if(!tripSave.campId) throw new Error("존재하지 않는 캠핑장")
    return tripSave
  },

  // 내 여행 일정 조회
  myTripGet: async({userId}:trip)=>{
    const tripGet = await campRepo.myTripGet({userId});
    console.log(tripGet,'getttt')

    // 현재 날짜
    const NOW = new Date();
    const hours =  9 * 60 * 60 * 1000;
    NOW.setTime(NOW.getTime() + 0 + hours + 0 + 0)
    console.log(NOW)

    const date = await campRepo.myTripDate({userId})
    const dt = date?.dataValues.date

    // 일정에 저장된 날짜
    const DATE = new Date(`${dt.slice(0,4)}-${dt.slice(4, 6)}-${dt.slice(6,8)}`);

    // 현재 날짜에서 저장된 날짜의 차이
    const difDate = +DATE - +NOW
    const difDay = Math.floor(difDate / (1000*60*60*24))

    const result = tripGet.map((d)=>{
      return {
        ...d,
        dDay : difDay+1 
      }
    });

    console.log(difDay)
    return result
  },

  // 내 여행 일정 수정
  myTripUpdate: async({userId, tripId, memo, date}:trip)=>{
    const tripUpdate = await campRepo.myTripUpdate({userId, tripId, memo, date});
    const trip = await campRepo.findByTripId({tripId});
    if(!trip) throw new Error("존재하지 않는 여행 일정")
    return tripUpdate
  },

  // 내 여행 일정 삭제
  myTripRemove: async({userId, tripId}:trip)=>{
    return await campRepo.myTripRemove({userId, tripId});
  },

  // 캠핑장 찜하기
  campPick: async({userId, campId}:pick)=>{
    const campPickFind = await campRepo.myPickFind({userId, campId});
    const getPickCamp = await campRepo.pickCamp({campId})
    
      if(!campPickFind){
        await campRepo.campPick({userId, campId})
        const data = getPickCamp.map( (element) => {
          return {
            ...element.dataValues,
            status : true
          }
      })
      return { camp:data, message: '찜 목록에 캠핑장을 추가하였습니다' }
      }else{
        await campRepo.campUnPick({userId, campId})
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