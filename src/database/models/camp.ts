import { DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';

export class Camp extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly campId!: number;
  public campName!: string;
  public induty!: string;
  public doNm!: string;
  public sigunguNm!: string;
  public address!: string;
  public X!: string;
  public Y!: string;
  public operPdCl?: string;
  public operDeCl?: string;
  public animal!: string;
  public ImageUrl?: string;
  public homePage?: string;
  public sbrsCl?: string;
  public posblFcltyCl?: string;
  public wtrplCo!: string;
  public swrmCo!: string;
  public toiletCo!: string;
  public manageSttus?: string;
  public themaEnvrnCl?: string;
  public lookUp!: number;
  public eqpmnLendCl?: string;
  public createdtime!: Date;
}

//? 모델 생성
Camp.init(
  {
    campId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    campName: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    induty: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    doNm: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    sigunguNm: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    X: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    Y: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    operPdCl: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    operDeCl: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    animal: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    ImageUrl: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    homePage: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    sbrsCl: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    posblFcltyCl: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    wtrplCo: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    swrmCo: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    toiletCo: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    manageSttus: {
      allowNull: true,
      type: DataTypes.STRING(20),
    },
    themaEnvrnCl: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    lookUp: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    eqpmnLendCl: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    createdtime: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    featureNm: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    clturEvent: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    modelName: 'Camp',
    tableName: 'camp',
    freezeTableName: true,
    timestamps: false,
  }
);

export default Camp;
