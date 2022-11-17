import { Request, Response, NextFunction } from 'express';
import {review} from '../../interface/review'
import Review from '../../database/models/review';
import reviewService from './reviewServ'; //받아온다

export default {
  //캠핑장 리뷰조회
  getReview : async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {campId}:review = req.params;
      
      const data = await reviewService.getReview({campId})
      res.status(200).json({
       
      })
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

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

