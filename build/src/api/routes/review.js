"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewControl_1 = __importDefault(require("../review/reviewControl"));
const authmiddleware_1 = __importDefault(require("../../middlewares/authmiddleware"));
const multer_1 = require("../../utils/multer");
const reviewrouter = (0, express_1.Router)();
// //검색하기
// reviewrouter.get('/search', reviewController.search);
//쿼리검색하기
reviewrouter.get('/querysearch', reviewControl_1.default.querysearch);
//캠핑장쿼리검색+sort
reviewrouter.get('/searchSort', reviewControl_1.default.searchSort);
//새로올라온 리뷰조회
reviewrouter.get('/', reviewControl_1.default.getNewReview);
//내가쓴리뷰조회
reviewrouter.get('/users', authmiddleware_1.default, reviewControl_1.default.getMyReview);
//캠핑장 리뷰조회
reviewrouter.get('/:campId', reviewControl_1.default.getReview);
//리뷰작성
reviewrouter.post('/:campId', authmiddleware_1.default, multer_1.upload.array('reviewImg', 4), reviewControl_1.default.createReview);
//리뷰수정
reviewrouter.put('/:reviewId', authmiddleware_1.default, multer_1.upload.array('reviewImg', 4), reviewControl_1.default.updateReview);
//리뷰삭제
reviewrouter.delete('/:campId/:reviewId', authmiddleware_1.default, reviewControl_1.default.deleteReview);
exports.default = reviewrouter;
