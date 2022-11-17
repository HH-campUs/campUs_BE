import { Router } from 'express';
import reviewController from '../review/reviewControl';

const reviewrouter = Router();

reviewrouter.route('/');
//캠핑장 리뷰조회
reviewrouter.get('/:campId/review', reviewController.getReview);

//리뷰작성
reviewrouter.post('/:campId/review', reviewController.createReview);

//리뷰수정
reviewrouter.put('/:campId/:reviewId', reviewController.updateReview);

//리뷰삭제
reviewrouter.delete('/:campId/:reviewId', reviewController.deleteReview);

//내가쓴리뷰조회
// reviewrouter.get('/review', reviewController.getMyReview);

export default reviewrouter;
