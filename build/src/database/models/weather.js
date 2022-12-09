"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const sequelize_1 = require("sequelize");
const sequlize_1 = __importDefault(require("./sequlize"));
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
//? 모델 생성
Weather.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    pardo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    dt: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    date: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    sunrise: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    sunset: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    humidity: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    day: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    min: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    max: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    night: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    eve: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    morn: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    wind_speed: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    clouds: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    uvi: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    pop: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    rain: {
        allowNull: true,
        type: sequelize_1.DataTypes.FLOAT,
    },
    snow: {
        allowNull: true,
        type: sequelize_1.DataTypes.FLOAT,
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'Weather',
    tableName: 'weather',
    freezeTableName: true,
    timestamps: false,
});
exports.default = Weather;
