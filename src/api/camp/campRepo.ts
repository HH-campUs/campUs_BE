import { Camp } from '../../database/models/camp';
import { Trip } from '../../database/models/trip';
import { Pick } from '../../database/models/pick';
import { LookUp } from '../../database/models/lookUp';
import { getCamp, trip, ip } from '../../interface/camp'
import { sequelize } from '../../database/models/sequlize'
import { QueryTypes } from 'sequelize'

export default {
  getTopicCamp: async ({topicId, pageNo, numOfRows}:getCamp) => {
    const getCamp = `
      SELECT Camp.*
      FROM topicMapping AS topicMapping INNER JOIN camp AS Camp
      ON topicMapping.campId = Camp.campId
      WHERE topicMapping.topicId= ${topicId}
      ORDER BY Camp.createdtime ASC
      LIMIT ${numOfRows} OFFSET ${pageNo};
    `
    
    return sequelize.query(getCamp, {type: QueryTypes.SELECT})
  },

  getByRegionCamp: async ({doNm, numOfRows, pageNo}:getCamp) => {
    console.time("regionTime")
    const regionCamp = `SELECT * FROM camp AS Camp WHERE doNm LIKE '%${doNm}%'`
    const regionLim = `LIMIT ${numOfRows} OFFSET ${pageNo};`
    const camp = await sequelize.query(regionCamp+regionLim, {type: QueryTypes.SELECT})
    const total = await sequelize.query(regionCamp, {type: QueryTypes.SELECT})
    console.timeEnd("regionTime")
    return {regionCamp : camp, total : total.length}
  },

  regionTotal: async ({doNm}:getCamp) => {
    const regionCamp = `SELECT COUNT(doNm) as total FROM camp AS Camp WHERE doNm LIKE '%${doNm}%';`
    const total = sequelize.query(regionCamp, {type: QueryTypes.SELECT})
    return total
  },

  getIpCamp: async ({ip, campId}:ip) => {
    console.log("ip GET입니다")
    return await LookUp.findOne({where:{ip, campId}});
    // `SELECT * FROM lookup WHERE ${ip}' AND ${campId}`
  },

  createLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.create({ ip, campId, time });
    await Camp.increment({lookUp : 1},{where:{campId}})
    // `INSERT INTO lookUp ( campId, ip, time ) VALUES ( ${campId}, '${ip}', ${time} )`
    // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
  },

  updateLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.update({time},{where: { ip, campId }})
    await Camp.increment({lookUp : 1},{where:{campId}})
    // `UPDATE lookUp SET ${time} WHERE ${ip}, ${campId}`
    // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
  },
  
  // 조회수
  getMostLook: async () => {
    // async function as(mostLook:number[]) {
    //   Math.max.apply(null,mostLook)
    // } 
    const mostLook = await Camp.max('lookUp')
    return await Camp.findOne({
      where:{lookUp : mostLook}
    })
  },

  // 리뷰
  getMostReview: async()=>{
    const mostReview = await Camp.max('reviewCount')
    return await Camp.findOne({
      where:{reviewCount : mostReview}
    },)
  },

  // 찜
  getMostPick: async()=>{
    const mostPick = await Camp.max('pickCount')
    return await Camp.findOne({
      where:{pickCount : mostPick}
    })
  },

  myTripSave: async({userId, date, campId}:trip)=>{
    console.log(typeof campId)
    const Address = await Camp.findOne({where:{campId}})
    return await Trip.create({
      userId, campId, date, address:Address?.address
    });
  },

  myTripRemove: async({userId, tripId}:trip)=>{
    return await Trip.destroy({
      where: {userId, tripId}
    });
  },

  campPickFind: async(userId:number, campId:number)=>{
    return await Pick.findOne({
      where: {userId, campId}
    });
  },

  campPick: async(userId:number, campId:number)=>{
    await Pick.create({userId, campId});
    await Camp.increment({pickCount:1},{where:{campId}});
  },

  campUnPick: async(userId:number, campId:number)=>{
    await Pick.destroy({where: {userId, campId}});
    await Camp.decrement({pickCount:1},{where:{campId}});
  }
};