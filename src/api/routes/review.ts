import { Router } from 'express';
import reviewController from '../review/reviewControl';
import authmiddleware from '../../middlewares/authmiddleware';
import { upload } from '../../utils/multer';


const reviewrouter = Router();

reviewrouter.route('/');

//검색하기
reviewrouter.get('/', reviewController.search);

//내가쓴리뷰조회
reviewrouter.get('/users', authmiddleware,reviewController.getMyReview);

//캠핑장 리뷰조회
reviewrouter.get('/:campId', reviewController.getReview);

//리뷰작성
reviewrouter.post('/:campId/review', authmiddleware, upload.array('reviewImg',4),reviewController.createReview);

//리뷰수정
reviewrouter.put('/:campId/:reviewId', authmiddleware, upload.array('reviewImg',4),reviewController.updateReview);

//리뷰삭제
reviewrouter.delete('/:reviewId', authmiddleware, reviewController.deleteReview);


export default reviewrouter;
