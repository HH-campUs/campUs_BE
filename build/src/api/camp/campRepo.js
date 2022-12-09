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
const camp_1 = require("../../database/models/camp");
const trip_1 = require("../../database/models/trip");
const pick_1 = require("../../database/models/pick");
const lookUp_1 = require("../../database/models/lookUp");
const sequlize_1 = require("../../database/models/sequlize");
const sequelize_1 = require("sequelize");
const topic_1 = __importDefault(require("../../database/models/topic"));
exports.default = {
    // 주제별 캠핑장 조회
    getTopicCamp: ({ topicId, pageNo, numOfRows, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        const topicCamp = `
     SELECT Camp.*
     FROM topicMapping AS topicMapping INNER JOIN camp AS Camp
     ON topicMapping.campId = Camp.campId
     WHERE topicMapping.topicId =$topicId
    `;
        // console.log(topicId,'topicId다', numOfRows,'numOfRows다', pageNo,'pageNo다')
        console.log(typeof sort, sort, 'sort다');
        const limitNorder = `ORDER BY ${sort} DESC
      LIMIT $numOfRows OFFSET $pageNo;`;
        const camp = yield sequlize_1.sequelize.query(topicCamp + limitNorder, {
            bind: { topicId, numOfRows, pageNo: String(pageNo) },
            type: sequelize_1.QueryTypes.SELECT
        });
        const total = yield sequlize_1.sequelize.query(topicCamp, {
            bind: { topicId },
            type: sequelize_1.QueryTypes.SELECT
        });
        return { topicCamp: camp, total: total.length };
    }),
    // topicId
    getTopic: ({ topicId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield topic_1.default.findOne({ where: { topicId } });
    }),
    // camp
    // getCamp: async({topicId}:getCamp)=>{
    //   return await Camp.findAll({
    //     include: [{
    //       model: Topic,
    //       through: {
    //         attributes: ['campId'],
    //         where: {topicId}
    //       }
    //     }]
    //   })
    // },
    // 지역별 캠핑장 조회
    getByRegionCamp: ({ doNm, numOfRows, pageNo, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        console.time("regionTime");
        const regionCamp = `SELECT * FROM camp AS Camp WHERE doNm LIKE CONCAT('%',$doNm,'%') `;
        const limit = `ORDER BY ${sort} DESC LIMIT $numOfRows OFFSET $pageNo;`;
        console.log(typeof doNm, 'doNm다', typeof numOfRows, 'numOfRows다', typeof pageNo, 'pageNo다');
        const camp = yield sequlize_1.sequelize.query(regionCamp + limit, {
            bind: { doNm, numOfRows, pageNo: String(pageNo) },
            type: sequelize_1.QueryTypes.SELECT
        });
        const total = yield sequlize_1.sequelize.query(regionCamp, {
            bind: { doNm },
            type: sequelize_1.QueryTypes.SELECT
        });
        console.timeEnd("regionTime");
        return { regionCamp: camp, total: total.length };
    }),
    // 캠핑장 상세 조회
    getDetailCamp: ({ campId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield camp_1.Camp.findAll({ where: { campId } });
    }),
    // 조회수를 올린 IP 존재 여부
    getIpCamp: ({ ip, campId }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ip GET입니다");
        return yield lookUp_1.LookUp.findOne({ where: { ip, campId } });
        // `SELECT * FROM lookup WHERE ${ip}' AND ${campId}`
    }),
    // 조회수 올리고 ip, campId, time 저장
    createLookUp: ({ ip, campId, time }) => __awaiter(void 0, void 0, void 0, function* () {
        yield lookUp_1.LookUp.create({ ip, campId, time });
        yield camp_1.Camp.increment({ lookUp: 1 }, { where: { campId } });
        // `INSERT INTO lookUp ( campId, ip, time ) VALUES ( ${campId}, '${ip}', ${time} )`
        // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
    }),
    // 조회수 올리고 time 업데이트
    updateLookUp: ({ ip, campId, time }) => __awaiter(void 0, void 0, void 0, function* () {
        yield lookUp_1.LookUp.update({ time }, { where: { ip, campId } });
        yield camp_1.Camp.increment({ lookUp: 1 }, { where: { campId } });
        // `UPDATE lookUp SET ${time} WHERE ${ip}, ${campId}`
        // `UPDATE camp SET lookUp = lookUp + 1 WHERE ${campId}`
    }),
    // most 조회수
    getMostLook: () => __awaiter(void 0, void 0, void 0, function* () {
        // async function as(mostLook:number[]) {
        //   Math.max.apply(null,mostLook)
        // } 
        const mostLook = yield camp_1.Camp.max('lookUp');
        return yield camp_1.Camp.findOne({
            where: { lookUp: mostLook }
        });
    }),
    // most 리뷰
    getMostReview: () => __awaiter(void 0, void 0, void 0, function* () {
        const mostReview = yield camp_1.Camp.max('reviewCount');
        if (mostReview == 0) {
            return false; // undefined null
        }
        else {
            return yield camp_1.Camp.findOne({
                where: { reviewCount: mostReview }
            });
        }
    }),
    // most 찜
    getMostPick: () => __awaiter(void 0, void 0, void 0, function* () {
        const mostPick = yield camp_1.Camp.max('pickCount');
        return yield camp_1.Camp.findOne({
            where: { pickCount: mostPick }
        });
    }),
    // 내 여행 일정 등록
    myTripSave: ({ userId, campId, memo, date }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(typeof campId);
        const Address = yield camp_1.Camp.findOne({ where: { campId } });
        return yield trip_1.Trip.create({
            userId, campId, memo, address: Address === null || Address === void 0 ? void 0 : Address.address, date
        });
    }),
    // 내 여행 일정 삭제
    myTripRemove: ({ userId, tripId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield trip_1.Trip.destroy({
            where: { userId, tripId }
        });
    }),
    // 해당 유저가 찜한 캠핑장 조회
    myPickFind: ({ userId, campId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield pick_1.Pick.findOne({
            where: { userId, campId }
        });
    }),
    // 해당 유저가 찜한 모든 캠핑장 조회
    myPickAllFind: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield pick_1.Pick.findAll({
            where: { userId }
        });
    }),
    // 해당 캠핑장 정보
    pickCamp: ({ campId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield camp_1.Camp.findAll({ where: { campId } });
    }),
    // 캠핑장 찜하기
    campPick: ({ userId, campId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield pick_1.Pick.create({ userId, campId });
        yield camp_1.Camp.increment({ pickCount: 1 }, { where: { campId } });
    }),
    // 캠핑장 찜 취소
    campUnPick: ({ userId, campId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield pick_1.Pick.destroy({ where: { userId, campId } });
        yield camp_1.Camp.decrement({ pickCount: 1 }, { where: { campId } });
    })
};
