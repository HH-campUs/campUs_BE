import { Router } from 'express';
import Camp from '../camp/campControl';
import authmiddleware from '../../middlewares/authmiddleware';

const router = Router();

// 리뷰, 찜, 조회수 가장 많은 캠핑장들 조회
router.get('/camps/sort', Camp.getMostCamp);
// 주제별 캠핑장 조회
router.get('/camps/:topicId', Camp.getTopicCamp);
// 지역별 캠핑장 조회
router.get('/camps/', Camp.getByRegionCamp);
// 캠핑장 상세 조회
router.get('/camps/detail/:campId', Camp.getDetailCamp);

// 내 여행 일정 등록
router.post('/camps/:campId', authmiddleware, Camp.myTripSave)

// 내 여행 일정 삭제
router.delete('/camps/:tripId', authmiddleware, Camp.myTripRemove)

// 켐핑장 찜하기
router.put('/camps/:campId/pick', authmiddleware, Camp.campPick)

export default router;
