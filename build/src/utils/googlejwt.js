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
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../database/models/user"));
const exceptions_1 = require("./exceptions");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //토큰 생성 및 토큰 전달 함수
        const googlejwt = (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const AccessToken = jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_KEY, { expiresIn: "3h" });
            const RefreshToken = jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_KEY, { expiresIn: "7d" });
            const salt = bcrypt_1.default.genSaltSync(Number(process.env.SALT_ROUND));
            const refreshToken = bcrypt_1.default.hashSync(RefreshToken, salt);
            yield user_1.default.update({ refreshToken }, { where: { userId } });
            res.cookie("refreshToken", RefreshToken);
            res.cookie("accessToken", AccessToken);
            res.status(200).json({
                message: "로그인 성공",
                accesstoken: AccessToken,
                refreshtoken: RefreshToken,
            });
        });
        const { authorization } = req.headers;
        if (!authorization)
            throw new exceptions_1.Unauthorized("토큰 정보가 없습니다.");
        const GoogleAccessToken = authorization;
        const googleUser = yield axios_1.default
            .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${GoogleAccessToken}`, {
            headers: {
                Authorization: `Bearer ${GoogleAccessToken}`,
                accept: 'application/json'
            },
        });
        const profileImg = googleUser.data.picture;
        const googleId = googleUser.data.id;
        const nickname = googleUser.data.name;
        const provider = 'google';
        const email = googleUser.data.email;
        const exUser = yield user_1.default.findOne({
            where: { googleId, provider }
        });
        if (!exUser) {
            const newUser = yield user_1.default.create({ googleId, nickname, provider, profileImg, email });
            const { userId } = newUser;
            console.log("회원가입 했어여~");
            googlejwt(userId);
        }
        else {
            const { userId } = exUser;
            console.log("회원가입 되어있어여~");
            googlejwt(userId);
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
