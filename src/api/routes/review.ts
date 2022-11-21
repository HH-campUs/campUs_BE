import { Router } from 'express';
import reviewController from '../review/reviewControl';
import authmiddleware from '../../middlewares/authmiddleware';


const reviewrouter = Router();

reviewrouter.route('/');

//검색하기
reviewrouter.get('/', reviewController.search);

//캠핑장 리뷰조회
reviewrouter.get('/:campId/review', reviewController.getReview);

//리뷰작성
reviewrouter.post('/:campId/review', authmiddleware, reviewController.createReview);

//리뷰수정
reviewrouter.put('/:campId/:reviewId', authmiddleware, reviewController.updateReview);

//리뷰삭제
reviewrouter.delete('/:campId/:reviewId', authmiddleware, reviewController.deleteReview);

//내가쓴리뷰조회
reviewrouter.get('/review', authmiddleware,reviewController.getMyReview);

export default reviewrouter;
