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
const campServ_1 = __importDefault(require("./campServ"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
exports.default = {
    // 주제별 캠핑장 조회
    getTopicCamp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { numOfRows, pageNo, sort } = req.query;
            const { topicId } = req.params;
            const { authorization } = req.headers;
            // 조회하는 유저 정보에서 userId 구하기
            const accesstoken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            const decodeAccessToken = yield jwt_1.default.validateAccessToken(accesstoken);
            if (decodeAccessToken == null) {
                console.log("일로지나감");
                res.status(200).json(yield campServ_1.default.nonGetTopicCamp({ topicId, numOfRows, pageNo, sort }));
            }
            else {
                const userId = decodeAccessToken.userId;
                res.status(200).json(yield campServ_1.default.getTopicCamp({ topicId, numOfRows, pageNo, userId, sort }));
            }
        }
        catch (err) {
            next(err);
        }
    }),
    // 지역별 캠핑장 조회
    getByRegionCamp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doNm, numOfRows, pageNo, sort } = req.query;
            const { authorization } = req.headers;
            console.log(typeof doNm, 'doNm다', typeof numOfRows, 'numOfRows다', typeof pageNo, 'pageNo다', '컨트롤러');
            // 조회하는 유저 정보에서 userId 구하기
            const accesstoken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            const decodeAccessToken = yield jwt_1.default.validateAccessToken(accesstoken);
            if (decodeAccessToken == null) {
                res.status(200).json(yield campServ_1.default.nonGetByRegionCamp({ doNm, numOfRows, pageNo, sort }));
            }
            else {
                const userId = decodeAccessToken.userId;
                res.status(200).json(yield campServ_1.default.getByRegionCamp({ doNm, numOfRows, pageNo, sort, userId }));
            }
        }
        catch (err) {
            next(err);
        }
    }),
    // 캠핑장 상세 정보 조회
    getDetailCamp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { campId } = req.params;
            yield campServ_1.default.lookUp(req);
            const { authorization } = req.headers;
            // 조회하는 유저 정보에서 userId 구하기
            const accesstoken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            const decodeAccessToken = yield jwt_1.default.validateAccessToken(accesstoken);
            if (decodeAccessToken == null) {
                res.status(200).json(yield campServ_1.default.nonGetDetailCamp({ campId }));
            }
            else {
                const userId = decodeAccessToken.userId;
                res.status(200).json(yield campServ_1.default.getDetailCamp({ campId, userId }));
            }
        }
        catch (err) {
            next(err);
        }
    }),
    // most 캠핑장 조회
    getMostCamp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { authorization } = req.headers;
            // 조회하는 유저 정보에서 userId 구하기
            const accesstoken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
            const decodeAccessToken = yield jwt_1.default.validateAccessToken(accesstoken);
            if (decodeAccessToken == null) {
                res.status(200).json({ MostList: yield campServ_1.default.nonGetMostCamp() });
            }
            else {
                const userId = decodeAccessToken.userId;
                res.status(200).json({ MostList: yield campServ_1.default.getMostCamp({ userId }) });
            }
        }
        catch (err) {
            next(err);
        }
    }),
    // 내 여행 일정 등록
    myTripSave: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const { campId } = req.params;
            const { memo, date } = req.body;
            yield campServ_1.default.myTripSave({ userId, campId, memo, date });
            res.status(201).json({ message: "여행일정 등록" });
        }
        catch (err) {
            next(err);
        }
    }),
    // 내 여행 일정 조회
    myTripGet: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            res.status(201).json({ trip: yield campServ_1.default.myTripGet({ userId }) });
        }
        catch (err) {
            next(err);
        }
    }),
    // 내 여행 일정 수정
    myTripUpdate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const { tripId } = req.params;
            const { memo, date } = req.body;
            yield campServ_1.default.myTripUpdate({ userId, tripId, memo, date });
            res.status(201).json({ message: "여행일정 수정" });
        }
        catch (err) {
            next(err);
        }
    }),
    // 내 여행 일정 삭제
    myTripRemove: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const { tripId } = req.params;
            const ids = {
                userId,
                tripId: Number(tripId)
            };
            yield campServ_1.default.myTripRemove(ids);
            res.status(200).json({ message: "여행일정 삭제" });
        }
        catch (err) {
            next(err);
        }
    }),
    // 캠핑장 찜하기
    campPick: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const { campId } = req.params;
            res.status(200).json(yield campServ_1.default.campPick({ userId, campId }));
        }
        catch (err) {
            next(err);
        }
    })
};
