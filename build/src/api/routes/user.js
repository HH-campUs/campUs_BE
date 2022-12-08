"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authmiddleware_1 = __importDefault(require("../../middlewares/authmiddleware"));
const multer_1 = require("../../utils/multer");
const userControl_1 = __importDefault(require("../user/userControl"));
const validation_1 = __importDefault(require("../../utils/validation"));
const router = (0, express_1.Router)();
//회원가입 중복체크
router.post('/signup/check', validation_1.default, userControl_1.default.signupcheck);
//회원가입
router.post('/signup', validation_1.default, userControl_1.default.signup);
//로그인
router.post('/login', validation_1.default, userControl_1.default.login);
//비밀번호 재설정
router.put('/changePW', validation_1.default, userControl_1.default.changePW);
//유저정보 수정
router.put('/myPage', authmiddleware_1.default, multer_1.upload.single('profileImg'), userControl_1.default.updateUser);
//마이페이지 조회
router.get('/myPage', authmiddleware_1.default, userControl_1.default.getmyPage);
//내가 찜한 캠핑장 조회
router.get('/myPage/myPick', authmiddleware_1.default, userControl_1.default.getMyPick);
//나와 가까운 캠핑장 조회
router.get('/nearCamp', userControl_1.default.nearCamp);
exports.default = router;
