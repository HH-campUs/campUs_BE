import campRepo from './campRepo';

export default {
  getTopicCamp: async (topic: string) => {
    const topicCamp = await campRepo.getTopicCamp(topic);
    console.log(topicCamp);
    console.log(topic, '서비스');
    return topicCamp
    // const TopicCamp = topicCamp.map((top)=>{
    // console.log(top.ImageUrl, "서비스")
    //     return{

    //     }
    // })
    // console.log(TopicCamp, "캠핑장 정보")

    // let TopicCamp:any[] = []; // any 꼭 고쳐
    //   topicCamp.forEach((post) => {
    //     TopicCamp.push(post)
    //   }) 
    // console.log(TopicCamp, '캠핑장 정보');
    // return TopicCamp;
  },
};