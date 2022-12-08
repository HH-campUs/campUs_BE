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
const userRepo_1 = __importDefault(require("./userRepo"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const exceptions_1 = require("../../utils/exceptions");
const multer_1 = require("../../utils/multer");
dotenv_1.default.config();
//바로 사용가능 하다 인스턴스 시킬수 없음
//모듈 이름 옆에 async 사용해야함
exports.default = {
    //회원가입
    signup: ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield userRepo_1.default.findUser({ email });
        if (email === (findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
            throw new exceptions_1.ValidationErrors('중복된 이메일 입니다.');
        }
        const signUser = {
            email: email,
            nickname: email.split('@')[0],
            password: yield bcrypt_1.default.hash(password, parseInt(process.env.SALT_ROUND)),
        };
        yield userRepo_1.default.signup(signUser);
    }),
    //비밀번호 변경
    changePW: ({ email, changePassword }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(email, changePassword);
        const findUser = yield userRepo_1.default.findUser({ email });
        if (email !== (findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
            throw new exceptions_1.ValidationErrors('존재하지 않는 이메일 입니다.');
        }
        const newPassword = yield bcrypt_1.default.hash(changePassword, parseInt(process.env.SALT_ROUND));
        console.log(newPassword);
        yield userRepo_1.default.changePW({ email, newPassword });
    }),
    //유저 정보 수정
    updateUser: ({ nickname, profileImg, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield userRepo_1.default.findByPk({ userId });
            if ((findUser === null || findUser === void 0 ? void 0 : findUser.userId) !== userId) {
                throw new exceptions_1.ValidationErrors('유저가 일치 하지 않습니다');
            }
            const fileName = findUser === null || findUser === void 0 ? void 0 : findUser.profileImg.slice(53);
            const fileDir = findUser === null || findUser === void 0 ? void 0 : findUser.profileImg.slice(48, 52);
            const url = findUser === null || findUser === void 0 ? void 0 : findUser.profileImg.slice(0, 47);
            if (process.env.S3_URL === url) {
                //S3사진 삭제 로직 
                (0, multer_1.deleteFile)(fileDir, fileName);
            }
            yield userRepo_1.default.updateUser({ nickname, profileImg, userId });
        }
        catch (err) {
            return err;
        }
    }),
    //마이페이지 요청
    getmyPage: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield userRepo_1.default.findByPk({ userId });
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.userId) !== userId) {
            throw new exceptions_1.ValidationErrors('유저가 일치 하지 않습니다');
        }
        return yield userRepo_1.default.getmyPage({ userId });
    }),
    //찜 목록 요청
    getMyPick: ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield userRepo_1.default.findByPk({ userId });
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.userId) !== userId) {
            throw new exceptions_1.ValidationErrors('유저가 일치 하지 않습니다');
        }
        return yield userRepo_1.default.getMyPick({ userId });
    }),
    //나와 가까운 캠핑장 조회
    nearCamp: ({ campX, campY }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userRepo_1.default.nearCamp({ campX, campY });
    }),
};
