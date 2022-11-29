import { sequelize } from './models/sequlize';
import { Camp } from '../database/models/camp'
import { Op } from 'sequelize'

async function initialize() {
    const mappingTopicCamp = `
      INSERT INTO topic (topicName)
      VALUES ('일몰'), ('낚시'), ('반려동물'), ('장비대여');
    `
    await sequelize.query(mappingTopicCamp);
}

async function mappingTopicCamps(){
    // 일몰 완료
    const sunset = await Camp.findAll({
        attributes:['campId'],
        where:{themaEnvrnCl: {[Op.like] : '%일몰%'}}
    })
    sunset.forEach(async o => {
        const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (1,${o.campId});
        `
        await sequelize.query(mappingTopicCamp);
    });

    // 낚시
    const fishing = await Camp.findAll({
        attributes:['campId'],
        where:{posblFcltyCl: {[Op.like]: '%낚시%'}}
    })
    fishing.forEach(async o => {
        const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (2,${o.campId});
        `
        await sequelize.query(mappingTopicCamp);
    });

    // 반려동물 완료
    const animal = await Camp.findAll({
        attributes:['campId'],
        where:{animal: {[Op.startsWith]: `가`}}
    })
    animal.forEach(async o => {
        const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (3,${o.campId});
        `
        await sequelize.query(mappingTopicCamp);
    });

    // 장비대여 완료
    const rental = await Camp.findAll({
        attributes:['campId'],
        where:{eqpmnLendCl: {[Op.notLike]: ''}}
    })
    rental.forEach(async o => {
        const mappingTopicCamp = `
        INSERT INTO topicMapping (topicId, campId)
        VALUES (4,${o.campId});
        `
        await sequelize.query(mappingTopicCamp);
    });
}

function sleep(ms: any) {
    return new Promise((r) => setTimeout(r, ms));
}

(async()=>{
    await initialize();
    await sleep(2000);
    await mappingTopicCamps();
    console.log('topicmapping init')
})();
