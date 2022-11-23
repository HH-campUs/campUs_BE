import { DataTypes, Model, BelongsToMany } from 'sequelize';
import Camp from './camp';
import sequelize from './sequlize';

export class Topic extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly topicId!: number;
  public topicName!: string;

  //관계 설정 타입
  public Camp!: Camp;
  //관계 설정
  public static associations: {
    Topic: BelongsToMany<Topic>
    Camp: BelongsToMany<Camp>
  };
}

//? 모델 생성
Topic.init(
  {
    topicId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.TINYINT.UNSIGNED,
    },
    topicName: {
      allowNull: false,
      type: DataTypes.STRING(10),
    }
  },
  {
    sequelize,
    modelName: 'Topic',
    tableName: 'topic',
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    freezeTableName: true,
    createdAt:false,
    updatedAt: false,
  }
);

Topic.belongsToMany(Camp, {
    through: 'topicMapping',
    foreignKey: 'topicId',
});
Camp.belongsToMany(Topic, {
    through: 'topicMapping',
    foreignKey: 'campId',
    onDelete: 'CASCADE'
});

export default Topic;
