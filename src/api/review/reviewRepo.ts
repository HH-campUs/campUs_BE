import Review from '../../database/models/review';

export default {
  //캠핑장 리뷰조회
  getReview : async (campId:number) => {
   return await Review.findAll({where : {campId}})
},

  

  // {
  //     “userId” : 1,
  //     “campId” : 1,
  //     “reviewImg” : ”img.png”,
  //     “reviewComment” : ”리뷰입니다”
  //   }
  //   /camps/:campId/review

  //리뷰작성

  //리뷰수정

  //리뷰삭제

  //내가쓴리뷰조회
}

