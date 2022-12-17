"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookUp = void 0;
const sequelize_1 = require("sequelize");
const camp_1 = __importDefault(require("./camp"));
const sequlize_1 = __importDefault(require("./sequlize"));
class LookUp extends sequelize_1.Model {
}
exports.LookUp = LookUp;
//? 모델 생성
LookUp.init({
    lookUpId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
        allowNull: false,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    ip: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(15),
    },
    time: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED
    },
}, {
    sequelize: sequlize_1.default,
    modelName: 'LookUp',
    tableName: 'lookUp',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});
camp_1.default.hasMany(LookUp, {
    foreignKey: 'campId',
    sourceKey: 'campId',
    as: 'LookUp'
});
LookUp.belongsTo(camp_1.default, {
    foreignKey: 'campId',
    as: 'Camp'
});
exports.default = LookUp;
