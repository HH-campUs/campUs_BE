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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet")); //악성 스크립트 보호
const index_1 = __importDefault(require("./src/api/routes/index"));
const errorhandler_1 = require("./src/middlewares/errorhandler");
const sequlize_1 = require("./src/database/models/sequlize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3001);
if (prod) {
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: '*',
        credentials: true,
    }));
}
else {
    app.use((0, cors_1.default)({
        origin: true,
        credentials: true,
    }));
}
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', index_1.default);
//에러발생시 logger로 넘어옴
app.use(errorhandler_1.errorLogger);
//에러발생시 Handler로 이동
app.use(errorhandler_1.errorHandler);
app.listen(app.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${app.get('port')}로 실행중`);
    // createData(); 
    yield sequlize_1.sequelize.authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('DB 연결완료');
    }))
        .catch((err) => {
        console.log(err);
        console.log('DB 연결실패');
    });
}));
