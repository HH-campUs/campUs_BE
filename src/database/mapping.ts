import { sequelize } from './models/sequlize';
import { Camp } from '../database/models/camp'
import { Op } from 'sequelize'

async function mappingTopicCamp(){
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
  
    // 시퀄라이즈는 닫아주지 않으면 default로 계속 열려있어서?
    sequelize.close();
}
(async()=>{
    await mappingTopicCamp();
    console.log('topicmapping init')
})();
