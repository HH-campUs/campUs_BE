import { captureRejectionSymbol } from 'events';
import { rescheduleJob } from 'node-schedule';
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

  //리뷰작성자찾기
  findReviewAuthor: async (reviewId: number) => {
    return await reviewRepo.findReviewAuthor(reviewId);
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
  // //리뷰삭제
  // deleteReview: async (reviewId: number, userId: number) => {
  //   const findOneReview = await reviewRepo.findOneReview(reviewId);
  //   if (findOneReview?.userId === userId) {
  //     return await reviewRepo.deleteReview(reviewId);
  //   }
  // },
  //리뷰삭제
  deleteReview: async (reviewId: number, userId: number) => {
    const findByauthor = await reviewRepo.findReviewAuthor(reviewId);
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 삭제할 수 있습니다');

    const deleteReview = await reviewRepo.deleteReview(reviewId);
    return {
      reviewId: deleteReview,
    };
  },

  //내가쓴리뷰조회
  getMyReview: async (userId: number) => {
    const myreivew = await reviewRepo.getMyReview(userId);

    return myreivew.map((x) => {
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

  //캠핑장이름검색
  search: async (keyword: string) => {
    const getCampName = await reviewRepo.search(keyword);

    const campName = getCampName.map((camp) => {
      return {
        campId: camp.campId,
        campName: camp.campName,
        induty: camp.induty,
        doNm: camp.doNm,
        sigunguNm: camp.sigunguNm,
        address: camp.address,
        X: camp.X,
        Y: camp.Y,
        operPdCl: camp.operPdCl,
        operDeCl: camp.operDeCl,
        animal: camp.animal,
        ImageUrl: camp.ImageUrl,
        homePage: camp.homePage,
        sbrsCl: camp.sbrsCl,
        posblFcltyCl: camp.posblFcltyCl,
        wtrplCo: camp.wtrplCo,
        swrmCo: camp.swrmCo,
        toiletCo: camp.toiletCo,
        manageSttus: camp.manageSttus,
        themaEnvrnCl: camp.themaEnvrnCl,
        lookUp: camp.lookUp,
        eqpmnLendCl: camp.eqpmnLendCl,
        createdtime: camp.createdtime,
      };
    });
    return { camp: campName };
  },
};
