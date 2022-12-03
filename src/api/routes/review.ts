import { Router } from 'express';
import reviewController from '../review/reviewControl';
import authmiddleware from '../../middlewares/authmiddleware';
import { uploads } from '../../utils/multer';


const reviewrouter = Router();

// //검색하기
// reviewrouter.get('/search', reviewController.search);
//쿼리검색하기
reviewrouter.get('/querysearch', reviewController.querysearch);

//내가쓴리뷰조회
reviewrouter.get('/users', authmiddleware,reviewController.getMyReview);

//캠핑장 리뷰조회
reviewrouter.get('/:campId', reviewController.getReview);

//리뷰작성
reviewrouter.post('/:campId', authmiddleware, uploads.array('reviewImg',4),reviewController.createReview);

//리뷰수정
reviewrouter.put('/:reviewId', authmiddleware, uploads.array('reviewImg',4),reviewController.updateReview);

//리뷰삭제
reviewrouter.delete('/:campId/:reviewId', authmiddleware, reviewController.deleteReview);


export default reviewrouter;
