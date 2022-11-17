import { Request, Response, NextFunction } from 'express';
import {review} from '../../interface/review'
import Review from '../../database/models/review';
import reviewService from './reviewServ'; //받아온다
import reviewRepo from './reviewRepo';

export default {
  //캠핑장 리뷰조회
  getReview : async ({campId}:review) => {
    return await reviewRepo.getReview({campId})
  },

  // {
  //     “userId” : 1,
  //     “campId” : 1,
  //     “reviewImg” : ”img.png”,
  //     “reviewComment” : ”리뷰입니다”
  //   }
  //   /camps/:campId/review

  //리뷰작성

  //리뷰수정

  //리뷰삭제

  //내가쓴리뷰조회
}

