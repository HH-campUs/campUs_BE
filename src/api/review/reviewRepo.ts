import Camp from '../../database/models/camp';
import Review from '../../database/models/review';
import { Op } from 'sequelize';
import { review } from '../../interface/review';

export default {
  //캠핑장 리뷰조회
  getReview: async ({ campId }: review) => {
    return await Review.findAll({ where: { campId } });
  },

  //리뷰작성
  createReview: async ({userId,campId,reviewImg,reviewComment,}: review) => {
    console.time("리뷰 레포입니다")
    await Review.create({
      userId,
      campId,
      reviewImg,
      reviewComment,
    });
    await Camp.increment({reviewCount : 1},{where:{campId}})
    console.timeEnd("리뷰 레포입니다")
    return;
  },

  //리뷰작성자찾기
  findReviewAuthor: async ({ reviewId }: review) => {
    return await Review.findByPk(reviewId);
  },

  //리뷰수정
  updateReview: async ({
    reviewId,
    reviewImg,
    reviewComment,
    userId,
  }: review) => {
    const updateReview = await Review.update(
      { reviewComment: reviewComment, reviewImg: reviewImg },
      { where: { reviewId: reviewId, userId: userId } }
    );
    return updateReview;
  },

  //리뷰찾기
  findOneReview: async ({ reviewId }: review) => {
    const reviews = await Review.findOne({ where: { reviewId } });
    return reviews;
  },

  //리뷰삭제
  deleteReview: async ({ campId, reviewId }: review) => {
    await Review.destroy({
      where: { reviewId },
    });
    await Camp.decrement({reviewCount : 1},{where:{campId}})
    return;
  },

  //내가쓴리뷰조회
  getMyReview: async ({ userId }: review) => {

    return await Review.findAll({ where: { userId } });
  },
  // //유저찾기
  // findUser: async (userId:number, reviewId:number) => {
  //   return await User.findOne({
  //      where: { reviewId: reviewId, userId:userId },
  //     include:[{model:User}] });
  // },

  //캠핑장이름검색
  CampSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        campName: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //시군구이름검색
  sigunguNmSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        sigunguNm: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //도이름검색
  doNmSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        doNm: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //편의시설이름검색
  sbrsClSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        sbrsCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //운영계절검색
  operPdClSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        operPdCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //운영요일검색
  operDeClSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        operDeCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //캠핑장주소검색
  addressSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        address: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //야영장종류검색
  indutySearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        induty: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
  //테마검색
  themaEnvrnClSearch: async ({ keyword }: review) => {
    const searchResult = await Camp.findAll({
      where: {
        themaEnvrnCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
};
