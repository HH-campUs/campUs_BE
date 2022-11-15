import { DataTypes, Model, HasManyGetAssociationsMixin } from 'sequelize';
import { dbType } from '.';
import Pick from './pick';
import Review from './review';
import sequelize from './sequlize';
import Trip from './trip';

export class User extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly useriId!: number;
  public profileImg?: string;
  public email!: string;
  public nickname!: string;
  public password!: string;
  public refreshToken!: string;
  //관계설정 타입
  public Trip!: Trip[];
  public Review!: Review[];
  public Pick!: Pick[];
  //관계 설정
  public getTrip!: HasManyGetAssociationsMixin<Trip>;
  public getReview!: HasManyGetAssociationsMixin<Review>;
  public getPick!: HasManyGetAssociationsMixin<Trip>;
}

//? 모델 생성
User.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT,
    },
    profileImg: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    refreshToken: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    modelName: 'user',
    tableName: 'User',
    freezeTableName: true,
    timestamps: false,
  }
);
export const associate = (db: dbType) => {
  db.User.hasMany(db.Trip, { sourceKey: 'userId', foreignKey: 'userId' });
  db.User.hasMany(db.Review, { sourceKey: 'userId', foreignKey: 'userId' });
  db.User.hasMany(db.Pick, { sourceKey: 'userId', foreignKey: 'userId' });
};
export default User;
