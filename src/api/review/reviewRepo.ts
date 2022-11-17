import Review from '../../database/models/review';

export default {
  //캠핑장 리뷰조회
  getReview : async (campId:number) => {
   return await Review.findAll({where : {campId}})
},

  //리뷰작성
  createReview : async (userId: number, campId: number, reviewImg: string, reviewComment: string) => {
   await Review.create({
    userId, campId, reviewImg, reviewComment
   })
   return
 },
  //리뷰수정
  updateReview : async (campId:number) => {
    return await Review.findAll({where : {campId}})
 },
//   //리뷰삭제
//   deleteReview : async (campId:number) => {
//     return await Review.findAll({where : {campId}})
//  },
//   //내가쓴리뷰조회
}

