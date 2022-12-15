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
        const kakaojwt = (userId) => __awaiter(void 0, void 0, void 0, function* () {
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
        const kakaoAccessToken = authorization;
        const { data: kakaoUser } = yield (0, axios_1.default)('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
            },
        }); //유저 정보를 받아온다
        const profileImg = kakaoUser.properties.profile_image;
        const kakaoId = kakaoUser.id;
        const nickname = kakaoUser.properties.nickname;
        const provider = 'kakao';
        const email = kakaoUser.kakao_account.email;
        const exUser = yield user_1.default.findOne({
            where: { kakaoId, provider }
        });
        if (!exUser) {
            const newUser = yield user_1.default.create({ kakaoId, nickname, provider, profileImg, email });
            const { userId } = newUser;
            console.log("회원가입 했어여~");
            kakaojwt(userId);
        }
        else {
            const { userId } = exUser;
            console.log("회원가입 되어있어여~");
            kakaojwt(userId);
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
// console.log(data.data)
// try{
//   console.log("test");
//   passport.authenticate(
//     "kakao",
//     { failureRedirect: "/login" }, // 실패하면 '/user/login''로 돌아감.
//     async (err:Error, user:Users) => {
//       console.log(user)
//       if (err) return next(err);
//       const { userId } = user;
//       const AccessToken = jwt.sign(
//         { userId: userId },
//         process.env.JWT_KEY!,
//         { expiresIn: "3h" }
//       );
//       const RefreshToken = jwt.sign(
//         { userId: userId },
//         process.env.JWT_KEY!,
//         { expiresIn: "7d" }
//       );
//       const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND!));
//       const refreshToken = bcrypt.hashSync(RefreshToken, salt);
//       await User.update({refreshToken}, {where : {userId}})
//       res.cookie("refreshToken", RefreshToken);
//       res.cookie("accessToken", AccessToken);
//       // result = { userId, accessToken, refreshToken, nickname };
//       res.status(200).json({
//         message: "로그인 성공",
//         accesstoken: AccessToken,
//         refreshtoken: RefreshToken,
//       })
//       res.redirect('/');
//     }
//   )(req, res, next);
// } catch (error) {
//   next(error);
// }
// }
