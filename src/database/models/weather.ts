import { DataTypes, Model } from 'sequelize';
import sequelize from './sequlize';

export class Weather extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly id?: number;
  public dt!: string;
  public date!: string;
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
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    dt: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    sunrise: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    sunset: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    humidity: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    day: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    min: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    max: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    night: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    eve: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    morn: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    wind_speed: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    clouds: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    uvi: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    pop: {
      allowNull: false,
      type: DataTypes.MEDIUMINT,
    },
    rain: {
      allowNull: true,
      type: DataTypes.MEDIUMINT,
    },
    snow: {
      allowNull: true,
      type: DataTypes.MEDIUMINT,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    modelName: 'Weather',
    tableName: 'weather',
    freezeTableName: true,
    timestamps: false,
  }
);
export default Weather;
