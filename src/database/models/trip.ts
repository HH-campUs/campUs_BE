import { Association, DataTypes, Model } from 'sequelize';
import Camp from './camp';
import sequelize from './sequlize';
import User from './user';

export class Trip extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly tripId!: number;
  public userId!: number;
  public campId!: number;
  public date!: string;
  public readonly createdAt!: Date;

  //관계 설정 타입
  public User!: User;
  public Camp!: Camp;
  //관계 설정
  public static associations: {
    Trip: Association<Trip>;
    User: Association<User>;
    Camp: Association<Camp>;
  };
}

//? 모델 생성
Trip.init(
  {
    tripId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    userId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    modelName: 'Trip',
    tableName: 'trip',
    freezeTableName: true,
    updatedAt: false,
  }
);
User.hasMany(Trip, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Trip',
});
Trip.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});
Camp.hasMany(Trip, {
  sourceKey: 'campId',
  foreignKey: 'campId',
  as: 'Trip',
});
Trip.belongsTo(Camp, {
  foreignKey: 'campId',
  as: 'Camp',
});

export default Trip;
