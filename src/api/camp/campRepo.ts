import { Camp } from '../../database/models/camp';
import { Trip } from '../../database/models/trip';
import { Pick } from '../../database/models/pick';
import { LookUp } from '../../database/models/lookUp';
import { getCamp, trip, ip, pick } from '../../interface/camp';
import { sequelize } from '../../database/models/sequlize';
import { QueryTypes } from 'sequelize';
import Topic from '../../database/models/topic';

export default {
  // 주제별 캠핑장 조회
  getTopicCamp: async ({topicId, pageNo, numOfRows, sort}:getCamp) => {
    const topicCamp = `
     SELECT Camp.*
     FROM topicMapping AS topicMapping INNER JOIN camp AS Camp
     ON topicMapping.campId = Camp.campId
     WHERE topicMapping.topicId =$topicId
    `
    // console.log(topicId,'topicId다', numOfRows,'numOfRows다', pageNo,'pageNo다')
    console.log(typeof sort,sort ,'sort다')
    const limitNorder = `ORDER BY ${sort} DESC
      LIMIT $numOfRows OFFSET $pageNo;`
    const camp = await sequelize.query( topicCamp+limitNorder, {
      bind: {topicId, numOfRows, pageNo:String(pageNo)},
      type: QueryTypes.SELECT
    })
    const total = await sequelize.query(topicCamp, {
      bind: {topicId},
      type: QueryTypes.SELECT
    })
    return {topicCamp : camp, total : total.length}

  },

  // topicId
  getTopic: async({topicId}:getCamp)=>{
    return await Topic.findOne({where:{topicId}})
  },

  // camp
  // getCamp: async({topicId}:getCamp)=>{
  //   return await Camp.findAll({
  //     include: [{
  //       model: Topic,
  //       through: {
  //         attributes: ['campId'],
  //         where: {topicId}
  //       }
  //     }]
  //   })
  // },

  // 지역별 캠핑장 조회
  getByRegionCamp: async ({doNm, numOfRows, pageNo, sort}:getCamp) => {
    console.time("regionTime")
    const regionCamp = `SELECT * FROM camp AS Camp WHERE doNm LIKE CONCAT('%',$doNm,'%') `
    const limit = `ORDER BY ${sort} DESC LIMIT $numOfRows OFFSET $pageNo;`
    console.log(typeof doNm,'doNm다', typeof numOfRows,'numOfRows다', typeof pageNo,'pageNo다')
    const camp = await sequelize.query(regionCamp+limit, {
      bind: {doNm, numOfRows, pageNo:String(pageNo)},
      type: QueryTypes.SELECT
    })
    const total = await sequelize.query(regionCamp, {
      bind: {doNm},
      type: QueryTypes.SELECT
    })
    console.timeEnd("regionTime")
    return {regionCamp : camp, total : total.length}
  },

  // 캠핑장 상세 조회
  getDetailCamp: async({campId}:ip)=>{
    return await Camp.findAll({where:{campId}})
  },

  // 조회수를 올린 IP 존재 여부
  getIpCamp: async ({ip, campId}:ip) => {
    console.log("ip GET입니다")
    return await LookUp.findOne({where:{ip, campId}});
    // `SELECT * FROM lookup WHERE ${ip}' AND ${campId}`
  },

  // 조회수 올리고 ip, campId, time 저장
  createLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.create({ ip, campId, time });
    await Camp.increment({lookUp : 1},{where:{campId}})
    // `INSERT INTO lookUp ( campId, ip, time ) VALUES ( ${campId}, '${ip}', ${time} )`
    // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
  },

  // 조회수 올리고 time 업데이트
  updateLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.update({time},{where: { ip, campId }})
    await Camp.increment({lookUp : 1},{where:{campId}})
    // `UPDATE lookUp SET ${time} WHERE ${ip}, ${campId}`
    // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
  },
  
  // most 조회수
  getMostLook: async () => {
    // async function as(mostLook:number[]) {
    //   Math.max.apply(null,mostLook)
    // } 
    const mostLook = await Camp.max('lookUp')
    return await Camp.findOne({
      where:{lookUp : mostLook}
    })
  }, 
  
  // most 리뷰
  getMostReview: async()=>{
    const mostReview = await Camp.max('reviewCount')
    if(mostReview == 0){
      return false // undefined null
    }else{
      return await Camp.findOne({
        where:{reviewCount : mostReview}
      })
    }
  },

  // most 찜
  getMostPick: async()=>{
    const mostPick = await Camp.max('pickCount')
    return await Camp.findOne({
      where:{pickCount : mostPick}
    })
  },

  // 내 여행 일정 등록
  myTripSave: async({userId, campId, memo, date}:trip)=>{
    console.log(typeof campId)
    const Address = await Camp.findOne({where:{campId}})
    return await Trip.create({
      userId, campId, memo, address:Address?.address, date
    });
  },

  // 내 여행 일정 삭제
  myTripRemove: async({userId, tripId}:trip)=>{
    return await Trip.destroy({
      where: {userId, tripId}
    });
  },

  // 해당 유저가 찜한 캠핑장 조회
  myPickFind: async({userId, campId}:pick)=>{
    return await Pick.findOne({
      where: {userId, campId}
    });
  },

  // 해당 유저가 찜한 모든 캠핑장 조회
  myPickAllFind: async(userId:number)=>{
    return await Pick.findAll({
      where: {userId}
    });
  },

  // 해당 캠핑장 정보
  pickCamp: async({campId}:getCamp)=>{
    return await Camp.findAll({where:{campId}})
  },

  // 캠핑장 찜하기
  campPick: async({userId, campId}:pick)=>{
    await Pick.create({userId, campId});
    await Camp.increment({pickCount:1},{where:{campId}});
  },

  // 캠핑장 찜 취소
  campUnPick: async({userId, campId}:pick)=>{
    await Pick.destroy({where: {userId, campId}});
    await Camp.decrement({pickCount:1},{where:{campId}});
  }
};