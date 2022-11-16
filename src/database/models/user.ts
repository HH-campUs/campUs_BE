import { DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';
import Trip from './trip'
import Review from './review'
import Pick from './pick'

export class User extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly useriId!: number;
  public profileImg?: string;
  public email!: string;
  public nickname!: string;
  public password!: string;
  public refreshToken!: string;
  //관계설정 타입
  public Trip!: Trip;
  public Review!: Review;
  public Pick!: Pick;
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
    modelName: 'User',
    tableName: 'user',
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;