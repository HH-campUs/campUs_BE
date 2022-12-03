import { Association, DataTypes, Model } from 'sequelize';
import Review from './review';
import sequelize from './sequlize';
import User from './user';
import Camp from './camp'

export class Like extends Model {
  // declare LikeId: CreationOptional<number>; 이렇게 사용가능
  //'CreationOptional'은 필드를 선택 사항으로 표시하는 특수 유형입니다.
  public readonly likeId!: number;
  public reviewId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  //관계 설정
  public User!: User;
  public Review!: Review;
  public Camp!: Camp;
  //관계 설정

  public static associations: {
    Reveiw: Association<Review>;
    Like: Association<Like>;
    User: Association<User>;
    Camp: Association<Camp>
  };
}

// 모델 생성
Like.init(
  {
    likeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    reviewId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
    userId: {
      allowNull: false,
      type: DataTypes.MEDIUMINT.UNSIGNED,
    },
  },
  {
    sequelize, //? 생성한 Sequelize 객체 패싱
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    modelName: 'Like',
    tableName: 'like',
    freezeTableName: true,
    updatedAt: false,
  }
);
//두모델에서 사용한걸 하위모델에서 작성함

Camp.hasMany(Review, {
  sourceKey: 'campId',
  foreignKey: 'campId',
  as: 'Review',
});
Review.belongsTo(Camp, {
  foreignKey: 'campId',
  as: 'Camp',
});
User.hasMany(Review, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Review',
});
Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

Review.hasMany(Like, {
  sourceKey: 'reviewId',
  foreignKey: 'reviewId',
  as: 'like',
});
User.hasMany(Like, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'like',
});
Like.belongsTo(Review, {
  foreignKey: 'reviewId',
  as: 'Review',
});
Like.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});


export default Like;
