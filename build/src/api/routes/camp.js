"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campControl_1 = __importDefault(require("../camp/campControl"));
const authmiddleware_1 = __importDefault(require("../../middlewares/authmiddleware"));
const router = (0, express_1.Router)();
// 리뷰, 찜, 조회수 가장 많은 캠핑장들 조회
router.get('/camps/sort', campControl_1.default.getMostCamp);
// 주제별 캠핑장 조회
router.get('/camps/:topicId', campControl_1.default.getTopicCamp);
// 지역별 캠핑장 조회
router.get('/camps/', campControl_1.default.getByRegionCamp);
// 캠핑장 상세 조회
router.get('/camps/detail/:campId', campControl_1.default.getDetailCamp);
// 내 여행 일정 조회
router.get('/trip', authmiddleware_1.default, campControl_1.default.myTripGet);
// 내 여행 일정 등록
router.post('/camps/:campId', authmiddleware_1.default, campControl_1.default.myTripSave);
// 내 여행 일정 수정
router.put('/camps/:tripId', authmiddleware_1.default, campControl_1.default.myTripUpdate);
// 내 여행 일정 삭제
router.delete('/camps/:tripId', authmiddleware_1.default, campControl_1.default.myTripRemove);
// 켐핑장 찜하기
router.put('/camps/:campId/pick', authmiddleware_1.default, campControl_1.default.campPick);
exports.default = router;
