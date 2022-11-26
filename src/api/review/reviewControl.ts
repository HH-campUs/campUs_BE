import { Request, Response, NextFunction } from 'express';
import { review } from '../../interface/review';
import reviewService from './reviewServ'; //받아온다
import aws from 'aws-sdk';
import dotenv from 'dotenv';

export default {
  //캠핑장 리뷰조회
  getReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { campId }: review = req.params;
      const data = await reviewService.getReview({ campId });

      if (!campId || !data) throw new Error('잘못된요청입니다');
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
      const { userId }: review = res.locals.user;
      const { campId }: review = req.params;
      const { reviewImg, reviewComment } = req.body;
      if (!reviewComment.trim()) throw new Error('코멘트를 입력해주세요');
      await reviewService.createReview({
        userId,
        campId,
        reviewImg,
        reviewComment,
      });
      res.status(201).json({ ok: true, massage: '리뷰작성완료' });
    } catch (error) {
      next(error);
    }
  },

  //리뷰수정
  updateReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewId }: review = req.params;
      const { reviewImg, reviewComment }: review = req.body;
      const { userId }: review = res.locals.user;
      const findreview = await reviewService.findReviewAuthor({ reviewId });

      if (!findreview) throw new Error('잘못된요청입니다');
      if (userId !== findreview?.userId) {
        return res.status(400).json({ errorMessage: '권한이 없습니다.' });
      }
      await reviewService.updateReview({
        reviewId,
        reviewImg,
        reviewComment,
        userId,
      });
      res.status(200).json({ massage: '리뷰수정완료' });
    } catch (error) {
      next(error);
    }
  },

  //리뷰삭제
  deleteReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewId }: review = req.params;
      const { userId }: review = res.locals.user;
      const findreview = await reviewService.findReviewAuthor({ reviewId });

      if (!findreview) throw new Error('잘못된요청입니다');
      if (userId !== findreview?.userId) {
        return res.status(400).json({ errorMessage: '권한이 없습니다.' });
      }
      await reviewService.deleteReview({ reviewId, userId });
      res.status(200).json({ massage: '리뷰삭제완료' });
    } catch (error) {
      next(error);
    }
  },

  //내가쓴리뷰조회
  getMyReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId }: review = res.locals.user;
      const myreview = await reviewService.getMyReview({ userId });

      res.status(200).json({ data: myreview });
    } catch (error) {
      next(error);
    }
  },

  //캠핑장검색
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keyword }: review = req.body;
      const result = await reviewService.search({ keyword });
      if (!keyword) throw new Error('키워드를 입력해주세요');

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  },
    // //캠핑장검색
    // aniamlsearch: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const { keyword }: review = req.body;
    //     const result = await reviewService.search({ keyword });
    //     if (!keyword) throw new Error('키워드를 입력해주세요');
  
    //     return res.status(200).json({ data: result });
    //   } catch (error) {
    //     next(error);
    //   }
    // },
};
