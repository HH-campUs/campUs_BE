// import { Request, Response, NextFunction } from 'express';
// import reviewService from './reviewServ'; //받아온다

// class reviewController {
//   //캠핑장 리뷰조회
//   getReview = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = res.locals.user;
//       const campId = req.params;
//       const getReview = await this.reviewService.findOneReview(userId,campId)
      
//       res.status(200).json(getReview)
//     } catch (error) {
//       res.status(error.status || 400).send({ message: error.message });
//     }

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

//   //내가쓴리뷰조회
// }

// export default reviewController;
