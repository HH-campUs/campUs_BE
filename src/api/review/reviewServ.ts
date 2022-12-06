import reviewRepo from './reviewRepo';
import { review } from '../../interface/review';
import { deleteFile } from '../../utils/multer';
import Review from '../../database/models/review';
import { search } from '../../interface/review';
export default {
  //캠핑장 리뷰조회
  getReview: async ({ campId }: review) => {
    const data = await reviewRepo.getReview({ campId });
    if (!campId || !data) throw new Error('잘못된요청입니다');
    return data.map((x)=>{
      return {
        reviewId:x.reviewId,
        campId:x.campId,
        profileImg:x.User.profileImg,
        nickname:x.User.nickname,
        reviewImg:x.reviewImg,
        reviewComment:x.reviewComment,
        likestatus:x.likeStatus,
        createdAt:x.createdAt,
        updatedAt:x.updatedAt,
      }
    })
  },

  //리뷰작성
  createReview: async ({
    userId,
    campId,
    reviewImg,
    reviewComment,
    likeStatus,
  }: review) => {
    if (!reviewComment!.trim()) throw new Error('코멘트를 입력해주세요');
    const likestring = String(likeStatus)[0];
    if(likeStatus!<=0 || likeStatus!>3 || Number(likestring)<=0)throw new Error("셋중하나만선택해주세요");
    return await reviewRepo.createReview({
      userId,
      campId,
      reviewImg,
      reviewComment,
      likeStatus,
    });
  },
  // //리뷰작성시 캠핑장 좋아요
  // updateCampLike: async ({ userId, reviewId }: review) => {
  //   const findlike = await reviewRepo.findLike({ userId, reviewId });
  //   if (findlike === 1) {
  //     await reviewRepo.createlike({ userId, reviewId });
  //     await reviewRepo.increment({ userId, reviewId });
  //     return { Message: '최고!추천해요!' };
  //   } else {
  //     await reviewRepo.destroyLike({ userId, reviewId });
  //     await reviewRepo.decrement({ userId, reviewId });
  //     return { Message: '최고!추천해요!취소' };
  //   };
  //   if (findlike === 2) {
  //     await reviewRepo.createlike({ userId, reviewId });
  //     await reviewRepo.increment({ userId, reviewId });
  //     return { Message: '좋았어요!' };
  //   } else {
  //     await reviewRepo.destroyLike({ userId, reviewId });
  //     await reviewRepo.decrement({ userId, reviewId });
  //     return { Message: '좋았어요!취소' };
  //   };

  //   if (findlike === 3) {
  //     await reviewRepo.createlike({ userId, reviewId });
  //     await reviewRepo.increment({ userId, reviewId });
  //     return { Message: '추천하지않아요' };
  //   } else {
  //     await reviewRepo.destroyLike({ userId, reviewId });
  //     await reviewRepo.decrement({ userId, reviewId });
  //     return { Message: '천하지않아요취소' };
  //   }
  // },

  //리뷰작성자찾기
  findReviewAuthor: async ({ reviewId }: review) => {
    return await reviewRepo.findReviewAuthor({ reviewId });
  },

  //리뷰수정
  updateReview: async ({
    reviewId,
    reviewImg,
    reviewComment,
    likeStatus,
    userId,
  }: review) => {
    const findByauthor = await reviewRepo.findReviewAuthor({ reviewId });
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다');
      //이미지 삭제 로직
    const findImage = findByauthor.reviewImg?.split(",")
    findImage!.forEach(ImageUrl => {
      const fileName = ImageUrl.slice(55)
      const fileDir = ImageUrl.slice(48,54)
      deleteFile(fileDir,fileName)
    });
    //예외처리
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (userId !== findByauthor?.userId) throw new Error("권한이없습니다");
    
    const likestring = String(likeStatus)[0];
    if(likeStatus!<=0 || likeStatus!>3 || Number(likestring)<=0)throw new Error("셋중하나만선택해주세요");
    const updateReview = await reviewRepo.updateReview({
      reviewId,
      userId,
      reviewImg,
      reviewComment,
      likeStatus,
    });
    return {
      updateReview,
    };
  },

  //리뷰삭제
  deleteReview: async ({ campId, reviewId, userId }: review) => {
    const findByauthor = await reviewRepo.findReviewAuthor({ reviewId });
    if (!findByauthor) throw new Error('잘못된요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 삭제할 수 있습니다');
      //이미지 삭제 로직
    const findImage = findByauthor.reviewImg?.split(",")
      findImage!.forEach(ImageUrl => {
        const fileName = ImageUrl.slice(55)
        const fileDir = ImageUrl.slice(48,54)
        deleteFile(fileDir,fileName)
      });
    const deleteReview = await reviewRepo.deleteReview({ campId, reviewId });
    return {
      reviewId: deleteReview,
    };
  },

  //내가쓴리뷰조회
  getMyReview: async ({ userId }: review) => {
    const myreview = await reviewRepo.getMyReview({ userId });
    return myreview.map((x) => {
      return {
        reviewId: x.userId,
        userId: x.userId,
        campId: x.campId,
        campName:x.Camp.campName,
        reviewImg: x.reviewImg,
        reviewComment: x.reviewComment,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
      };
    });
  },
    //새로올라온 리뷰조회
    getNewReview: async () => {
      return await reviewRepo.getNewReview();
    },

  // //캠핑장검색
  // search: async ({ keyword }: review) => {
  //   const campName = await reviewRepo.CampSearch({ keyword });
  //   const induty = await reviewRepo.indutySearch({ keyword });
  //   const doNm = await reviewRepo.doNmSearch({ keyword });
  //   const sigunguNm = await reviewRepo.sigunguNmSearch({ keyword });
  //   const address = await reviewRepo.addressSearch({ keyword });
  //   const operPdCl = await reviewRepo.operPdClSearch({ keyword });
  //   const operDeCl = await reviewRepo.operDeClSearch({ keyword });
  //   const animal = await reviewRepo.animalSearch({ keyword });
  //   const sbrsCl = await reviewRepo.sbrsClSearch({ keyword });
  //   const posblFcltyCl = await reviewRepo.posblFcltyClSearch({ keyword });
  //   const manageSttus = await reviewRepo.manageSttusSearch({ keyword });
  //   const themaEnvrnCl = await reviewRepo.themaEnvrnClSearch({ keyword });
  //   const eqpmnLendCl = await reviewRepo.eqpmnLendClSearch({ keyword });
  //   const featureNm = await reviewRepo.featureNmSearch({ keyword });
  //   const clturEvent = await reviewRepo.clturEventSearch({ keyword });

  //   return {
  //     campName,
  //     sigunguNm,
  //     doNm,
  //     sbrsCl,
  //     operPdCl,
  //     operDeCl,
  //     address,
  //     induty,
  //     themaEnvrnCl,
  //     eqpmnLendCl,
  //     manageSttus,
  //     posblFcltyCl,
  //     animal,
  //     featureNm,
  //     clturEvent,
  //   };
  // },
 
   //캠핑장쿼리검색
   querysearch: async ({ keyword, numOfRows, pageNo }: search) => {
    // 0 이하의 페이지를 요청하면 pageNo 를 1로
    pageNo! <= 0 ? (pageNo = 1) : (pageNo = (pageNo! - 1) * numOfRows!);
    const campName = await reviewRepo.CampSearch({ keyword , numOfRows, pageNo});
    const induty = await reviewRepo.indutySearch({ keyword, numOfRows, pageNo });
    const doNm = await reviewRepo.doNmSearch({keyword,numOfRows,pageNo,});
    const sigunguNm = await reviewRepo.sigunguNmSearch({ keyword , numOfRows, pageNo});
    const address = await reviewRepo.addressSearch({ keyword, numOfRows, pageNo });
    const operPdCl = await reviewRepo.operPdClSearch({ keyword , numOfRows, pageNo});
    const operDeCl = await reviewRepo.operDeClSearch({ keyword, numOfRows, pageNo });
    const animal = await reviewRepo.animalSearch({ keyword, numOfRows, pageNo });
    const sbrsCl = await reviewRepo.sbrsClSearch({ keyword, numOfRows, pageNo });
    const posblFcltyCl = await reviewRepo.posblFcltyClSearch({ keyword, numOfRows, pageNo });
    const manageSttus = await reviewRepo.manageSttusSearch({ keyword, numOfRows, pageNo });
    const themaEnvrnCl = await reviewRepo.themaEnvrnClSearch({ keyword, numOfRows, pageNo });
    const eqpmnLendCl = await reviewRepo.eqpmnLendClSearch({ keyword, numOfRows, pageNo });
    const featureNm = await reviewRepo.featureNmSearch({ keyword , numOfRows, pageNo});
    const clturEvent = await reviewRepo.clturEventSearch({ keyword, numOfRows, pageNo });


    campName.sort((a,b) => {
      return b.lookUp - a.lookUp
    })

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
      eqpmnLendCl,
      manageSttus,
      posblFcltyCl,
      animal,
      featureNm,
      clturEvent,
    };
  },

     //캠핑장쿼리검색+sort
     searchSort: async ({ keyword, numOfRows, pageNo, sort }: search) => {
      // 0 이하의 페이지를 요청하면 pageNo 를 1로
      pageNo! <= 0 ? (pageNo = 1) : (pageNo = (pageNo! - 1) * numOfRows!);
      const searchSort = await reviewRepo.searchSort({ keyword , numOfRows, pageNo, sort});
  


      return {
        searchSort,
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
