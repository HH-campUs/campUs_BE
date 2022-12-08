"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const sequelize_1 = require("sequelize");
const camp_1 = __importDefault(require("./camp"));
const sequlize_1 = __importDefault(require("./sequlize"));
const user_1 = __importDefault(require("./user"));
class Trip extends sequelize_1.Model {
}
exports.Trip = Trip;
//? 모델 생성
Trip.init({
    tripId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
        allowNull: false,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(255),
    },
    memo: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(50),
    },
    date: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(10),
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'Trip',
    tableName: 'trip',
    freezeTableName: true,
    updatedAt: false,
});
user_1.default.hasMany(Trip, {
    sourceKey: 'userId',
    foreignKey: 'userId',
    as: 'Trip',
});
Trip.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'User',
});
camp_1.default.hasMany(Trip, {
    sourceKey: 'campId',
    foreignKey: 'campId',
    as: 'Trip',
});
Trip.belongsTo(camp_1.default, {
    foreignKey: 'campId',
    as: 'Camp',
});
exports.default = Trip;
