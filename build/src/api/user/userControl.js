"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../utils/exceptions");
const userServ_1 = __importDefault(require("./userServ"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const user_1 = __importDefault(require("../../database/models/user"));
//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함
exports.default = {
    //회원가입
    signup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email && !password)
                throw new exceptions_1.InvalidParamsError("이메일과 패스워드는 필수값입니다.");
            yield userServ_1.default.signup({ email, password });
            res.status(201).send({ message: '회원가입 성공' });
        }
        catch (err) {
            next(err);
        }
    }),
    //로그인 하기
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const Tokens = yield jwt_1.default.createTokens({ email, password });
            res.cookie('accessToken', Tokens.AccessToken); // Access Token을 Cookie에 전달한다.
            res.cookie('refreshToken', Tokens.RefreshToken);
            res.status(200).json({ "message": "로그인을 성공하였습니다!!", Tokens });
        }
        catch (err) {
            next(err);
        }
    }),
    //비밀번호 변경
    changePW: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, changePassword } = req.body;
            if (!email || !changePassword)
                throw new exceptions_1.InvalidParamsError("입력 값이 없습니다.");
            yield userServ_1.default.changePW({ email, changePassword });
            res.status(201).send({ "message": "비밀번호 변경 완료!" });
        }
        catch (err) {
            next(err);
        }
    }),
    //유저정보 수정
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { location } = req.file; //멀터의 타입을 사용함
            const { userId } = res.locals.user;
            const { nickname } = req.body;
            const profileImg = location;
            yield userServ_1.default.updateUser({ nickname, profileImg, userId });
            res.status(201).send({ message: '수정 완료' });
        }
        catch (err) {
            next(err);
        }
    }),
    //마이페이지 조회
    getmyPage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const myPage = yield userServ_1.default.getmyPage({ userId });
            res.status(200).json(...myPage);
        }
        catch (err) {
            next(err);
        }
    }),
    //내가 찜한 목록 조회
    getMyPick: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const myPick = yield userServ_1.default.getMyPick({ userId });
            res.status(200).json(...myPick);
        }
        catch (err) {
            next(err);
        }
    }),
    //이메일 중복 체크
    signupcheck: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const findEmail = yield user_1.default.findOne({ where: { email } });
            if (findEmail)
                return res.status(400).send({ "message": "이미 존재하는 이메일 입니다." });
            res.status(200).send({ "message": "사용가능한 이메일 입니다." });
        }
        catch (err) {
            next(err);
        }
    }),
    //나와 가까운 캠핑장
    nearCamp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { campX, campY } = req.query;
            console.log(campX, campY);
            if (!campX || !campY)
                throw new exceptions_1.InvalidParamsError("좌표가 없습니다.");
            const nearCamp = yield userServ_1.default.nearCamp({ campX, campY });
            res.status(200).json({ nearCamp });
        }
        catch (err) {
            next(err);
        }
    }),
};
