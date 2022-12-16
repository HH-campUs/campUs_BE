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
const weather_1 = __importDefault(require("../models/weather")); //방금 만들어준 Weather
const camp_1 = __importDefault(require("../models/camp"));
const topic_1 = __importDefault(require("../models/topic"));
const lookUp_1 = __importDefault(require("../models/lookUp"));
const user_1 = __importDefault(require("../models/user"));
const pick_1 = __importDefault(require("../models/pick"));
const review_1 = __importDefault(require("../models/review"));
const trip_1 = __importDefault(require("../models/trip"));
const sequlize_1 = __importDefault(require("../models/sequlize"));
/*table 리스트르르 받아서 배열로 저장
 referenced by a foreign key constrain 에러로 인한 drop create 테이블 리스트분리
*/
const dropTable = [review_1.default, trip_1.default, pick_1.default, lookUp_1.default, topic_1.default, camp_1.default, user_1.default, weather_1.default];
const createTable = [camp_1.default, topic_1.default, user_1.default, review_1.default, trip_1.default, pick_1.default, lookUp_1.default, weather_1.default];
console.log(`======Drop & Create Table======`);
//배열을 반복문을 돌려서 넣어줌
function migrate() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < dropTable.length; i++) {
            yield dropTable[i]
                .drop()
                .then(() => {
                console.log(`✅Success drop ${dropTable[i]} Table`);
            })
                .catch((err) => {
                console.log(`❗️Error in drop ${dropTable[i]} Table : `, err);
            });
        }
        for (let i = 0; i < createTable.length; i++) {
            yield createTable[i]
                //sync <=데이터베이스 연동와 자동 연동하기
                .sync({ force: false }) //true : 삭제후 migrate , false : 삭제 안하고 migrate
                .then(() => {
                console.log(`✅Success Create ${createTable[i]} Table`);
            })
                .catch((err) => {
                console.log(`❗️Error in Create ${createTable[i]} Table : `, err);
            });
        }
        sequlize_1.default.sync();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequlize_1.default.query(`DROP TABLE IF EXISTS topicMapping`);
    yield migrate();
}))();
