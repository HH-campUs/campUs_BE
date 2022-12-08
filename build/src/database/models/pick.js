"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pick = void 0;
const sequelize_1 = require("sequelize");
const camp_1 = __importDefault(require("./camp"));
const sequlize_1 = __importDefault(require("./sequlize"));
const user_1 = __importDefault(require("./user"));
class Pick extends sequelize_1.Model {
}
exports.Pick = Pick;
// 모델 생성
Pick.init({
    pickId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
        allowNull: false,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'Pick',
    tableName: 'pick',
    freezeTableName: true,
    updatedAt: false,
});
//두모델에서 사용한걸 하위모델에서 작성함
camp_1.default.hasMany(Pick, {
    sourceKey: 'campId',
    foreignKey: 'campId',
    as: 'Pick',
});
user_1.default.hasMany(Pick, {
    sourceKey: 'userId',
    foreignKey: 'userId',
    as: 'Pick',
});
Pick.belongsTo(camp_1.default, {
    foreignKey: 'campId',
    as: 'Camp',
});
Pick.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'User',
});
exports.default = Pick;
