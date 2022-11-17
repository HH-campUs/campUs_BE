import { Request, Response, NextFunction } from 'express';
import { review } from '../../interface/review';
import reviewService from './reviewServ'; //받아온다

export default {
  //캠핑장 리뷰조회
  getReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { campId }: review = req.params;
      const data = await reviewService.getReview(Number(campId));
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //리뷰작성
  createReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const {userId} =res.locals.user
      const userId = 1;
      const { campId }: review = req.params;
      const { reviewImg, reviewComment } = req.body;
      await reviewService.createReview(
        userId,
        campId!,
        reviewImg,
        reviewComment
      );
      res.status(201).json({ ok: true, massage: '리뷰작성완료' });
    } catch (error) {
      next(error);
    }
  },
  //리뷰수정
  updateReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewId }:review = req.params;
      const { reviewImg, reviewComment } = req.body;
      // const { userId } = res.locals.user;
      const userId = 1;

      const findreview = await reviewService.updateReview(
        reviewId!,
        reviewImg,
        reviewComment,
        userId
      );
      res. status(200).json({ massage: '리뷰수정완료' })
    } catch (error) {
      next(error)
    }
  },

  // //리뷰삭제
  // deleteReview : async (req: Request, res: Response, next: NextFunction) => {
  //   try {

  //   } catch (error) {

  //   }
  // },
};
