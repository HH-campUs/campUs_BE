import reviewRepo from './reviewRepo';
import { review } from '../../interface/review';

export default {
  //캠핑장 리뷰조회
  getReview: async ({ campId }: review) => {
    return await reviewRepo.getReview({ campId });
  },

  //리뷰작성
  createReview: async ({
    userId,
    campId,
    reviewImg,
    reviewComment,
  }: review) => {
    return await reviewRepo.createReview({
      userId,
      campId,
      reviewImg,
      reviewComment,
    });
  },

  //리뷰작성자찾기
  findReviewAuthor: async ({ reviewId }: review) => {
    return await reviewRepo.findReviewAuthor({ reviewId });
  },

  //리뷰수정
  updateReview: async ({
    reviewId,
    reviewImg,
    reviewComment,
    userId,
  }: review) => {
    const findByauthor = await reviewRepo.findReviewAuthor({ reviewId });
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다');

    const updateReview = await reviewRepo.updateReview({
      reviewId,
      userId,
      reviewImg,
      reviewComment,
    });
    return {
      updateReview,
    };
  },

  //리뷰삭제
  deleteReview: async ({ reviewId, userId }: review) => {
    const findByauthor = await reviewRepo.findReviewAuthor({ reviewId });
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 삭제할 수 있습니다');

    const deleteReview = await reviewRepo.deleteReview({ reviewId });
    return {
      reviewId: deleteReview,
    };
  },

  //내가쓴리뷰조회
  getMyReview: async ({ userId }: review) => {
    return await reviewRepo.getMyReview({ userId });
    // const myreview = await reviewRepo.getMyReview({ userId });
    // return myreview.map((x) => {
    //   return {
    //     reviewId: x.userId,
    //     userId: x.userId,
    //     campId: x.campId,
    //     reviewImg: x.reviewImg,
    //     reviewComment: x.reviewComment,
    //     createdAt: x.createdAt,
    //     updatedAt: x.updatedAt,
    //   };
    // });
  },

  //캠핑장검색
  search: async ({ keyword }: review) => {
    const campName = await reviewRepo.CampSearch({ keyword });
    const sigunguNm = await reviewRepo.sigunguNmSearch({ keyword });
    const doNm = await reviewRepo.doNmSearch({ keyword });
    const sbrsCl = await reviewRepo.sbrsClSearch({ keyword });
    const operPdCl = await reviewRepo.operPdClSearch({ keyword });
    const operDeCl = await reviewRepo.operDeClSearch({ keyword });
    const address = await reviewRepo.addressSearch({ keyword });
    const induty = await reviewRepo.indutySearch({ keyword });
    const themaEnvrnCl = await reviewRepo.themaEnvrnClSearch({ keyword });

    return {
      campName,
      sigunguNm,
      doNm,
      sbrsCl,
      operPdCl,
      operDeCl,
      address,
      induty,
      themaEnvrnCl,
    };
  },
};

// return getCampName

// const getCampName = await reviewRepo.CampSearch({ keyword });
// const campName = getCampName.map((camp) => {
//   return {
//     campId: camp.campId,
//     campName: camp.campName,
//     induty: camp.induty,
//     doNm: camp.doNm,
//     sigunguNm: camp.sigunguNm,
//     address: camp.address,
//     X: camp.X,
//     Y: camp.Y,
//     operPdCl: camp.operPdCl,
//     operDeCl: camp.operDeCl,
//     animal: camp.animal,
//     ImageUrl: camp.ImageUrl,
//     homePage: camp.homePage,
//     sbrsCl: camp.sbrsCl,
//     posblFcltyCl: camp.posblFcltyCl,
//     wtrplCo: camp.wtrplCo,
//     swrmCo: camp.swrmCo,
//     toiletCo: camp.toiletCo,
//     manageSttus: camp.manageSttus,
//     themaEnvrnCl: camp.themaEnvrnCl,
//     lookUp: camp.lookUp,
//     eqpmnLendCl: camp.eqpmnLendCl,
//     createdtime: camp.createdtime,
//   };
// });
