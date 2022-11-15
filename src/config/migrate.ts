import Weather from '../models/weather'; //방금 만들어준 Weather
import Camp from '../models/camp';
import User from '../models/user';
import Pick from '../models/pick';
import Review from '../models/review';
import Trip from '../models/trip';

const table = [Weather, Camp, User, Pick, Review, Trip];
console.log(`======Create ${table} Table======`);

async function migrate() {
  for (let i = 0; i < table.length; i++) {
    await table[i]
      .sync({ force: true })
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
