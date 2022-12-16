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
const weatherServ_1 = __importDefault(require("./weatherServ"));
const exceptions_1 = require("../../utils/exceptions");
exports.default = {
    getweather: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { pardo, dt } = req.query;
            if (!pardo && !dt)
                throw new exceptions_1.InvalidParamsError("입력하신 정보가 없습니다.");
            const Weather = { pardo, dt };
            const weather = yield weatherServ_1.default.getweather(Weather);
            res.status(200).json({ weather });
        }
        catch (err) {
            next(err);
        }
    }),
    getReCommend: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recommend = yield weatherServ_1.default.getReCommend();
            res.status(200).json({ recommend });
        }
        catch (err) {
            next(err);
        }
    }),
};
