import { DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';

// user 모델의 구성요소를 명시

export class Weather extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly id?: number;
  public dt!: string;
  public pardo!: string;
  public sunrise!: string;
  public sunset!: string;
  public humidity!: string;
  public wind_speed!: number;
  public clouds!: number;
  public uvi!: number;
  public pop!: number;
  public day!: number;
  public min!: number;
  public max!: number;
  public night!: number;
  public eve!: number;
  public morn!: number;
  public rain?: number;
  public snow?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {};
}

//? 모델 생성
Weather.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pardo: {
      type: DataTypes.STRING(50),
    },
    dt: {
      type: DataTypes.STRING(50),
    },
    sunrise: {
      type: DataTypes.STRING(50),
    },
    sunset: {
      type: DataTypes.STRING(50),
    },
    humidity: {
      type: DataTypes.STRING(50),
    },
    day: {
      type: DataTypes.MEDIUMINT,
    },
    min: {
      type: DataTypes.MEDIUMINT,
    },
    max: {
      type: DataTypes.MEDIUMINT,
    },
    night: {
      type: DataTypes.MEDIUMINT,
    },
    eve: {
      type: DataTypes.MEDIUMINT,
    },
    morn: {
      type: DataTypes.MEDIUMINT,
    },
    wind_speed: {
      type: DataTypes.MEDIUMINT,
    },
    clouds: {
      type: DataTypes.MEDIUMINT,
    },
    uvi: {
      type: DataTypes.MEDIUMINT,
    },
    pop: {
      type: DataTypes.MEDIUMINT,
    },
    rain: {
      type: DataTypes.MEDIUMINT,
    },
    snow: {
      type: DataTypes.MEDIUMINT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    modelName: 'weather',
    tableName: 'Weather',
    sequelize, //? 생성한 Sequelize 객체 패싱
    freezeTableName: true,
  }
);
