import { Request, Response, NextFunction } from 'express';
import {review} from '../../interface/review'
import reviewService from './reviewServ'; //받아온다

export default {
  //캠핑장 리뷰조회
  getReview : async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {campId}:review = req.params
      const data = await reviewService.getReview(Number(campId))
      res.status(200).json({
       data
      })
    } catch (error) {
      next(error);
    }
  },

//     // try {
//     //     const{userId,campId} =req.body
//     //     })
//     // } catch (error) {
//     console.error();
//     res.status(500).json({ message: error.message });
//     // }
//   };

//   // {
//   //     “userId” : 1,
//   //     “campId” : 1,
//   //     “reviewImg” : ”img.png”,
//   //     “reviewComment” : ”리뷰입니다”
//   //   }
//   //   /camps/:campId/review

//   //리뷰작성

//   //리뷰수정

//   //리뷰삭제
}
