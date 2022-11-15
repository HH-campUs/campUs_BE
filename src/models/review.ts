import { DataTypes, Model, Association } from 'sequelize';

import sequelize from './sequlize';

export class Review extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly reviewId!: number;
  public campId!: number;
  public userId!: number;
  public reviewImg?: string;
  public reviewComment!: string;
  //관계 설정
  public static associations: {};
}

//? 모델 생성
Review.init(
  {
    PickId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT,
    },
    campId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    reviewImg: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    reviewComment: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    modelName: 'review',
    tableName: 'Review',
    freezeTableName: true,
    timestamps: false,
  }
);
export default Review;
