import Weather from '../models/weather'; //방금 만들어준 Weather
import Camp from '../models/camp';
import User from '../models/user';
import Pick from '../models/pick';
import Review from '../models/review';
import Trip from '../models/trip';

//table 리스트르르 받아서 배열로 저장
const table = [Weather, Camp, User, Pick, Review, Trip];
console.log(`======Create ${table} Table======`);
//배열을 반복문을 돌려서 넣어줌
async function migrate() {
  for (let i = 0; i < table.length; i++) {
    await table[i]
      .sync({ force: true }) //true : 삭제후 migrate , false : 삭제 안하고 migrate
      .then(() => {
        console.log(`✅Success Create ${table[i]} Table`);
      })
      .catch((err) => {
        console.log(`❗️Error in Create ${table[i]} Table : `, err);
      });
  }
}

(async () => {
  await migrate();
})();
