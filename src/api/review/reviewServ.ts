import Review from '../../database/models/review';
import reviewRepo from './reviewRepo';

export default {
  //캠핑장 리뷰조회
  getReview: async (campId: number) => {
    return await reviewRepo.getReview(campId);
  },

  //리뷰작성
  createReview: async (
    userId: number,
    campId: number,
    reviewImg: string,
    reviewComment: string
  ) => {
    return await reviewRepo.createReview(
      userId,
      campId,
      reviewImg,
      reviewComment
    );
  },

  //리뷰수정
  updateReview: async (
    reviewId: number,
    reviewImg: string,
    reviewComment: string,
    userId: number
  ) => {
    const findreview = await reviewRepo.findOneReview(reviewId);
    if (findreview?.userId === userId)
      return await reviewRepo.updateReview(
        userId,
        reviewImg,
        reviewComment,
        reviewId
      );
  },
  //리뷰삭제
  deleteReview: async (reviewId: number, userId: number) => {
    const findOneReview = await reviewRepo.findOneReview(reviewId);
    if (findOneReview?.userId === userId) {
      return await reviewRepo.deleteReview(reviewId);
    }
  },
  //내가쓴리뷰조회
  getMyReview: async (userId: number) => {
    const myreivew = await reviewRepo.getMyReview(userId);

    return myreivew.map((x: any) => {
      return {
        reviewId: x.userId,
        userId: x.userId,
        campId: x.campId,
        reviewImg: x.reviewImg,
        reviewComment: x.reviewComment,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
      };
    });
  },

  //검색하기
  search: async (keyword: string) => {
    const getcamp = await reviewRepo.search(keyword);

    const campData = getcamp.map((camp: any) => {

      return {
        campId: camp.campId,
      };
    });
    return { camp: campData };
  },
};
