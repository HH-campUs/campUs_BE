import { Association, DataTypes, Model } from 'sequelize';
import Camp from './camp';
import sequelize from './sequlize';
import User from './user';

export class Pick extends Model {
  // declare PickId: CreationOptional<number>; 이렇게 사용가능
  //'CreationOptional'은 필드를 선택 사항으로 표시하는 특수 유형입니다.
  public readonly PickId!: number;
  public campId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  //관계 설정
  public User!: User;
  public Camp!: Camp;
  //관계 설정

  public static associations: {
    Camp: Association<Camp>;
    Pick: Association<Pick>;
    User: Association<User>;
  };
}

// 모델 생성
Pick.init(
  {
    pickId: {
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
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    modelName: 'Pick',
    tableName: 'pick',
    freezeTableName: true,
    updatedAt: false,
  }
);
//두모델에서 사용한걸 하위모델에서 작성함
Camp.hasMany(Pick, {
  sourceKey: 'campId',
  foreignKey: 'campId',
  as: 'Pick',
});
User.hasMany(Pick, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Pick',
});
Pick.belongsTo(Camp, {
  foreignKey: 'campId',
  as: 'Camp',
});
Pick.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

export default Pick;
