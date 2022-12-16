import { Association, DataTypes, Model } from 'sequelize';
import Camp from './camp';

import sequelize from './sequlize';
import User from './user';

export class Review extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly reviewId!: number;
  public campId!: number;
  public userId!: number;
  public reviewImg?: string;
  public reviewComment!: string;
  public likeStatus?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  //관계 설정 타입
  public User!: User;
  public Camp!: Camp;
  //관계 설정
  public static associations: {
    Camp: Association<Camp>;
    Review: Association<Review>;
    User: Association<User>;
  };
}
//? 모델 생성
Review.init(
  {
    reviewId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    userId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    reviewImg: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    reviewComment: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    likeStatus: {
      allowNull: false,
      type: DataTypes.TINYINT.UNSIGNED,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    modelName: 'Review',
    tableName: 'review',
    freezeTableName: true,
  }
);
Camp.hasMany(Review, {
  sourceKey: 'campId',
  foreignKey: 'campId',
  as: 'Review',
});
Review.belongsTo(Camp, {
  foreignKey: 'campId',
  as: 'Camp',
});
User.hasMany(Review, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Review',
});
Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

export default Review;
