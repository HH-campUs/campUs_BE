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
const weatherRepo_1 = __importDefault(require("./weatherRepo"));
exports.default = {
    getweather: ({ pardo, dt }) => __awaiter(void 0, void 0, void 0, function* () {
        const findDate = yield weatherRepo_1.default.findDate({ dt });
        if (!findDate)
            throw new Error('요청 하신 날짜가 없습니다.');
        const findWeather = yield weatherRepo_1.default.getweather({ pardo });
        const startDate = new Date();
        const day = startDate.getDay();
        //토요일인지?
        if (day === 6) {
            const weather = findWeather.map((data) => {
                //날씨가 내가 찍은 날씨와 같은지?
                if (dt === data.dt) {
                    return fomatReturnData(data);
                    //요일이 토요일이면 다음주 토요일 정보 보내줌
                }
                else if (data.date === '토' && data.dt > dt) {
                    return fomatReturnData(data);
                }
            });
            return weather.filter((weather) => weather !== undefined && weather !== null);
        }
        else {
            //토요일이 아니면 날짜가 같은거와 토요일꺼만 보내줌
            const weather = findWeather.map((data) => {
                if (dt === data.dt) {
                    return fomatReturnData(data);
                }
                else if (data.date === '토') {
                    return fomatReturnData(data);
                }
            });
            return weather.filter((weather) => weather !== undefined && weather !== null);
        }
    }),
    //저장된 토요일 날씨 찾기
    getReCommend: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findWeather = yield weatherRepo_1.default.getReCommend();
            /*
            이번주 가장 날씨 좋은 곳 토요일 기준으로 다 보냄
            오늘이 221202면 그주 모든 지역의 토요일 날씨를 보여줌 ㅇㅇ.
            기온이 높은거부터 내림차순
            17시 기준으로 다음주 토요일
            */
            const startDate = new Date();
            const useYear = startDate.getFullYear().toString();
            const useMonth = ["0" + (startDate.getMonth() + 1)].toString().slice(-2);
            const useDate = ["0" + startDate.getDate()].toString().slice(-2);
            const useFullDate = useYear + useMonth + useDate;
            //월~토+일 17시 이전(그주 토요일 정보)
            const day = startDate.getDay();
            // 0(일)~ 6(토요일)
            const time = parseInt(startDate.toTimeString().slice(0, 2));
            //토요일이며 17이후
            if (day === 6 && time >= 17) {
                console.log("토요일 17시 이후");
                //토 17시~0시 (담주 토요일 정보)
                const NextSatweather = findWeather.map((data) => {
                    if (data.date === '토' && parseInt(data.dt) === parseInt(useFullDate) + 7) {
                        return fomatReturnData(data);
                    }
                });
                return NextSatweather.filter((weather) => weather !== undefined && weather !== null).sort((a, b) => b.day - a.day);
            }
            else {
                //토 0~17시 (금주 토요일 정보)
                console.log("평일 or 토요일 17시 이전");
                const Satweather = findWeather.map((data) => {
                    if (data.date === '토' && parseInt(data.dt) !== parseInt(useFullDate) + 7) {
                        return fomatReturnData(data);
                    }
                });
                return Satweather.filter((weather) => weather !== undefined && weather !== null).sort((a, b) => b.day - a.day);
            }
        }
        catch (err) {
            return err;
        }
    }),
};
//날씨 가공함수
const fomatReturnData = (data) => {
    return {
        dt: data.dt,
        name: data.name,
        pardo: data.pardo,
        date: data.date,
        sunrise: data.sunrise,
        sunset: data.sunset,
        humidity: data.humidity,
        wind_speed: data.wind_speed,
        clouds: data.clouds,
        uvi: data.uvi,
        pop: data.pop,
        day: data.day,
        min: data.min,
        max: data.max,
        night: data.night,
        eve: data.eve,
        morn: data.morn,
        rain: data.rain,
        snow: data.snow,
    };
};
