import { Router } from 'express';
import reviewController from '../review/reviewControl';
import authmiddleware from '../../middlewares/authmiddleware';
import { upload } from '../../utils/multer';


const reviewrouter = Router();

// //검색하기
// reviewrouter.get('/search', reviewController.search);

//쿼리검색하기
reviewrouter.get('/querysearch', reviewController.querysearch);

//캠핑장쿼리검색+sort
reviewrouter.get('/searchSort', reviewController.searchSort);
//캠핑장쿼리검색+sort+예전거
reviewrouter.get('/searchSortold', reviewController.searchSortold);
//캠핑장쿼리검색+sort+회원
reviewrouter.get('/userSearchSort', authmiddleware, reviewController.userSearchSort);

//새로올라온 리뷰조회
reviewrouter.get('/', reviewController.getNewReview);

//내가쓴리뷰조회
reviewrouter.get('/users', authmiddleware,reviewController.getMyReview);

//캠핑장 리뷰조회
reviewrouter.get('/:campId', reviewController.getReview);

//리뷰작성
reviewrouter.post('/:campId', authmiddleware, upload.array('reviewImg',4),reviewController.createReview);

//리뷰수정
reviewrouter.put('/:reviewId', authmiddleware, upload.array('reviewImg',4),reviewController.updateReview);

//리뷰삭제
reviewrouter.delete('/:campId/:reviewId', authmiddleware, reviewController.deleteReview);


export default reviewrouter;
