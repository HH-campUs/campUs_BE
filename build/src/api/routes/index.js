"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const review_1 = __importDefault(require("./review"));
const camp_1 = __importDefault(require("./camp"));
const weather_1 = __importDefault(require("./weather"));
const kakao_1 = __importDefault(require("./kakao"));
const router = (0, express_1.Router)();
router.use('/users', user_1.default);
router.use('/kakao', kakao_1.default);
router.use('/', camp_1.default);
router.use('/weathers', weather_1.default);
router.use('/reviews', review_1.default);
router.use('/', review_1.default);
exports.default = router;
