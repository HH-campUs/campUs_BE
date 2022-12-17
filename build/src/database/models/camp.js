"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camp = void 0;
const sequelize_1 = require("sequelize");
const sequlize_1 = __importDefault(require("./sequlize"));
class Camp extends sequelize_1.Model {
}
exports.Camp = Camp;
//? 모델 생성
Camp.init({
    campId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    campName: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(50),
    },
    induty: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    doNm: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    sigunguNm: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(255),
    },
    X: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    Y: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    operPdCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(50),
    },
    operDeCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(50),
    },
    animal: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    ImageUrl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    homePage: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    sbrsCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    posblFcltyCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    wtrplCo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(255),
    },
    swrmCo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(20),
    },
    toiletCo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(20),
    },
    manageSttus: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(20),
    },
    themaEnvrnCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    eqpmnLendCl: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    createdtime: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    featureNm: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    clturEvent: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    reviewCount: {
        allowNull: true,
        defaultValue: 0,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    pickCount: {
        allowNull: true,
        defaultValue: 0,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    lookUp: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'Camp',
    tableName: 'camp',
    freezeTableName: true,
    timestamps: false,
});
exports.default = Camp;
