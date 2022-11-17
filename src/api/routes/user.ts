import { Router } from 'express';
import { Sequelize } from 'sequelize';
import Camp from '../../database/models/camp';
import sequelize from '../../database/models/sequlize';
import authmiddleware from '../../middlewares/authmiddleware';
import User from '../user/userControl';
const router = Router();

router.post('/signup', User.signup);
router.post('/login', User.login);
router.put('/myPage', authmiddleware, User.updateUser);
router.get('/myPage', authmiddleware, User.getmyPage);
router.get('/dd', async (req, res, next) => {
  const { topic } = req.body;
  console.log(topic);

  const dd = await sequelize.query(
    'SELECT * FROM Camp WHERE MATCH(induty,campId,campName,induty,doNm,sigunguNm,address,X,Y,operPdCl,operDeCl,animal,ImageUrl,homePage,sbrsCl,posblFcltyCl,wtrplCo,swrmCo,toiletCo,manageSttus,themaEnvrnCl,eqpmnLendCl,createdtime) AGAINST(:글램핑)'
  );
  res.send({ dd });
});
export default router;
