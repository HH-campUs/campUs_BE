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
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../database/models/user"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const exceptions_1 = require("../utils/exceptions");
dotenv_1.default.config();
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization, refreshtoken } = req.headers;
        if (!authorization)
            throw new exceptions_1.Unauthorized("인가 요청 정보가 잘 못 되었습니다.");
        const tokenType = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[0];
        const accesstoken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const refreshToken = refreshtoken === null || refreshtoken === void 0 ? void 0 : refreshtoken.split(" ")[0];
        if (tokenType !== "Bearer")
            throw new exceptions_1.Unauthorized('토큰 타입이 다릅니다.');
        //토큰이 없다면~
        if (!accesstoken)
            throw new exceptions_1.Unauthorized('AccessToken이 존재하지 않습니다.');
        //에쎄스 토큰 검증하기
        const decodeAccessToken = yield jwt_1.default.validateAccessToken(accesstoken);
        //인증된 에쎄스 토큰이 없을시
        if (decodeAccessToken === null) {
            //리프레쉬 토큰 없을시
            if (!refreshToken)
                throw new exceptions_1.Unauthorized('RefreshToken이 존재하지 않습니다.');
            //리프레쉬 토큰 검증
            const decodeRefreshToken = yield jwt_1.default.validateRefreshToken(refreshToken);
            //리프레쉬 토큰 만료시
            if (decodeRefreshToken == false)
                throw new exceptions_1.Unauthorized('RefreshToken이 일치하지 않거나 만료 되었습니다.');
            const userId = decodeRefreshToken.userId;
            //리프레쉬 토큰이 있을때 유저정보로 찾아오기
            const findUser = yield user_1.default.findByPk(userId);
            const findRefreshToken = findUser.refreshToken;
            //암호화해서 저장된 리프레쉬 토큰이랑 같은지 검증
            const campareRefreshToken = bcrypt_1.default.compareSync(refreshToken, findRefreshToken);
            if (campareRefreshToken == false)
                throw new exceptions_1.Unauthorized('RefreshToken이 일치하지 않거나 만료 되었습니다.');
            // 리프레쉬 정상에 AccessToken 만료시 재발급
            const AccessToken = yield jwt_1.default.createAccessTokenRe(userId);
            //쿠키로 보내줌
            res.cookie('accessToken', AccessToken);
            //프론트에서 로컬 스토리지에 저장하기 위해 res에 보내줌
            user_1.default.findByPk(userId).then((user) => {
                console.log('재발급');
                res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
                next();
            });
        }
        else {
            const userId = decodeAccessToken.userId;
            user_1.default.findByPk(userId).then((user) => {
                console.log('정상');
                res.locals.user = user; //res.locals.user데이터를 담는다 가상공간에
                next();
            });
        }
    }
    catch (err) {
        next(err);
    }
});
