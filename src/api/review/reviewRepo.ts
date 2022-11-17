import { number } from 'joi';
import Review from '../../database/models/review';

export default {
  //캠핑장 리뷰조회
  getReview: async (campId: number) => {
    return await Review.findAll({ where: { campId } });
  },

  //리뷰작성
  createReview: async (
    userId: number,
    campId: number,
    reviewImg: string,
    reviewComment: string
  ) => {
    await Review.create({
      userId,
      campId,
      reviewImg,
      reviewComment,
    });
    return;
  },
  //리뷰수정
  updateReview: async (
    reviewId: number,
    reviewImg: string,
    reviewComment: string,
    userId: number
  ) => {
    const updateReview = await Review.update(
      { reviewComment: reviewComment, reviewImg: reviewImg },
      { where: { reviewId: reviewId, userId: userId } }
    );
    return updateReview;
  },

  //리뷰찾기
  findOneReview: async (reviewId: number) => {
    const reviews = await Review.findOne({ where: { reviewId } });
    return reviews;
  },

  //리뷰삭제
  deleteReview: async (reviewId: number) => {
    const deleteReview = await Review.destroy({
      where:{reviewId}
    })
    return deleteReview
  },

  //   //내가쓴리뷰조회
  //   getMyReview : async (campId:number) => {
  //     return await Review.findAll({where : {campId}})
  //  },
};
