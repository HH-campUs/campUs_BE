"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequlize_1 = __importDefault(require("./sequlize"));
class User extends sequelize_1.Model {
}
exports.User = User;
//? 모델 생성
User.init({
    userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.MEDIUMINT.UNSIGNED,
    },
    kakaoId: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(20),
    },
    googleId: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(50),
    },
    provider: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(20),
    },
    profileImg: {
        allowNull: true,
        defaultValue: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150807_176%2Fe2voo_1438935101901YtpDh_PNG%2F%25B9%25AB%25C1%25A6-1.png&type=a340',
        type: sequelize_1.DataTypes.STRING(255),
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    },
    nickname: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    password: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    },
    refreshToken: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'User',
    tableName: 'user',
    freezeTableName: true,
    timestamps: false,
});
exports.default = User;
