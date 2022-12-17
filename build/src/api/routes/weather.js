"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherControl_1 = __importDefault(require("../weather/weatherControl"));
const router = (0, express_1.Router)();
//날씨 조회
router.get('/', weatherControl_1.default.getweather);
//토요일 날씨만 받기
router.get('/recommend', weatherControl_1.default.getReCommend);
exports.default = router;
