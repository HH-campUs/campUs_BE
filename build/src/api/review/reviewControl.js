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
const reviewServ_1 = __importDefault(require("./reviewServ")); //받아온다
exports.default = {
    //캠핑장 리뷰조회
    getReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { campId } = req.params;
            const data = yield reviewServ_1.default.getReview({ campId });
            res.status(200).json({ data });
        }
        catch (error) {
            next(error);
        }
    }),
    //리뷰작성
    createReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = res.locals.user;
            const { campId } = req.params;
            const { reviewComment, likeStatus } = req.body;
            const files = req.files; //파일을 배열로 받음
            const reviewImgs = files.map((x) => {
                //   if(x.size >= 1000000){
                //     resizing(x.location)
                //  }
                return x.location;
            });
            const reviewImg = reviewImgs.join(',');
            yield reviewServ_1.default.createReview({
                userId,
                campId,
                reviewImg,
                reviewComment,
                likeStatus,
            });
            res.status(201).json({ ok: true, massage: '리뷰작성완료' });
        }
        catch (error) {
            next(error);
        }
    }),
    // //리뷰작성시 캠핑장 좋아요
    // updateCampLike: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const { userId }: review = res.locals.user;
    //     const { reviewId }: review = req.params;
    //     const camplike = await reviewService.updateCampLike({
    //       userId,
    //       reviewId,
    //     });
    //     res.status(201).json(camplike);
    //   } catch (error) {
    //     next(error);
    //   }
    // },
    //리뷰수정
    updateReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { reviewId } = req.params;
            const { reviewComment, likeStatus } = req.body;
            const { userId } = res.locals.user;
            const files = req.files; //파일을 배열로 받음
            const reviewImgs = files.map((x) => {
                //   if(x.size >= 1000000){
                //     resizing(x.location)
                //  }
                return x.location;
            });
            const reviewImg = reviewImgs.join(',');
            yield reviewServ_1.default.findReviewAuthor({ reviewId });
            yield reviewServ_1.default.updateReview({
                reviewId,
                reviewImg,
                reviewComment,
                likeStatus,
                userId,
            });
            res.status(200).json({ massage: '리뷰수정완료' });
        }
        catch (error) {
            next(error);
        }
    }),
    //리뷰삭제
    deleteReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { campId, reviewId } = req.params;
            const { userId } = res.locals.user;
            const findreview = yield reviewServ_1.default.findReviewAuthor({ reviewId });
            yield reviewServ_1.default.deleteReview({ campId, reviewId, userId });
            res.status(200).json({ massage: '리뷰삭제완료' });
        }
        catch (error) {
            next(error);
        }
    }),
    //내가쓴리뷰조회
    getMyReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // 만약에 다른사람 리뷰 볼수 있을 때
            // const { userId }: review = req.params;
            const { userId } = res.locals.user;
            const myreview = yield reviewServ_1.default.getMyReview({ userId });
            res.status(200).json({ data: myreview });
        }
        catch (error) {
            next(error);
        }
    }),
    //새로올라온 리뷰조회
    getNewReview: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allreview = yield reviewServ_1.default.getNewReview();
            res.status(200).json({ data: allreview });
        }
        catch (error) {
            next(error);
        }
    }),
    // //캠핑장검색
    // search: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const { keyword }: review = req.body;
    //     const result = await reviewService.search({ keyword });
    //     if (!keyword) throw new Error('키워드를 입력해주세요');
    //     return res.status(200).json({ data: result });
    //   } catch (error) {
    //     next(error);
    //   }
    // },
    //캠핑장쿼리검색
    querysearch: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { keyword, numOfRows, pageNo } = req.query;
            res
                .status(200)
                .json(yield reviewServ_1.default.querysearch({ keyword, numOfRows, pageNo }));
        }
        catch (error) {
            next(error);
        }
    }),
    //캠핑장쿼리검색+sort
    searchSort: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { keyword, numOfRows, pageNo, sort } = req.query;
            if (!keyword)
                throw new Error('키워드를 입력해주세요');
            res
                .status(200)
                .json(yield reviewServ_1.default.searchSort({ keyword, numOfRows, pageNo, sort }));
        }
        catch (error) {
            next(error);
        }
    }),
    //캠핑장쿼리검색+sort+user
    userSearchSort: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { keyword, numOfRows, pageNo, sort } = req.query;
            const { userId } = res.locals.user;
            if (!keyword)
                throw new Error('키워드를 입력해주세요');
            res
                .status(200)
                .json(yield reviewServ_1.default.userSearchSort({ keyword, numOfRows, pageNo, sort, userId }));
        }
        catch (error) {
            next(error);
        }
    }),
};
