import { Router } from 'express';
import Camp from '../../database/models/camp';
import Pick from '../../database/models/pick';

const router = Router();

router.get('/', async (req, res, next) => {
  const app = await Pick.findAll({
    where: { userId: 1 },
    include: [{ model: Camp, as: 'Camp' }],
  });
  res.send(app);                                                                    
});

export default router;
