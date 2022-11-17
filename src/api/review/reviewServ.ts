import reviewRepo from './reviewRepo';

export default {
  //캠핑장 리뷰조회
  getReview : async (campId:number) => {
    return await reviewRepo.getReview(campId)
  },

  //리뷰작성
  createReview : async (userId: number, campId: number,reviewImg: string, reviewComment: string) => {
    return await reviewRepo.createReview(userId, campId, reviewImg, reviewComment)
  },

  //리뷰수정
  updateReview : async (campId:number) => {
    return await reviewRepo.getReview(campId)
  },
  // //리뷰삭제
  // deleteReview : async (campId:number) => {
  //   return await reviewRepo.getReview(campId)
  // },
  // //내가쓴리뷰조회
}

