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
const user_1 = require("../../database/models/user");
const review_1 = __importDefault(require("../../database/models/review"));
const pick_1 = __importDefault(require("../../database/models/pick"));
const trip_1 = __importDefault(require("../../database/models/trip"));
const camp_1 = __importDefault(require("../../database/models/camp"));
const sequlize_1 = require("../../database/models/sequlize");
const sequelize_1 = require("sequelize");
exports.default = {
    //회원가입
    signup: ({ email, nickname, password }) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.create({ email, nickname, password });
    }),
    //유저정보 찾기
    findUser: ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.User.findOne({ where: { email } });
    }),
    findByPk: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.User.findByPk(userId);
    }),
    //토큰 업데이트
    updaterefreshToken: ({ email, refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.update({ refreshToken }, { where: { email } });
    }),
    //유저정보 수정
    updateUser: ({ nickname, profileImg, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.update({ nickname, profileImg }, { where: { userId } });
    }),
    //비밀번호 변경
    changePW: ({ email, newPassword }) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.update({ password: newPassword }, { where: { email } });
    }),
    //가까운 캠핑장 찾기
    nearCamp: ({ campX, campY }) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `SELECT camp.*,
    ( 6371 * acos( cos( radians( ${campX} ) ) * cos( radians( camp.X) ) * cos( radians( camp.Y ) - radians(${campY}) ) + sin( radians( ${campX}) ) * sin( radians( camp.X ) ) ) )as distance
    FROM camp HAVING distance < 30 ORDER BY distance LIMIT 0,2`;
        return yield sequlize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
    }),
    //찜 목록 조회 
    getMyPick: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.User.findAll({
            where: { userId },
            attributes: ['nickname', 'profileImg', 'email'],
            include: [
                {
                    model: pick_1.default,
                    as: 'Pick',
                    attributes: ['userId'],
                    include: [
                        {
                            model: camp_1.default,
                            as: 'Camp',
                            attributes: ['campId', 'campName', 'address', 'ImageUrl', 'induty']
                        }
                    ]
                }
            ],
            order: [[pick_1.default, 'createdAt', 'DESC']],
        });
    }),
    //마이 페이지 조회
    getmyPage: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.User.findAll({
            where: { userId },
            attributes: ['nickname', 'profileImg', 'email'],
            include: [
                {
                    model: review_1.default,
                    as: 'Review',
                    attributes: ['reviewImg', 'reviewComment'],
                    include: [{ model: camp_1.default, as: 'Camp', attributes: ['campName'] }]
                },
                {
                    model: pick_1.default,
                    as: 'Pick',
                    attributes: ['userId'],
                    include: [
                        {
                            model: camp_1.default,
                            as: 'Camp',
                            attributes: ['campId', 'campName', 'address', 'ImageUrl', 'induty'],
                        },
                    ],
                },
                {
                    model: trip_1.default,
                    as: 'Trip',
                    attributes: ['date', 'tripId'],
                    include: [
                        {
                            model: camp_1.default,
                            as: 'Camp',
                            attributes: ['campId', 'campName', 'address', 'ImageUrl'],
                        },
                    ],
                },
            ],
            order: [
                [trip_1.default, 'createdAt', 'DESC'],
                [pick_1.default, 'createdAt', 'DESC'],
                [review_1.default, 'createdAt', 'DESC'],
            ],
        });
    }),
};
