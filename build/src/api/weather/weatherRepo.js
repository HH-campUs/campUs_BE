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
const weather_1 = __importDefault(require("../../database/models/weather"));
exports.default = {
    //저장된 날짜 찾기
    findDate: ({ dt }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield weather_1.default.findOne({ where: { dt } });
    }),
    //저장된 날씨 찾기
    getweather: ({ pardo }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield weather_1.default.findAll({ where: { pardo } });
    }),
    //저장된 토요일 날씨 찾기
    getReCommend: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield weather_1.default.findAll({});
    }),
};
