"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const camp_1 = __importDefault(require("./camp"));
const sequlize_1 = __importDefault(require("./sequlize"));
const user_1 = __importDefault(require("./user"));
class Review extends sequelize_1.Model {
}
exports.Review = Review;
//? 모델 생성
Review.init({
    reviewId: {
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
    reviewImg: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(255),
    },
    reviewComment: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    likeStatus: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
    },
}, {
    sequelize: sequlize_1.default,
    charset: "utf8",
    collate: "utf8_general_ci",
    modelName: 'Review',
    tableName: 'review',
    freezeTableName: true,
});
camp_1.default.hasMany(Review, {
    sourceKey: 'campId',
    foreignKey: 'campId',
    as: 'Review',
});
Review.belongsTo(camp_1.default, {
    foreignKey: 'campId',
    as: 'Camp',
});
user_1.default.hasMany(Review, {
    sourceKey: 'userId',
    foreignKey: 'userId',
    as: 'Review',
});
Review.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'User',
});
exports.default = Review;
