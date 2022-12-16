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
Object.defineProperty(exports, "__esModule", { value: true });
const sequlize_1 = require("./models/sequlize");
const camp_1 = require("../database/models/camp");
const sequelize_1 = require("sequelize");
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const mappingTopicCamp = `
      INSERT INTO topic (topicName)
      VALUES ('일몰'), ('낚시'), ('반려동물'), ('장비대여');
    `;
        yield sequlize_1.sequelize.query(mappingTopicCamp);
    });
}
function mappingTopicCamps() {
    return __awaiter(this, void 0, void 0, function* () {
        // 일몰 완료
        const sunset = yield camp_1.Camp.findAll({
            attributes: ['campId'],
            where: { themaEnvrnCl: { [sequelize_1.Op.like]: '%일몰%' } }
        });
        sunset.forEach((o) => __awaiter(this, void 0, void 0, function* () {
            const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (1,${o.campId});
        `;
            yield sequlize_1.sequelize.query(mappingTopicCamp);
        }));
        // 낚시
        const fishing = yield camp_1.Camp.findAll({
            attributes: ['campId'],
            where: { posblFcltyCl: { [sequelize_1.Op.like]: '%낚시%' } }
        });
        fishing.forEach((o) => __awaiter(this, void 0, void 0, function* () {
            const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (2,${o.campId});
        `;
            yield sequlize_1.sequelize.query(mappingTopicCamp);
        }));
        // 반려동물 완료
        const animal = yield camp_1.Camp.findAll({
            attributes: ['campId'],
            where: { animal: { [sequelize_1.Op.startsWith]: `가` } }
        });
        animal.forEach((o) => __awaiter(this, void 0, void 0, function* () {
            const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (3,${o.campId});
        `;
            yield sequlize_1.sequelize.query(mappingTopicCamp);
        }));
        // 장비대여 완료
        const rental = yield camp_1.Camp.findAll({
            attributes: ['campId'],
            where: { eqpmnLendCl: { [sequelize_1.Op.notLike]: '' } }
        });
        rental.forEach((o) => __awaiter(this, void 0, void 0, function* () {
            const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (4,${o.campId});
        `;
            yield sequlize_1.sequelize.query(mappingTopicCamp);
        }));
    });
}
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initialize();
    yield sleep(2000);
    yield mappingTopicCamps();
    console.log('topicmapping init');
}))();
