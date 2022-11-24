import { number } from 'joi';
import Camp from '../../database/models/camp';
import Review from '../../database/models/review';
import User from '../../database/models/user';
import { Op } from 'sequelize';
import { review } from '../../interface/review';

export default {
  //캠핑장 리뷰조회
  getReview: async ({ campId }: review) => {
    return await Review.findAll({ where: { campId } });
  },

  //리뷰작성
  createReview: async ({
    userId,
    campId,
    reviewImg,
    reviewComment,
  }: review) => {
    await Review.create({
      userId,
      campId,
      reviewImg,
      reviewComment,
    });
    return;
  },

  //리뷰작성자찾기
  findReviewAuthor: async ({reviewId}:review) => {
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
  findOneReview: async (reviewId: number) => {
    const reviews = await Review.findOne({ where: { reviewId } });
    return reviews;
  },

  //리뷰삭제
  deleteReview: async (reviewId: number) => {
    const deleteReview = await Review.destroy({
      where: { reviewId },
    });
    return deleteReview;
  },

  //내가쓴리뷰조회
  getMyReview: async (userId: number) => {
    return await Review.findAll({ where: { userId } });
  },
  // //유저찾기
  // findUser: async (userId:number, reviewId:number) => {
  //   return await User.findOne({
  //      where: { reviewId: reviewId, userId:userId },
  //     include:[{model:User}] });
  // },

  //캠핑장이름검색
  search: async (keyword: string) => {
    const searchResult = await Camp.findAll({
      where: {
        campName: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return searchResult;
  },
};
