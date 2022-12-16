"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const sequelize_1 = require("sequelize");
const camp_1 = __importDefault(require("./camp"));
const sequlize_1 = __importDefault(require("./sequlize"));
class Topic extends sequelize_1.Model {
}
exports.Topic = Topic;
//? 모델 생성
Topic.init({
    topicId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
    },
    topicName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(10),
    }
}, {
    sequelize: sequlize_1.default,
    modelName: 'Topic',
    tableName: 'topic',
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});
Topic.belongsToMany(camp_1.default, {
    through: 'topicMapping',
    foreignKey: 'topicId',
});
camp_1.default.belongsToMany(Topic, {
    through: 'topicMapping',
    foreignKey: 'campId',
    onDelete: 'CASCADE'
});
exports.default = Topic;
