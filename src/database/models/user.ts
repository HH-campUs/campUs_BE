import { DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';
import Trip from './trip';
import Review from './review';
import Pick from './pick';

export class User extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly userId!: number;
  public kakaoId!: string
  public provider!:string
  public profileImg!: string;
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
    kakaoId: {
      allowNull: true,
      type: DataTypes.STRING(20),
    },
    provider: {
      allowNull: true,
      type: DataTypes.STRING(20),
    },
    profileImg: {
      allowNull: true,
      defaultValue:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150807_176%2Fe2voo_1438935101901YtpDh_PNG%2F%25B9%25AB%25C1%25A6-1.png&type=a340',
      type: DataTypes.STRING(255),
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    refreshToken: {
      allowNull: true,
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
