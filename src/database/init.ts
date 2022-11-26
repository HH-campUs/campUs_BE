import { sequelize } from './models/sequlize';

async function initialize() {
    const mappingTopicCamp = `
      INSERT INTO topic (topicName)
      VALUES ('일몰'), ('낚시'), ('반려동물'), ('장비대여');
    `
    await sequelize.query(mappingTopicCamp);
  
    // 시퀄라이즈는 닫아주지 않으면 default로 계속 열려있어서?
    sequelize.close();
}

(async()=>{
    await initialize();
    console.log('topicName init')
})();
  