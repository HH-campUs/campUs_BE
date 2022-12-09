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
const camp_1 = __importDefault(require("../../database/models/camp"));
const review_1 = __importDefault(require("../../database/models/review"));
const user_1 = __importDefault(require("../../database/models/user"));
const sequelize_1 = require("sequelize");
exports.default = {
    //캠핑장 리뷰조회
    getReview: ({ campId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_1.default.findAll({
            where: { campId },
            attributes: { exclude: ['userId'] },
            include: [
                {
                    model: user_1.default,
                    as: 'User',
                    attributes: ['profileImg', 'nickname'],
                },
            ],
        });
    }),
    //리뷰작성
    createReview: ({ userId, campId, reviewImg, reviewComment, likeStatus, }) => __awaiter(void 0, void 0, void 0, function* () {
        console.time('리뷰 레포입니다');
        yield review_1.default.create({
            userId,
            campId,
            reviewImg,
            reviewComment,
            likeStatus,
        });
        yield camp_1.default.increment({ reviewCount: 1 }, { where: { campId } });
        console.timeEnd('리뷰 레포입니다');
        return;
    }),
    // //리뷰작성시 캠핑장 좋아요
    // findLike: async ({ userId, reviewId }: review) => {
    //   const likefind = await Like.findOne({ where: { userId, reviewId } });
    //   return likefind;
    // },
    // createlike: async ({ userId, reviewId }: review) => {
    //   await Like.create({ userId, reviewId });
    // },
    // destroyLike: async ({ userId, reviewId }: review) => {
    //   await Like.destroy({ where: { userId, reviewId } });
    // },
    // increment: async ({ reviewId }: review) => {
    //   await Review.increment({ likeCount: 1 }, { where: { reviewId } });
    // },
    // decrement: async ({ reviewId }: review) => {
    //   await Review.increment({ likeCount: 1 }, { where: { reviewId } });
    // },
    //리뷰작성자찾기
    findReviewAuthor: ({ reviewId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_1.default.findByPk(reviewId);
    }),
    //리뷰수정
    updateReview: ({ reviewId, reviewImg, reviewComment, likeStatus, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
        const updateReview = yield review_1.default.update({
            reviewComment: reviewComment,
            reviewImg: reviewImg,
            likeStatus: likeStatus,
        }, { where: { reviewId: reviewId, userId: userId } });
        return updateReview;
    }),
    //리뷰찾기
    findOneReview: ({ reviewId }) => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield review_1.default.findOne({ where: { reviewId } });
        return reviews;
    }),
    //리뷰삭제
    deleteReview: ({ campId, reviewId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield review_1.default.destroy({
            where: { reviewId },
        });
        yield camp_1.default.decrement({ reviewCount: 1 }, { where: { campId } });
        return;
    }),
    //내가쓴리뷰조회
    getMyReview: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_1.default.findAll({
            where: { userId },
            include: [
                {
                    model: camp_1.default,
                    as: 'Camp',
                    attributes: ['campName'],
                },
            ],
        });
    }),
    //새로올라온 리뷰조회
    getNewReview: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_1.default.findAll({
            where: {},
            attributes: { exclude: ['userId'] },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: user_1.default,
                    as: 'User',
                    attributes: ['profileImg', 'nickname'],
                },
            ],
        });
    }),
    // //유저찾기
    // findUser: async (userId:number, reviewId:number) => {
    //   return await User.findOne({
    //      where: { reviewId: reviewId, userId:userId },
    //     include:[{model:User}] });
    // },
    //캠핑장쿼리검색+sort
    searchSort: ({ keyword, numOfRows, pageNo, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        campName: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        induty: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        doNm: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        sigunguNm: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        address: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        operPdCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        operDeCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        animal: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        sbrsCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        posblFcltyCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        manageSttus: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        themaEnvrnCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        eqpmnLendCl: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        featureNm: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                    {
                        clturEvent: {
                            [sequelize_1.Op.like]: '%' + keyword + '%',
                        },
                    },
                ],
            },
            order: [[`${sort}`, 'DESC']],
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //캠핑장이름검색
    CampSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                campName: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //야영장종류검색
    indutySearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                induty: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    // //도이름검색
    // doNmSearch: async ({ keyword }: review) => {
    //   const searchResult = await Camp.findAll({
    //     where: {
    //       doNm: {
    //         [Op.like]: '%' + keyword + '%',
    //       },
    //     },
    //   });
    //   return searchResult;
    // },
    //도이름검색페이지
    doNmSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                doNm: {
                    [sequelize_1.Op.like]: `${'%' + keyword + '%'}`,
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //시군구이름검색
    sigunguNmSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                sigunguNm: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //캠핑장주소검색
    addressSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                address: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //운영계절검색
    operPdClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                operPdCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //운영요일검색
    operDeClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                operDeCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //반려동물 동반가능여부
    animalSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                animal: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //편의시설이름검색
    sbrsClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                sbrsCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //주변이용가능시설검색
    posblFcltyClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                posblFcltyCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //운영상태검색
    manageSttusSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                manageSttus: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //테마검색
    themaEnvrnClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                themaEnvrnCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //캠핑장비 대여검색
    eqpmnLendClSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                eqpmnLendCl: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //간단소개글검색
    featureNmSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                featureNm: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
    //자체문화행사검색
    clturEventSearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        const numofrows = Number(numOfRows);
        const pageno = Number(pageNo);
        const searchResult = yield camp_1.default.findAll({
            where: {
                clturEvent: {
                    [sequelize_1.Op.like]: '%' + keyword + '%',
                },
            },
            limit: numofrows,
            offset: pageno,
        });
        return searchResult;
    }),
};
