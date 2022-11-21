import campRepo from './campRepo';
import { topic, trip } from '../../interface/camp'

export default {
  getTopicCamp: async ({topic}: topic) => {
    return await campRepo.getTopicCamp({topic});

    // if topic이 있는 특정 컬럼 걸러내서 보내기

    // let TopicCamp:any[] = []; // any 꼭 고쳐
    //   topicCamp.forEach((post) => {
    //     TopicCamp.push(post)
    //   }) 
    // console.log(TopicCamp, '캠핑장 정보');
    // return TopicCamp;
  },

  myTripSave: async({userId, date, campId}:trip)=>{
    return await campRepo.myTripSave({userId, date, campId});
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