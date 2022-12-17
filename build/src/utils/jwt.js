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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const exceptions_1 = require("../utils/exceptions");
const userRepo_1 = __importDefault(require("../api/user/userRepo"));
dotenv_1.default.config();
exports.default = {
    //리프레쉬 토큰 발급
    createTokens: ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        //유저정보 확인
        const user = yield userRepo_1.default.findUser({ email });
        //유저확인
        if (!user)
            throw new exceptions_1.ValidationErrors('유저가 없거나 비밀번호가 일치하지 않습니다.');
        //비밀 번호 확인
        const encryptedPassword = bcrypt_1.default.compareSync(password, user.password);
        if (encryptedPassword === false)
            throw new exceptions_1.ValidationErrors('유저가 없거나 비밀번호가 일치하지 않습니다.');
        //리프레쉬 발급
        const RefreshToken = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_KEY, { expiresIn: '7d' }); // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
        //에세스 토큰 발급
        const AccessToken = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_KEY, { expiresIn: '3h' });
        //리프레쉬 암호화
        const salt = bcrypt_1.default.genSaltSync(Number(process.env.SALT_ROUND));
        const refreshToken = bcrypt_1.default.hashSync(RefreshToken, salt);
        //리프레쉬 저장
        yield userRepo_1.default.updaterefreshToken({ email, refreshToken });
        return { RefreshToken, AccessToken };
    }),
    //에세스 토큰 검증
    validateAccessToken: (accesstoken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return jsonwebtoken_1.default.verify(accesstoken, process.env.JWT_KEY);
            // JWT에서 Payload를 가져옵니다.
        }
        catch (error) {
            return null;
        }
    }),
    //리프레쉬 토큰 검증
    validateRefreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Payload = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_KEY);
            return Payload;
        }
        catch (error) {
            return false;
        }
    }),
    //에세스 토큰 재발급
    createAccessTokenRe: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_KEY, {
            expiresIn: '3h',
        }); // JWT에서 Payload를 가져옵니다.
    }),
};
