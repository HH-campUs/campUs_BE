import { Camp } from '../../database/models/camp';
import { Trip } from '../../database/models/trip';
import { Pick } from '../../database/models/pick';
import { Topic } from '../../database/models/topic';
import { Op } from 'sequelize';
import { topic, trip } from '../../interface/camp'

export default {
  getTopicCamp: async ({topic}:topic) => {
    // console.log(topic, '레포');
    // console.log(Camp);
    const getCamp = await Camp.findAll({
      
    });
  },

  myTripSave: async({userId, date, campId}:trip)=>{
    return await Trip.create({
      userId, campId, date
    })
  },

  myTripRemove: async({userId, tripId}:trip)=>{
    return await Trip.destroy({
      where: {userId, tripId}
    })
  },

  campPickFind: async(userId:number, campId:number)=>{
    return await Pick.findOne({
      where: {userId, campId}
    })
  },

  campPick: async(userId:number, campId:number)=>{
    return await Pick.create({
      userId, campId
    })
  },

  campUnPick: async(userId:number, campId:number)=>{
    return await Pick.destroy({
      where: {userId, campId}
    })
  }
};