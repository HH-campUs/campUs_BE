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
const reviewRepo_1 = __importDefault(require("./reviewRepo"));
const multer_1 = require("../../utils/multer");
exports.default = {
    //캠핑장 리뷰조회
    getReview: ({ campId }) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield reviewRepo_1.default.getReview({ campId });
        if (!campId || !data)
            throw new Error('잘못된요청입니다');
        return data.map((x) => {
            return {
                reviewId: x.reviewId,
                campId: x.campId,
                profileImg: x.User.profileImg,
                nickname: x.User.nickname,
                reviewImg: x.reviewImg,
                reviewComment: x.reviewComment,
                likeStatus: x.likeStatus,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
            };
        });
    }),
    //리뷰작성
    createReview: ({ userId, campId, reviewImg, reviewComment, likeStatus, }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!reviewComment.trim())
            throw new Error('코멘트를 입력해주세요');
        const likestring = String(likeStatus)[0];
        if (likeStatus <= 0 || likeStatus > 3 || Number(likestring) <= 0)
            throw new Error("셋중하나만선택해주세요");
        return yield reviewRepo_1.default.createReview({
            userId,
            campId,
            reviewImg,
            reviewComment,
            likeStatus,
        });
    }),
    // //리뷰작성시 캠핑장 좋아요
    // updateCampLike: async ({ userId, reviewId }: review) => {
    //   const findlike = await reviewRepo.findLike({ userId, reviewId });
    //   if (findlike === 1) {
    //     await reviewRepo.createlike({ userId, reviewId });
    //     await reviewRepo.increment({ userId, reviewId });
    //     return { Message: '최고!추천해요!' };
    //   } else {
    //     await reviewRepo.destroyLike({ userId, reviewId });
    //     await reviewRepo.decrement({ userId, reviewId });
    //     return { Message: '최고!추천해요!취소' };
    //   };
    //   if (findlike === 2) {
    //     await reviewRepo.createlike({ userId, reviewId });
    //     await reviewRepo.increment({ userId, reviewId });
    //     return { Message: '좋았어요!' };
    //   } else {
    //     await reviewRepo.destroyLike({ userId, reviewId });
    //     await reviewRepo.decrement({ userId, reviewId });
    //     return { Message: '좋았어요!취소' };
    //   };
    //   if (findlike === 3) {
    //     await reviewRepo.createlike({ userId, reviewId });
    //     await reviewRepo.increment({ userId, reviewId });
    //     return { Message: '추천하지않아요' };
    //   } else {
    //     await reviewRepo.destroyLike({ userId, reviewId });
    //     await reviewRepo.decrement({ userId, reviewId });
    //     return { Message: '천하지않아요취소' };
    //   }
    // },
    //리뷰작성자찾기
    findReviewAuthor: ({ reviewId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield reviewRepo_1.default.findReviewAuthor({ reviewId });
    }),
    //리뷰수정
    updateReview: ({ reviewId, reviewImg, reviewComment, likeStatus, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const findByauthor = yield reviewRepo_1.default.findReviewAuthor({ reviewId });
        if (!findByauthor)
            throw new Error('잘못된요청입니다');
        if (findByauthor.userId !== userId)
            throw new Error('본인만 수정할 수 있습니다');
        //이미지 삭제 로직
        const findImage = (_a = findByauthor.reviewImg) === null || _a === void 0 ? void 0 : _a.split(",");
        findImage.forEach(ImageUrl => {
            const fileName = ImageUrl.slice(55);
            const fileDir = ImageUrl.slice(48, 54);
            (0, multer_1.deleteFile)(fileDir, fileName);
        });
        //예외처리
        if (!findByauthor)
            throw new Error('잘못된요청입니다');
        if (userId !== (findByauthor === null || findByauthor === void 0 ? void 0 : findByauthor.userId))
            throw new Error("권한이없습니다");
        const likestring = String(likeStatus)[0];
        if (likeStatus <= 0 || likeStatus > 3 || Number(likestring) <= 0)
            throw new Error("셋중하나만선택해주세요");
        const updateReview = yield reviewRepo_1.default.updateReview({
            reviewId,
            userId,
            reviewImg,
            reviewComment,
            likeStatus,
        });
        return {
            updateReview,
        };
    }),
    //리뷰삭제
    deleteReview: ({ campId, reviewId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const findByauthor = yield reviewRepo_1.default.findReviewAuthor({ reviewId });
        if (!findByauthor)
            throw new Error('잘못된요청입니다');
        if (findByauthor.userId !== userId)
            throw new Error('본인만 삭제할 수 있습니다');
        //이미지 삭제 로직
        const findImage = (_b = findByauthor.reviewImg) === null || _b === void 0 ? void 0 : _b.split(",");
        findImage.forEach(ImageUrl => {
            const fileName = ImageUrl.slice(55);
            const fileDir = ImageUrl.slice(48, 54);
            (0, multer_1.deleteFile)(fileDir, fileName);
        });
        const deleteReview = yield reviewRepo_1.default.deleteReview({ campId, reviewId });
        return {
            reviewId: deleteReview,
        };
    }),
    //내가쓴리뷰조회
    getMyReview: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const myreview = yield reviewRepo_1.default.getMyReview({ userId });
        return myreview.map((x) => {
            return {
                reviewId: x.userId,
                userId: x.userId,
                campId: x.campId,
                campName: x.Camp.campName,
                reviewImg: x.reviewImg,
                reviewComment: x.reviewComment,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
            };
        });
    }),
    //새로올라온 리뷰조회
    getNewReview: () => __awaiter(void 0, void 0, void 0, function* () {
        const newReview = yield reviewRepo_1.default.getNewReview();
        if (!newReview)
            throw new Error('잘못된요청입니다');
        return newReview.map((x) => {
            return {
                reviewId: x.reviewId,
                campId: x.campId,
                profileImg: x.User.profileImg,
                nickname: x.User.nickname,
                reviewImg: x.reviewImg,
                reviewComment: x.reviewComment,
                likeStatus: x.likeStatus,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt,
            };
        });
    }),
    // //캠핑장검색
    // search: async ({ keyword }: review) => {
    //   const campName = await reviewRepo.CampSearch({ keyword });
    //   const induty = await reviewRepo.indutySearch({ keyword });
    //   const doNm = await reviewRepo.doNmSearch({ keyword });
    //   const sigunguNm = await reviewRepo.sigunguNmSearch({ keyword });
    //   const address = await reviewRepo.addressSearch({ keyword });
    //   const operPdCl = await reviewRepo.operPdClSearch({ keyword });
    //   const operDeCl = await reviewRepo.operDeClSearch({ keyword });
    //   const animal = await reviewRepo.animalSearch({ keyword });
    //   const sbrsCl = await reviewRepo.sbrsClSearch({ keyword });
    //   const posblFcltyCl = await reviewRepo.posblFcltyClSearch({ keyword });
    //   const manageSttus = await reviewRepo.manageSttusSearch({ keyword });
    //   const themaEnvrnCl = await reviewRepo.themaEnvrnClSearch({ keyword });
    //   const eqpmnLendCl = await reviewRepo.eqpmnLendClSearch({ keyword });
    //   const featureNm = await reviewRepo.featureNmSearch({ keyword });
    //   const clturEvent = await reviewRepo.clturEventSearch({ keyword });
    //   return {
    //     campName,
    //     sigunguNm,
    //     doNm,
    //     sbrsCl,
    //     operPdCl,
    //     operDeCl,
    //     address,
    //     induty,
    //     themaEnvrnCl,
    //     eqpmnLendCl,
    //     manageSttus,
    //     posblFcltyCl,
    //     animal,
    //     featureNm,
    //     clturEvent,
    //   };
    // },
    //캠핑장쿼리검색
    querysearch: ({ keyword, numOfRows, pageNo }) => __awaiter(void 0, void 0, void 0, function* () {
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        pageNo <= 0 ? (pageNo = 1) : (pageNo = (pageNo - 1) * numOfRows);
        const campName = yield reviewRepo_1.default.CampSearch({ keyword, numOfRows, pageNo });
        const induty = yield reviewRepo_1.default.indutySearch({ keyword, numOfRows, pageNo });
        const doNm = yield reviewRepo_1.default.doNmSearch({ keyword, numOfRows, pageNo, });
        const sigunguNm = yield reviewRepo_1.default.sigunguNmSearch({ keyword, numOfRows, pageNo });
        const address = yield reviewRepo_1.default.addressSearch({ keyword, numOfRows, pageNo });
        const operPdCl = yield reviewRepo_1.default.operPdClSearch({ keyword, numOfRows, pageNo });
        const operDeCl = yield reviewRepo_1.default.operDeClSearch({ keyword, numOfRows, pageNo });
        const animal = yield reviewRepo_1.default.animalSearch({ keyword, numOfRows, pageNo });
        const sbrsCl = yield reviewRepo_1.default.sbrsClSearch({ keyword, numOfRows, pageNo });
        const posblFcltyCl = yield reviewRepo_1.default.posblFcltyClSearch({ keyword, numOfRows, pageNo });
        const manageSttus = yield reviewRepo_1.default.manageSttusSearch({ keyword, numOfRows, pageNo });
        const themaEnvrnCl = yield reviewRepo_1.default.themaEnvrnClSearch({ keyword, numOfRows, pageNo });
        const eqpmnLendCl = yield reviewRepo_1.default.eqpmnLendClSearch({ keyword, numOfRows, pageNo });
        const featureNm = yield reviewRepo_1.default.featureNmSearch({ keyword, numOfRows, pageNo });
        const clturEvent = yield reviewRepo_1.default.clturEventSearch({ keyword, numOfRows, pageNo });
        campName.sort((a, b) => {
            return b.lookUp - a.lookUp;
        });
        return {
            campName,
            sigunguNm,
            doNm,
            sbrsCl,
            operPdCl,
            operDeCl,
            address,
            induty,
            themaEnvrnCl,
            eqpmnLendCl,
            manageSttus,
            posblFcltyCl,
            animal,
            featureNm,
            clturEvent,
        };
    }),
    //캠핑장쿼리검색+sort
    searchSort: ({ keyword, numOfRows, pageNo, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        console.log(pageNo, '페이지 넘버입니다 서비스');
        pageNo <= 0 ? pageNo = 1 : pageNo = (pageNo - 1) * numOfRows;
        console.log(pageNo, '페이지 넘버입니다 계산 다음 서비스');
        const searchSort = yield reviewRepo_1.default.searchSort({ keyword, numOfRows, pageNo, sort });
        return searchSort;
    }),
};
// return getCampName
// const getCampName = await reviewRepo.CampSearch({ keyword });
// const campName = getCampName.map((camp) => {
//   return {
//     campId: camp.campId,
//     campName: camp.campName,
//     induty: camp.induty,
//     doNm: camp.doNm,
//     sigunguNm: camp.sigunguNm,
//     address: camp.address,
//     X: camp.X,
//     Y: camp.Y,
//     operPdCl: camp.operPdCl,
//     operDeCl: camp.operDeCl,
//     animal: camp.animal,
//     ImageUrl: camp.ImageUrl,
//     homePage: camp.homePage,
//     sbrsCl: camp.sbrsCl,
//     posblFcltyCl: camp.posblFcltyCl,
//     wtrplCo: camp.wtrplCo,
//     swrmCo: camp.swrmCo,
//     toiletCo: camp.toiletCo,
//     manageSttus: camp.manageSttus,
//     themaEnvrnCl: camp.themaEnvrnCl,
//     lookUp: camp.lookUp,
//     eqpmnLendCl: camp.eqpmnLendCl,
//     createdtime: camp.createdtime,
//   };
// });