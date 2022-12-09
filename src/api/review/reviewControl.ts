import { Request, Response, NextFunction } from 'express';
import { review } from '../../interface/review';
import { search } from '../../interface/review';
import reviewService from './reviewServ'; //받아온다

export default {
  //캠핑장 리뷰조회
  getReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { campId }: review = req.params;
      const data = await reviewService.getReview({ campId });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },

  //리뷰작성
  createReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId }: review = res.locals.user;
      const { campId }: review = req.params;
      const { reviewComment, likeStatus } = req.body;

      const files = req.files as Express.MulterS3.File[]; //파일을 배열로 받음
      const reviewImgs = files.map((x) => {
        return x.location;
      });
      const reviewImg = reviewImgs.join(',');

      await reviewService.createReview({
        userId,
        campId,
        reviewImg,
        reviewComment,
        likeStatus,
      });
      res.status(201).json({ ok: true, massage: '리뷰작성완료' });
    } catch (error) {
      next(error);
    }
  },
  // //리뷰작성시 캠핑장 좋아요
  // updateCampLike: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { userId }: review = res.locals.user;
  //     const { reviewId }: review = req.params;

  //     const camplike = await reviewService.updateCampLike({
  //       userId,
  //       reviewId,
  //     });
  //     res.status(201).json(camplike);
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  //리뷰수정
  updateReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewId }: review = req.params;
      const { reviewComment, likeStatus }: review = req.body;
      const { userId }: review = res.locals.user;
      const files = req.files as Express.MulterS3.File[]; //파일을 배열로 받음
      const reviewImgs = files.map((x) => {
        return x.location;
      });
      const reviewImg = reviewImgs.join(',');
      await reviewService.findReviewAuthor({ reviewId });

      await reviewService.updateReview({
        reviewId,
        reviewImg,
        reviewComment,
        likeStatus,
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
      const { campId, reviewId }: review = req.params;
      const { userId }: review = res.locals.user;
      const findreview = await reviewService.findReviewAuthor({ reviewId });

      await reviewService.deleteReview({ campId, reviewId, userId });
      res.status(200).json({ massage: '리뷰삭제완료' });
    } catch (error) {
      next(error);
    }
  },

  //내가쓴리뷰조회
  getMyReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 만약에 다른사람 리뷰 볼수 있을 때
      // const { userId }: review = req.params;

      const { userId }: review = res.locals.user;
      const myreview = await reviewService.getMyReview({ userId });

      res.status(200).json({ data: myreview });
    } catch (error) {
      next(error);
    }
  },
 
  //새로올라온 리뷰조회
  getNewReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allreview = await reviewService.getNewReview();

      res.status(200).json({ data: allreview });
    } catch (error) {
      next(error);
    }
  },

  // //캠핑장검색
  // search: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { keyword }: review = req.body;
  //     const result = await reviewService.search({ keyword });
  //     if (!keyword) throw new Error('키워드를 입력해주세요');

  //     return res.status(200).json({ data: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  //캠핑장쿼리검색
  querysearch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keyword, numOfRows, pageNo }: search = req.query;
      res
        .status(200)
        .json(await reviewService.querysearch({ keyword, numOfRows, pageNo }));
    } catch (error) {
      next(error);
    }
  },
  //캠핑장쿼리검색+sort
  searchSort: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keyword, numOfRows, pageNo, sort }: search = req.query;
      res
        .status(200)
        .json(
          await reviewService.searchSort({ keyword, numOfRows, pageNo, sort })
        );
    } catch (error) {
      next(error);
    }
  },
};
