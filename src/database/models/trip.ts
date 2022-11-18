import { Association, DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';
import User from './user';

export class Trip extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly tripId!: number;
  public userId!: number;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  //관계 설정 타입
  public User!: User;
  //관계 설정
  public static associations: {
    Trip: Association<Trip>;
    User: Association<User>;
  };
}

//? 모델 생성
Trip.init(
  {
    tripId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    modelName: 'Trip',
    tableName: 'trip',
    freezeTableName: true,
    timestamps: false,
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

export default Trip;
