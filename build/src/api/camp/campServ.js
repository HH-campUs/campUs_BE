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
const campRepo_1 = __importDefault(require("./campRepo"));
exports.default = {
    // 회원 주제별 캠핑장 조회
    getTopicCamp: ({ topicId, numOfRows, pageNo, userId, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        console.time("서비스");
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        pageNo <= 0 ? pageNo = 1 : pageNo = (pageNo - 1) * numOfRows;
        const topicCamp = yield campRepo_1.default.getTopicCamp({ topicId, pageNo, numOfRows, sort });
        const TopicCamp = topicCamp.topicCamp;
        const topicid = yield campRepo_1.default.getTopic({ topicId });
        if (!topicid)
            throw new Error("존재하지 않는 주제입니다");
        // 해당 유저가 찜한 캠프 정보 불러오기
        const campPickFind = yield campRepo_1.default.myPickAllFind({ userId });
        // 해당 유저가 찜한 campId 구하기
        const myPick = campPickFind.map((e) => {
            return e.dataValues.campId;
        });
        console.log(myPick, '내가 찜한 campId');
        // 조회되는 campId 구하기
        const getCamps = TopicCamp.map((a) => {
            return a.campId;
        });
        console.log(getCamps, '조회되는 campId');
        // 조회되는 campId와 유저가 찜한 campId 중 일치하는 값 구하기
        const sameId = getCamps.filter(x => myPick.includes(x));
        console.log(sameId, '조회되는 campId와 내가 찜한 campId 중 일치하는 값');
        // 일치하는 campId의 캠프 정보 구하기
        const sameCamp = TopicCamp.filter((x) => sameId.includes(x.campId));
        console.log('TopicCamp입니다', TopicCamp);
        console.log('일치하는 값의 캠프 정보', sameCamp);
        const pickCampidSet = new Set(campPickFind.map(x => x.campId));
        const res1 = TopicCamp.map(o => (Object.assign(Object.assign({}, o), { PickCamp: pickCampidSet.has(o.campId) ? Object.assign(Object.assign({}, o), { status: true }) : Object.assign(Object.assign({}, o), { status: false }) })));
        const camp = res1.map((x) => {
            return x.PickCamp;
        });
        console.timeEnd("서비스");
        return { topicCamp: camp, total: topicCamp.total };
    }),
    // 비회원 주제별 캠핑장 조회
    nonGetTopicCamp: ({ topicId, numOfRows, pageNo, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        console.time("서비스");
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        pageNo <= 0 ? pageNo = 1 : pageNo = (pageNo - 1) * numOfRows;
        const topicCamp = yield campRepo_1.default.getTopicCamp({ topicId, pageNo, numOfRows, sort });
        const topicid = yield campRepo_1.default.getTopic({ topicId });
        if (!topicid)
            throw new Error("존재하지 않는 주제입니다");
        console.timeEnd("서비스");
        return topicCamp;
    }),
    // 지역별 캠핑장 조회
    getByRegionCamp: ({ doNm, numOfRows, pageNo, sort, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        pageNo <= 0 ? pageNo = 1 : pageNo = (pageNo - 1) * numOfRows;
        console.log(typeof doNm, 'doNm다', typeof numOfRows, 'numOfRows다', typeof pageNo, 'pageNo다', '서비스');
        const regionCamp = yield campRepo_1.default.getByRegionCamp({ doNm, numOfRows, pageNo, sort });
        const RegionCamp = regionCamp.regionCamp;
        if (!RegionCamp)
            throw new Error("지역에 맞는 캠핑장이 존재하지 않음");
        // 해당 유저가 찜한 캠프 정보 불러오기
        const campPickFind = yield campRepo_1.default.myPickAllFind({ userId });
        // 해당 유저가 찜한 campId 구하기
        const myPick = campPickFind.map((e) => {
            return e.dataValues.campId;
        });
        console.log(myPick, '내가 찜한 campId');
        // 조회되는 campId 구하기
        const getCamps = RegionCamp.map((a) => {
            return a.campId;
        });
        console.log(getCamps, '조회되는 campId');
        // 조회되는 campId와 유저가 찜한 campId 중 일치하는 값 구하기
        const sameId = getCamps.filter(x => myPick.includes(x));
        console.log(sameId, '조회되는 campId와 내가 찜한 campId 중 일치하는 값');
        // 일치하는 campId의 캠프 정보 구하기
        const sameCamp = RegionCamp.filter((x) => sameId.includes(x.campId));
        console.log('일치하는 값의 캠프 정보', sameCamp);
        const pickCampidSet = new Set(campPickFind.map(x => x.campId));
        const res1 = RegionCamp.map(o => (Object.assign(Object.assign({}, o), { PickCamp: pickCampidSet.has(o.campId) ? Object.assign(Object.assign({}, o), { status: true }) : Object.assign(Object.assign({}, o), { status: false }) })));
        const camp = res1.map((x) => {
            return x.PickCamp;
        });
        console.timeEnd("서비스");
        return { regionCamp: camp, total: regionCamp.total };
    }),
    // 비회원 지역별 캠핑장 조회
    nonGetByRegionCamp: ({ doNm, numOfRows, pageNo, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        // 0 이하의 페이지를 요청하면 pageNo 를 1로
        pageNo <= 0 ? pageNo = 1 : pageNo = (pageNo - 1) * numOfRows;
        console.log(typeof doNm, 'doNm다', typeof numOfRows, 'numOfRows다', typeof pageNo, 'pageNo다', '서비스');
        const regionCamp = yield campRepo_1.default.getByRegionCamp({ doNm, numOfRows, pageNo, sort });
        if (!regionCamp.regionCamp)
            throw new Error("지역에 맞는 캠핑장이 존재하지 않음");
        return regionCamp;
    }),
    // 캠핑장 상세 조회
    getDetailCamp: ({ campId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const detailCamp = yield campRepo_1.default.getDetailCamp({ campId });
        if (!detailCamp) {
            throw new Error("캠핑장이 존재하지 않음");
        }
        const detailPick = yield campRepo_1.default.getDetailPick({ userId, campId });
        const status = detailPick.length ? true : false;
        const result = detailCamp.map((x) => {
            return Object.assign(Object.assign({}, x.dataValues), { status });
        });
        return result;
    }),
    // 비회원 캠핑장 상세 조회
    nonGetDetailCamp: ({ campId }) => __awaiter(void 0, void 0, void 0, function* () {
        const detailCamp = yield campRepo_1.default.getDetailCamp({ campId });
        if (!detailCamp) {
            throw new Error("캠핑장이 존재하지 않음");
        }
        return detailCamp;
    }),
    // 조회수
    lookUp: (req) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { campId } = req.params;
        let ip = (_a = req.connection.remoteAddress) === null || _a === void 0 ? void 0 : _a.split(':').pop();
        const time = Date.now();
        // ip 유효성 검사 정규식
        const ipValidator = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        console.log(`${typeof ip}${ip}는 ip다 ${typeof campId}${campId}는 campId다 ${typeof time}${time}은 지금 이순간 마법처럼`);
        // 유효한 ip인지
        if (!ipValidator.test(ip))
            throw new Error("유효한 ip 주소가 아닙니다");
        // 조회수를 올린 ip가 있는지
        const existIp = yield campRepo_1.default.getIpCamp({ ip, campId });
        // 조회수를 올린 ip가 없다면 lookUp에 저장
        if (!existIp)
            return yield campRepo_1.default.createLookUp({ ip, campId, time });
        // 조회수를 올린지 1시간이 지났는지
        const dayInterval = time - existIp.time > 3600000;
        // 지났으면 조회수 요청 및 시간 업데이트 요청
        if (dayInterval)
            return yield campRepo_1.default.updateLookUp({ ip, campId, time });
    }),
    // most 캠핑장 조회
    getMostCamp: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const mostLook = { look: yield campRepo_1.default.getMostLook() };
        const mostReview = { review: yield campRepo_1.default.getMostReview() };
        const mostPick = { pick: yield campRepo_1.default.getMostPick() };
        return [mostLook, mostReview, mostPick];
    }),
    // 비회원 most 캠핑장 조회
    nonGetMostCamp: () => __awaiter(void 0, void 0, void 0, function* () {
        const mostLook = { look: yield campRepo_1.default.getMostLook() };
        const mostReview = { review: yield campRepo_1.default.getMostReview() };
        const mostPick = { pick: yield campRepo_1.default.getMostPick() };
        return [mostLook, mostReview, mostPick];
    }),
    // 내 여행 일정 등록
    myTripSave: ({ userId, campId, memo, date }) => __awaiter(void 0, void 0, void 0, function* () {
        const tripSave = yield campRepo_1.default.myTripSave({ userId, campId, memo, date });
        if (!tripSave.campId)
            throw new Error("존재하지 않는 캠핑장");
        return tripSave;
    }),
    // 내 여행 일정 조회
    myTripGet: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const tripGet = yield campRepo_1.default.myTripGet({ userId });
        console.log(tripGet, 'getttt');
        // 현재 날짜
        const NOW = new Date().toLocaleDateString("kr");
        console.log(NOW, '너어떻게나오니');
        // 일정에 저장된 날짜
        const date = yield campRepo_1.default.myTripDate({ userId });
        const dt = date === null || date === void 0 ? void 0 : date.dataValues.date;
        const DATE = new Date(dt);
        console.log(DATE, 'dfsdfdfsdfdf');
        // 저장된 날짜에서 현재 날짜 빼주기
        var dDay = +DATE - +new Date(NOW);
        // 밀리초로 나오는 값 정수 반환
        const difDay = Math.floor(dDay / (1000 * 60 * 60 * 24));
        // if(+new Date(NOW) == +DATE){
        //   return
        // }else{
        const result = tripGet.map((d) => {
            return Object.assign(Object.assign({}, d), { dDay: difDay });
        });
        return result;
        // }
    }),
    // 내 여행 일정 수정
    myTripUpdate: ({ userId, tripId, memo, date }) => __awaiter(void 0, void 0, void 0, function* () {
        const tripUpdate = yield campRepo_1.default.myTripUpdate({ userId, tripId, memo, date });
        const trip = yield campRepo_1.default.findByTripId({ tripId });
        if (!trip)
            throw new Error("존재하지 않는 여행 일정");
        return tripUpdate;
    }),
    // 내 여행 일정 삭제
    myTripRemove: ({ userId, tripId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield campRepo_1.default.myTripRemove({ userId, tripId });
    }),
    // 캠핑장 찜하기
    campPick: ({ userId, campId }) => __awaiter(void 0, void 0, void 0, function* () {
        const campPickFind = yield campRepo_1.default.myPickFind({ userId, campId });
        const getPickCamp = yield campRepo_1.default.pickCamp({ campId });
        if (!campPickFind) {
            yield campRepo_1.default.campPick({ userId, campId });
            const data = getPickCamp.map((element) => {
                return Object.assign(Object.assign({}, element.dataValues), { status: true });
            });
            return { camp: data, message: '찜 목록에 캠핑장을 추가하였습니다' };
        }
        else {
            yield campRepo_1.default.campUnPick({ userId, campId });
            const data = getPickCamp.map((element) => {
                return Object.assign(Object.assign({}, element.dataValues), { status: false });
            });
            return { camp: data, message: "찜 목록에서 캠핑장을 삭제하였습니다" };
        }
        ;
    })
};
