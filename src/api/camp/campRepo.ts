import { Camp } from '../../database/models/camp';
import { Trip } from '../../database/models/trip';
import { Pick } from '../../database/models/pick';
import { LookUp } from '../../database/models/lookUp';
import { getCamp, trip, ip, mostCamp } from '../../interface/camp'
import { sequelize } from '../../database/models/sequlize'
import { Sequelize, QueryTypes } from 'sequelize'
import { Op } from 'sequelize'

export default {
  getTopicCamp: async ({topicId, pageNo, numOfRows}:getCamp) => {
    const getCamp = `
      SELECT topicMapping.topicId, 
      Camp.*
      FROM topicMapping AS topicMapping INNER JOIN camp AS Camp
      ON topicMapping.campId = Camp.campId
      WHERE topicMapping.topicId= ${topicId}
      ORDER BY Camp.createdtime ASC
      LIMIT ${numOfRows} OFFSET ${pageNo};
    `
    return sequelize.query(getCamp, {type: QueryTypes.SELECT});
  },

  getByRegionCamp: async ({address, numOfRows, pageNo}:getCamp) => {
    const regionCamp = `SELECT * FROM camp AS Camp WHERE camp.address LIKE '%${address}%' LIMIT ${numOfRows} OFFSET ${pageNo};`
    return sequelize.query(regionCamp, {type: QueryTypes.SELECT})
  },

  getIpCamp: async ({ip, campId}:ip) => {
    return await LookUp.findOne({where:{ip, campId}});
  },

  createLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.create({ ip, campId, time });
    await Camp.increment({lookUp : 1},{where:{campId}})
  },

  updateLookUp: async ({ip, campId, time}:ip) => {
    await LookUp.update({time},{where: { ip, campId }})
    await Camp.increment({lookUp : 1},{where:{campId}})
  },
  
  // 조회수, 리뷰, 찜
  getMostCamp: async () => {
    return await Camp.findAll({
      where:{}
    })
  },

  myTripSave: async({userId, date, address, campId}:trip)=>{
    console.log(typeof campId)
    return await Trip.create({
      userId, campId, date, address
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
    return await Pick.create({
      userId, campId
    });
  },

  campUnPick: async(userId:number, campId:number)=>{
    return await Pick.destroy({
      where: {userId, campId}
    });
  }
};