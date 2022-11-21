import { Association, DataTypes, Model } from 'sequelize';
import Camp from './camp';
import sequelize from './sequlize';

export class LookUp extends Model {
  //? 조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
  public readonly lookUpId!: number;
  public campId!: number;
  public ip!: string;
  public time!: number;

  //관계 설정 타입
  public Camp!: Camp;
  //관계 설정
  public static associations: {
    LookUp: Association<LookUp>;
    Camp: Association<Camp>;
  };
}

//? 모델 생성
LookUp.init(
  {
    lookUpId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    campId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING(15),
    },
    time: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED
    },
  },
  {
    sequelize,
    modelName: 'LookUp',
    tableName: 'lookUp',
    freezeTableName: true,
    createdAt:false,
    updatedAt: false,
  }
);
Camp.hasMany(LookUp, {
    foreignKey: 'campId',
    sourceKey: 'campId',
    as: 'LookUp'
});
LookUp.belongsTo(Camp, {
  foreignKey: 'campId',
  as: 'Camp'
});

export default LookUp;
