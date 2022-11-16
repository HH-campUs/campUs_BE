import Weather from '../models/weather'; //방금 만들어준 Weather
import Camp from '../models/camp';
import User from '../models/user';
import Pick from '../models/pick';
import Review from '../models/review';
import Trip from '../models/trip';

/*table 리스트르르 받아서 배열로 저장
 referenced by a foreign key constrain 에러로 인한 drop create 테이블 리스트분리
*/
const dropTable = [Review, Trip, Pick, Camp, User, Weather];
const createTable = [Camp, User, Review, Trip, Pick, Weather];
console.log(`======Drop & Create Table======`);
//배열을 반복문을 돌려서 넣어줌
async function migrate() {
  for (let i = 0; i < dropTable.length; i++) {
    await dropTable[i]
      .drop()
      .then(() => {
        console.log(`✅Success drop ${dropTable[i]} Table`);
      })
      .catch((err) => {
        console.log(`❗️Error in drop ${dropTable[i]} Table : `, err);
      });
  }
  for (let i = 0; i < createTable.length; i++) {
    await createTable[i]
      //sync <=데이터베이스 연동와 자동 연동하기
      .sync({ force: false }) //true : 삭제후 migrate , false : 삭제 안하고 migrate
      .then(() => {
        console.log(`✅Success Create ${createTable[i]} Table`);
      })
      .catch((err) => {
        console.log(`❗️Error in Create ${createTable[i]} Table : `, err);
      });
  }
}

(async () => {
  await migrate();
})();
