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
const pick_1 = __importDefault(require("../../database/models/pick"));
const sequelize_1 = require("sequelize");
const sequlize_1 = require("../../database/models/sequlize");
const sequelize_2 = require("sequelize");
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
                {
                    model: camp_1.default,
                    as: 'Camp',
                    attributes: ['campName'],
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
                {
                    model: camp_1.default,
                    as: 'Camp',
                    attributes: ['campName'],
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
        const query = `
    SELECT *
    FROM camp AS Camp
    WHERE (Camp.campName LIKE CONCAT('%',$keyword,'%') OR Camp.induty LIKE CONCAT('%',$keyword,'%') OR Camp.doNm LIKE CONCAT('%',$keyword,'%') OR Camp.sigunguNm LIKE CONCAT('%',$keyword,'%') OR Camp.address LIKE CONCAT('%',$keyword,'%') OR Camp.operPdCl LIKE CONCAT('%',$keyword,'%') OR Camp.operDeCl LIKE CONCAT('%',$keyword,'%') OR Camp.animal LIKE CONCAT('%',$keyword,'%') OR Camp.sbrsCl LIKE CONCAT('%',$keyword,'%') OR Camp.posblFcltyCl LIKE CONCAT('%',$keyword,'%') OR Camp.manageSttus LIKE CONCAT('%',$keyword,'%') OR Camp.themaEnvrnCl LIKE CONCAT('%',$keyword,'%') OR Camp.eqpmnLendCl LIKE CONCAT('%',$keyword,'%') OR Camp.featureNm LIKE CONCAT('%',$keyword,'%') OR Camp.clturEvent LIKE CONCAT('%',$keyword,'%'))
    `;
        const orderNlimit = `
      ORDER BY ${sort} DESC
      LIMIT $numOfRows OFFSET $pageNo;
    `;
        const searchCamp = yield sequlize_1.sequelize.query(query + orderNlimit, {
            bind: { keyword, numOfRows, pageNo: String(pageNo) },
            type: sequelize_2.QueryTypes.SELECT,
        });
        const total = yield sequlize_1.sequelize.query(query, {
            bind: { keyword },
            type: sequelize_2.QueryTypes.SELECT,
        });
        return { searchCamp, total: total.length };
    }),
    //검색결과 북마크
    getsearchPick: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findAll({
            where: { userId },
            include: [
                {
                    model: pick_1.default,
                    as: 'Pick',
                    where: { userId },
                    // include:[
                    //   {
                    //     model:Camp,
                    //     as:'Camp',
                    //   }
                    // ]
                },
                // {
                //   model: Camp,
                //   as: 'Camp',
                //   where: { userId },
                // },
            ],
        });
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
