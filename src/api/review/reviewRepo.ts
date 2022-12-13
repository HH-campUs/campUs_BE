import Camp from '../../database/models/camp';
import Review from '../../database/models/review';
import User from '../../database/models/user';
import { Op } from 'sequelize';
import { review } from '../../interface/review';
import { search } from '../../interface/review';
import { sequelize } from '../../database/models/sequlize';
import { QueryTypes } from 'sequelize';

export default {
  //캠핑장 리뷰조회
  getReview: async ({ campId }: review) => {
    return await Review.findAll({
      where: { campId },
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['profileImg', 'nickname'],
        },
      ],
    });
  },

  //리뷰작성
  createReview: async ({
    userId,
    campId,
    reviewImg,
    reviewComment,
    likeStatus,
  }: review) => {
    console.time('리뷰 레포입니다');
    await Review.create({
      userId,
      campId,
      reviewImg,
      reviewComment,
      likeStatus,
    });
    await Camp.increment({ reviewCount: 1 }, { where: { campId } });
    console.timeEnd('리뷰 레포입니다');
    return;
  },
  // //리뷰작성시 캠핑장 좋아요
  // findLike: async ({ userId, reviewId }: review) => {
  //   const likefind = await Like.findOne({ where: { userId, reviewId } });
  //   return likefind;
  // },
  // createlike: async ({ userId, reviewId }: review) => {
  //   await Like.create({ userId, reviewId });
  // },
  // destroyLike: async ({ userId, reviewId }: review) => {
  //   await Like.destroy({ where: { userId, reviewId } });
  // },
  // increment: async ({ reviewId }: review) => {
  //   await Review.increment({ likeCount: 1 }, { where: { reviewId } });
  // },
  // decrement: async ({ reviewId }: review) => {
  //   await Review.increment({ likeCount: 1 }, { where: { reviewId } });
  // },

  //리뷰작성자찾기
  findReviewAuthor: async ({ reviewId }: review) => {
    return await Review.findByPk(reviewId);
  },

  //리뷰수정
  updateReview: async ({
    reviewId,
    reviewImg,
    reviewComment,
    likeStatus,
    userId,
  }: review) => {
    const updateReview = await Review.update(
      {
        reviewComment: reviewComment,
        reviewImg: reviewImg,
        likeStatus: likeStatus,
      },
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
    await Camp.decrement({ reviewCount: 1 }, { where: { campId } });
    return;
  },

  //내가쓴리뷰조회
  getMyReview: async ({ userId }: review) => {
    return await Review.findAll({
      where: { userId },
      include: [
        {
          model: Camp,
          as: 'Camp',
          attributes: ['campName'],
        },
      ],
    });
  },

  //새로올라온 리뷰조회
  getNewReview: async () => {
    return await Review.findAll({
      where: {},
      attributes: { exclude: ['userId'] },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['profileImg', 'nickname'],
        },
      ],
    });
  },

  // //유저찾기
  // findUser: async (userId:number, reviewId:number) => {
  //   return await User.findOne({
  //      where: { reviewId: reviewId, userId:userId },
  //     include:[{model:User}] });
  // },

  //캠핑장쿼리검색+sort
  searchSort: async ({ keyword, numOfRows, pageNo, sort }: search) => {
    console.log(pageNo, '페이지 넘버입니다')
    const query=`
    SELECT *
    FROM camp
    WHERE (Camp.campName LIKE CONCAT('%',$keyword,'%') OR Camp.induty LIKE CONCAT('%',$keyword,'%') OR Camp.doNm LIKE CONCAT('%',$keyword,'%') OR Camp.sigunguNm LIKE CONCAT('%',$keyword,'%') OR Camp.address LIKE CONCAT('%',$keyword,'%') OR Camp.operPdCl LIKE CONCAT('%',$keyword,'%') OR Camp.operDeCl LIKE CONCAT('%',$keyword,'%') OR Camp.animal LIKE CONCAT('%',$keyword,'%') OR Camp.sbrsCl LIKE CONCAT('%',$keyword,'%') OR Camp.posblFcltyCl LIKE CONCAT('%',$keyword,'%') OR Camp.manageSttus LIKE CONCAT('%',$keyword,'%') OR Camp.themaEnvrnCl LIKE CONCAT('%',$keyword,'%') OR Camp.eqpmnLendCl LIKE CONCAT('%',$keyword,'%') OR Camp.featureNm LIKE CONCAT('%',$keyword,'%') OR Camp.clturEvent LIKE CONCAT('%',$keyword,'%'))
    `
    const orderNlimit = `
      ORDER BY ${sort} DESC
      LIMIT $numOfRows OFFSET $pageNo;
    `
    const searchCamp = await sequelize.query(query+orderNlimit, {bind:{ keyword, numOfRows, pageNo:String(pageNo) }, type: QueryTypes.SELECT})
    const total = await sequelize.query(query, {bind : {keyword}, type: QueryTypes.SELECT})
    return { searchCamp, total : total.length }
  },

  //캠핑장이름검색
  CampSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        campName: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //야영장종류검색
  indutySearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        induty: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  // //도이름검색
  // doNmSearch: async ({ keyword }: review) => {
  //   const searchResult = await Camp.findAll({
  //     where: {
  //       doNm: {
  //         [Op.like]: '%' + keyword + '%',
  //       },
  //     },
  //   });
  //   return searchResult;
  // },
  //도이름검색페이지
  doNmSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        doNm: {
          [Op.like]: `${'%' + keyword + '%'}`,
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },

  //시군구이름검색
  sigunguNmSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        sigunguNm: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //캠핑장주소검색
  addressSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        address: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //운영계절검색
  operPdClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        operPdCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //운영요일검색
  operDeClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        operDeCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //반려동물 동반가능여부
  animalSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        animal: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //편의시설이름검색
  sbrsClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        sbrsCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //주변이용가능시설검색
  posblFcltyClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        posblFcltyCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //운영상태검색
  manageSttusSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        manageSttus: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //테마검색
  themaEnvrnClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        themaEnvrnCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //캠핑장비 대여검색
  eqpmnLendClSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        eqpmnLendCl: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //간단소개글검색
  featureNmSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        featureNm: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
  //자체문화행사검색
  clturEventSearch: async ({ keyword, numOfRows, pageNo }: search) => {
    const numofrows = Number(numOfRows);
    const pageno = Number(pageNo);
    const searchResult = await Camp.findAll({
      where: {
        clturEvent: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      limit: numofrows,
      offset: pageno,
    });
    return searchResult;
  },
};
